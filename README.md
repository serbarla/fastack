# notapp

Bun workspace monorepo, containerized.

## Layout

- `apps/api` — HTTP server (`Bun.serve`), depends on `@notapp/core` via `workspace:*`
- `packages/core` — shared library

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

## Tests

```sh
docker run --rm -v "$PWD":/app -w /app oven/bun:1-alpine bun test
```

## Lockfile

`bun.lock` is committed; regenerate inside the container to match the image's Bun version:

```sh
docker run --rm -v "$PWD":/app -w /app oven/bun:1-alpine bun install
```
