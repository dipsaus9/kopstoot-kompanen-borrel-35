/**
 * PROOF (design/skate-graffiti-proof): a painterly concrete graffiti wall in the
 * modern-anime × Avatar blend — brushy paint streaks, drips, scratchy tags and a
 * reserved character-portrait slot where the real anime art is dropped in later.
 * A `feTurbulence`+`feDisplacementMap` filter roughens edges so shapes read as
 * painted, not vector-clean. Original art, inspired by the references, not copied.
 */
export function SkateScene({ className }: { className?: string }) {
  const streaks = [
    { x: 60, w: 120, h: 300, c: "#3fb0c0", r: -4 },
    { x: 250, w: 150, h: 340, c: "#b05aa0", r: 3 },
    { x: 470, w: 130, h: 300, c: "#d9a441", r: -3 },
    { x: 650, w: 160, h: 330, c: "#7a5bd0", r: 4 },
    { x: 880, w: 140, h: 300, c: "#3fb0c0", r: -5 },
    { x: 1050, w: 130, h: 340, c: "#c74f7d", r: 3 },
  ];
  const drips = [140, 300, 520, 700, 930, 1090, 400, 820];

  return (
    <svg
      viewBox="0 0 1200 620"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Geschilderde anime graffiti-betonmuur"
    >
      <defs>
        <linearGradient id="concrete" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9a938c" />
          <stop offset="100%" stopColor="#6f6a66" />
        </linearGradient>
        <filter id="paint">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.06" numOctaves="3" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="26" />
        </filter>
        <filter id="rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="10" />
        </filter>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer><feFuncA type="linear" slope="0.55" /></feComponentTransfer>
        </filter>
      </defs>

      {/* Concrete base */}
      <rect x="0" y="0" width="1200" height="620" fill="url(#concrete)" />
      {/* concrete blotches for texture */}
      <g filter="url(#paint)" opacity="0.35">
        <ellipse cx="300" cy="180" rx="220" ry="140" fill="#847d76" />
        <ellipse cx="900" cy="420" rx="260" ry="150" fill="#5f5a56" />
        <ellipse cx="620" cy="520" rx="200" ry="120" fill="#847d76" />
      </g>

      {/* Painterly paint streaks + drips */}
      <g filter="url(#paint)">
        {streaks.map((s, i) => (
          <g key={i} transform={`rotate(${s.r} ${s.x + s.w / 2} 300)`} opacity="0.82">
            <rect x={s.x} y={300 - s.h / 2} width={s.w} height={s.h} rx="18" fill={s.c} />
          </g>
        ))}
      </g>
      <g filter="url(#rough)">
        {drips.map((x, i) => (
          <g key={i}>
            <rect x={x} y={150 + (i * 23) % 120} width={7 + (i % 3) * 3} height={90 + (i * 31) % 140} rx="4"
              fill={["#3fb0c0", "#d9a441", "#c74f7d", "#7a5bd0"][i % 4]} opacity="0.75" />
            <circle cx={x + 3} cy={240 + (i * 31) % 160 + (i * 23) % 120} r={6 + (i % 3) * 2}
              fill={["#3fb0c0", "#d9a441", "#c74f7d", "#7a5bd0"][i % 4]} opacity="0.75" />
          </g>
        ))}
      </g>

      {/* Scratchy black tag scribbles */}
      <g filter="url(#rough)" stroke="#1a1120" strokeWidth="4" fill="none" opacity="0.7" strokeLinecap="round">
        <path d="M120 470 l60 -20 l-40 30 l70 -15" />
        <path d="M560 150 l50 20 l-30 15 l60 10" />
        <path d="M980 200 l40 -25 l-20 35 l55 -10" />
      </g>

      {/* Tags (no SK8) */}
      <g filter="url(#rough)">
        <g transform="rotate(-4 250 260)">
          <text x="120" y="285" fontFamily="var(--font-display), Impact, sans-serif" fontSize="90" fill="#ffd45e" stroke="#1a1120" strokeWidth="5" style={{ paintOrder: "stroke" }}>BORREL</text>
        </g>
        <g transform="rotate(3 720 400)">
          <text x="560" y="415" fontFamily="var(--font-display), Impact, sans-serif" fontSize="60" fill="#66e0c4" stroke="#1a1120" strokeWidth="4" style={{ paintOrder: "stroke" }}>KOMPANEN</text>
        </g>
        <g transform="rotate(-6 1060 210)">
          <text x="1010" y="235" fontFamily="var(--font-display), Impact, sans-serif" fontSize="92" fill="#ff6b8a" stroke="#1a1120" strokeWidth="5" style={{ paintOrder: "stroke" }}>35</text>
        </g>
      </g>

      {/* Reserved character-portrait slot (real anime art later) */}
      <g transform="translate(830 70)">
        <rect x="0" y="0" width="320" height="470" rx="10" fill="#1a1120" opacity="0.18" filter="url(#rough)" />
        <rect x="0" y="0" width="320" height="470" rx="10" fill="none" stroke="#faf3e6" strokeWidth="4" strokeDasharray="14 12" opacity="0.55" />
        {/* soft anime bust silhouette */}
        <g opacity="0.3" transform="translate(60 120)">
          <circle cx="100" cy="90" r="72" fill="#1a1120" />
          <path d="M40 240 C40 180 60 160 100 160 C140 160 160 180 160 240 L170 350 L30 350 Z" fill="#1a1120" />
        </g>
        <text x="160" y="420" textAnchor="middle" fontFamily="var(--font-display), Impact, sans-serif" fontSize="26" fill="#faf3e6" opacity="0.75" letterSpacing="0.05em">ANIME-ART VOLGT</text>
      </g>

      {/* Film grain over everything */}
      <rect x="0" y="0" width="1200" height="620" filter="url(#grain)" opacity="0.2" />
    </svg>
  );
}
