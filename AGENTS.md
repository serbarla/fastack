# AGENTS.md

Guidance for AI agents working in this repository.

## Project

`notapp` — minimal Bun + TypeScript HTTP API monorepo with Nx task caching and Docker. The app logic is a skeleton; the interesting parts are the workspace wiring (Bun workspaces, Nx cache, containerized dev loop). Preserve that wiring unless asked to change it.

## Layout

- `apps/api` — `@notapp/api` (private). HTTP server via `Bun.serve` in `src/index.ts`. Endpoints: `GET /` (`hello, <name>`, optional `?name=`), `GET /health` (JSON from core), 404 otherwise. Port from `$PORT`, default 3000.
- `packages/core` — `@notapp/core`. Shared library; currently `HealthPayload` + `healthPayload()`. Consumed by api via `"@notapp/core": "workspace:*"`.
- `specs/` — spec files `NNNN-slug.md` (`NNNN` = highest existing + 1, zero-padded; first is `0001`). Copy `specs/TEMPLATE.md`; delete its italic instruction lines when filling in.
- Root: `nx.json` (target defaults: `build`/`test` cached, `build` depends on `^build`, `dev` continuous; `@nx/docker` plugin registered), `docker-compose.yml`, `Dockerfile` (prod), `Dockerfile.dev` (Bun + git for Nx).

## Commands

Run natively (Bun installed) or via the dev image (see README for the `nx` docker alias):

```sh
bun install                 # deps; bun.lock is committed — never edit it by hand
bun run dev                 # hot-reload API on :3000 (bun run --watch)
bun run start               # run API once
bun run build               # nx run-many -t build (cached)
bun run test                # nx run-many -t test (cached)
bun x nx build @notapp/api  # single project
bun x nx affected -t build  # only projects touched by changes
docker compose up           # containerized dev with hot reload
```

Regenerate `bun.lock` inside the container to match the image's Bun version:
`docker run --rm -v "$PWD":/app -w /app oven/bun:1-alpine bun install`

## Conventions

- Bun-first: use `Bun.serve`, `bun build`, `bun test`. No framework, no transpile step — TypeScript runs directly.
- New shared code goes in `packages/core` with a `build`/`test` script mirroring the existing package.json; apps depend on it via `workspace:*`.
- Tests use `bun:test` (`import { expect, test } from "bun:test"`) colocated as `src/*.test.ts`.
- Nx infers targets from package.json scripts; add scripts, don't hand-edit `nx.json` targets.
- Nx cache lives in `.nx/cache` (gitignored). Don't commit build outputs (`dist/`).
- Every feature/fix runs from a spec in `specs/`: objectives → no-go → testing criteria. The agent MUST read the nearest `AGENTS.md` for every file it changes, plus every `AGENTS.md` up to the repo root; nearest wins on conflict. The agent NEVER improvises outside the spec's objectives.

## Testing policy

- NEVER write unit or integration tests unless explicitly instructed.
- End-to-end / system-level tests MAY be written without instruction.
- NEVER add new code comments.

## Gotchas

- `apps/api` has no `test` script, so `nx run-many -t test` only runs `packages/core`. Add a `test` script to `apps/api` if you add API tests.
- The prod image runs `bun run start` (source), not the `dist` output; `bun build` exists for caching/CI, not runtime.
- `@nx/docker` plugin is registered but currently infers nothing useful; don't assume docker targets exist.
- `nx affected` needs git; the dev image installs git for this reason.

## Verification

Before finishing a change: `bun run build && bun run test`, and smoke the server (`bun run start`, then `curl localhost:3000/health`).
