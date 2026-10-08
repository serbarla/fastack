# notapp

Bun workspace monorepo with Nx task caching, containerized.

## Layout

- `apps/api` — HTTP server (`Bun.serve`), depends on `@notapp/core` via `workspace:*`
- `packages/core` — shared library
- `nx.json` — Nx target defaults: `build`/`test` cached, `dev` continuous

## Develop (container, hot reload)

```sh
docker compose up
```

Source is bind-mounted; `bun run --watch` reloads on change. API on http://localhost:3000.

## Run (image)

```sh
docker build -t notapp-api .
docker run --rm -p 3000:3000 notapp-api
```

## Endpoints

- `GET /` → `hello, <name>` (`?name=` optional)
- `GET /health` → JSON health payload

## Tasks (Nx, cached)

Use the dev image (`Dockerfile.dev`: Bun + git, `NX_CACHE_DIRECTORY` pinned to the bind-mounted `.nx/cache`):

```sh
docker build -f Dockerfile.dev -t notapp-dev .

alias nx='docker run --rm -v "$PWD":/app -w /app notapp-dev bun x nx'

nx run-many -t build          # all projects, cacheable
nx run-many -t build          # second run: restored from cache
nx build @notapp/api          # single project
nx affected -t build          # only projects touched by working-tree/committed changes
nx run-many -t test           # cached tests
```

Cache lives in `.nx/cache` (gitignored) and persists across containers via the bind mount.

## Tests

```sh
docker run --rm -v "$PWD":/app -w /app notapp-dev bun x nx run-many -t test
```

## Lockfile

`bun.lock` is committed; regenerate inside the container to match the image's Bun version:

```sh
docker run --rm -v "$PWD":/app -w /app oven/bun:1-alpine bun install
```
