/**
 * Deterministic k-means for archetype clustering (BORREL-2.5 spike).
 *
 * Dependency-free and fully seeded, so the same dataset + seed always yields
 * byte-identical clusters (a hard requirement: the assignments are committed and
 * consumed at build time by the downstream archetype-generation story).
 *
 * Determinism comes from a mulberry32 PRNG (the same generator the mock-data
 * script uses) driving k-means++ seeding, plus a fixed number of restarts whose
 * best-inertia result wins. Nothing here touches wall-clock time or unordered
 * iteration.
 */

/** mulberry32 — small, fast, deterministic PRNG (matches scripts/mock/generate.ts). */
export function makeRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Vector = readonly number[];
type Matrix = readonly Vector[];

export interface KMeansResult {
  /** Cluster index (0..k-1) per input row, row-aligned with the matrix. */
  readonly assignments: readonly number[];
  /** Final cluster centroids. */
  readonly centroids: readonly Vector[];
  /** Sum of squared distances of points to their centroid (lower = tighter). */
  readonly inertia: number;
  /** Mean silhouette coefficient in [-1, 1] (higher = better separated). */
  readonly silhouette: number;
}

function squaredDistance(a: Vector, b: Vector): number {
  let sum = 0;
  for (let i = 0; i < a.length; i += 1) {
    const d = a[i] - b[i];
    sum += d * d;
  }
  return sum;
}

function euclidean(a: Vector, b: Vector): number {
  return Math.sqrt(squaredDistance(a, b));
}

/** k-means++ seeding: spread initial centroids by squared-distance weighting. */
function seedCentroids(data: Matrix, k: number, rng: () => number): number[][] {
  const first = Math.floor(rng() * data.length);
  const centroids: number[][] = [[...data[first]]];

  while (centroids.length < k) {
    const dSquared = data.map((point) =>
      Math.min(...centroids.map((c) => squaredDistance(point, c))),
    );
    const total = dSquared.reduce((sum, d) => sum + d, 0);

    if (total === 0) {
      // All remaining points coincide with a centroid; pad deterministically.
      centroids.push([...data[Math.floor(rng() * data.length)]]);
      continue;
    }

    let threshold = rng() * total;
    let chosen = 0;
    for (let i = 0; i < dSquared.length; i += 1) {
      threshold -= dSquared[i];
      if (threshold <= 0) {
        chosen = i;
        break;
      }
    }
    centroids.push([...data[chosen]]);
  }

  return centroids;
}

function assignToNearest(data: Matrix, centroids: readonly Vector[]): number[] {
  return data.map((point) => {
    let best = 0;
    let bestDist = Infinity;
    centroids.forEach((centroid, index) => {
      const dist = squaredDistance(point, centroid);
      if (dist < bestDist) {
        bestDist = dist;
        best = index;
      }
    });
    return best;
  });
}

function recomputeCentroids(
  data: Matrix,
  assignments: readonly number[],
  k: number,
  previous: readonly Vector[],
): number[][] {
  const dims = data[0].length;
  const sums: number[][] = Array.from({ length: k }, () =>
    new Array<number>(dims).fill(0),
  );
  const counts = new Array<number>(k).fill(0);

  data.forEach((point, i) => {
    const cluster = assignments[i];
    counts[cluster] += 1;
    for (let d = 0; d < dims; d += 1) sums[cluster][d] += point[d];
  });

  return sums.map((sum, cluster) => {
    if (counts[cluster] === 0) return [...previous[cluster]]; // keep empty cluster stable
    return sum.map((v) => v / counts[cluster]);
  });
}

function inertiaOf(
  data: Matrix,
  assignments: readonly number[],
  centroids: readonly Vector[],
): number {
  return data.reduce(
    (sum, point, i) => sum + squaredDistance(point, centroids[assignments[i]]),
    0,
  );
}

/** Mean silhouette coefficient — the cluster-count selection metric. */
export function silhouette(
  data: Matrix,
  assignments: readonly number[],
  k: number,
): number {
  if (k < 2) return 0;
  const members: number[][] = Array.from({ length: k }, () => []);
  assignments.forEach((cluster, i) => members[cluster].push(i));

  let total = 0;
  for (let i = 0; i < data.length; i += 1) {
    const own = assignments[i];
    const ownMembers = members[own];

    // a(i): mean intra-cluster distance (0 for a singleton cluster).
    let a = 0;
    if (ownMembers.length > 1) {
      for (const j of ownMembers) if (j !== i) a += euclidean(data[i], data[j]);
      a /= ownMembers.length - 1;
    }

    // b(i): lowest mean distance to any other cluster.
    let b = Infinity;
    for (let c = 0; c < k; c += 1) {
      if (c === own || members[c].length === 0) continue;
      let mean = 0;
      for (const j of members[c]) mean += euclidean(data[i], data[j]);
      mean /= members[c].length;
      if (mean < b) b = mean;
    }

    if (!Number.isFinite(b)) continue; // only one non-empty cluster
    const s = a === 0 && b === 0 ? 0 : (b - a) / Math.max(a, b);
    total += s;
  }

  return total / data.length;
}

/**
 * Run seeded k-means with `restarts` k-means++ initialisations, keeping the
 * lowest-inertia solution. Fully deterministic for a given `seed`.
 */
export function kmeans(
  data: Matrix,
  k: number,
  options: { seed: number; restarts?: number; maxIterations?: number },
): KMeansResult {
  const { seed, restarts = 10, maxIterations = 100 } = options;
  const rng = makeRng(seed);

  let best: {
    assignments: number[];
    centroids: number[][];
    inertia: number;
  } | null = null;

  for (let restart = 0; restart < restarts; restart += 1) {
    let centroids = seedCentroids(data, k, rng);
    let assignments = assignToNearest(data, centroids);

    for (let iter = 0; iter < maxIterations; iter += 1) {
      centroids = recomputeCentroids(data, assignments, k, centroids);
      const next = assignToNearest(data, centroids);
      if (next.every((c, i) => c === assignments[i])) {
        assignments = next;
        break;
      }
      assignments = next;
    }

    const inertia = inertiaOf(data, assignments, centroids);
    if (best === null || inertia < best.inertia) {
      best = { assignments, centroids, inertia };
    }
  }

  // `best` is always set: restarts >= 1.
  const resolved = best as {
    assignments: number[];
    centroids: number[][];
    inertia: number;
  };
  return {
    assignments: resolved.assignments,
    centroids: resolved.centroids,
    inertia: resolved.inertia,
    silhouette: silhouette(data, resolved.assignments, k),
  };
}
