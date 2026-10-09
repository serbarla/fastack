# apps/api — @notapp/api

- HTTP server: `Bun.serve` in `src/index.ts`; routes `GET /` (`hello, <name>`, optional `?name=`), `GET /health` (JSON from core), else 404. Port `$PORT`, default 3000.
- Depends on `@notapp/core` via `workspace:*`.
- No `test` script; add one (`bun test`) only if API tests are added.
