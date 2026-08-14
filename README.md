# Kopstoot Kompanen — Borrel 35

An interactive website for the Kopstoot Kompanen (a club of tall people) built for **Borrel 35**,
themed around **Jan Kompaan Modaal** — the *average* Kompaan.

Members fill in a Google Form (multiple choice + a few open questions). Because the form is public,
we get the responses as a CSV. The site turns that CSV into something playful and visual rather than
a dry "38% picked this" report.

## What the site does

- **The average Kompaan** — an aggregate profile sketched from all responses (height, age bracket,
  province, borrel count, and the fun stuff: flight-seat preference, ideal borrel, how the night
  usually ends, etc.).
- **Compare yourself** — let a visitor see how close they are to the average: e.g.
  *"Jij bent 87% gemiddelde Kompaan"* / *"Je hebt 3/12 kenmerken van de gemiddelde Kompaan."*
- **Archetypes (typetjes)** — beyond the average, derive character types from answer combinations,
  such as *De Parkborrelprofessional*, *De Lange Nachtbraker*, *De Sociale Giraffe*,
  *De Verantwoordelijke Kompaan* and *De Salmari-Soldaat*.
- **Match people** on their archetype, so the enquête becomes a social game, not just statistics.

The tone stays out of the dating/"fixborrel" corner — this is about the group, not matchmaking.

## Tech

- **Next.js** (App Router, TypeScript), designed to be visual.
- **bun** as package manager.
- Hosted on **Vercel**.
- Data source: a CSV exported from the public Google Form.

## Getting started

```bash
bun install
bun run dev
```

## Deploy

The site is hosted on **Vercel** and deploys straight from this repo. Deploy config lives in
[`vercel.json`](./vercel.json), so the settings below are picked up automatically.

### Connect the repo

1. In the [Vercel dashboard](https://vercel.com/new), choose **Add New… → Project**.
2. Import this Git repository and select it.
3. Vercel detects the **Next.js** framework and reads `vercel.json`. Keep the defaults it offers.
4. Deploy. Every push to `main` ships a production deployment; pull requests get preview
   deployments automatically.

### Build settings

These come from `vercel.json` — you should not need to change them in the dashboard:

| Setting          | Value           |
| ---------------- | --------------- |
| Framework Preset | Next.js         |
| Install Command  | `bun install`   |
| Build Command    | `bun run build` |
| Output Directory | `.next`         |

### Environment variables

The app reads its data from a CSV exported from the public Google Form. If that source is wired
through an environment variable (e.g. the CSV URL), add it under **Project Settings → Environment
Variables** in Vercel for the **Production** (and, if you want previews to work, **Preview**)
environments, then redeploy. There are no secret keys required to build the site today — add
variables here only as data sources are introduced. Never commit values from `.env*` files.

## Development workflow

This repo uses the Backlog.md + Claude workflow. Config lives in
`.claude/backlog-workflow.json`; stories live under `backlog/` with the `BORREL-` prefix.
Plan work with `backlog-plan`, deliver a story with `backlog-deliver`.
