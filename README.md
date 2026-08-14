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

## Development workflow

This repo uses the Backlog.md + Claude workflow. Config lives in
`.claude/backlog-workflow.json`; stories live under `backlog/` with the `BORREL-` prefix.
Plan work with `backlog-plan`, deliver a story with `backlog-deliver`.
