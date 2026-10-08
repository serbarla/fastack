// @bun
// ../../packages/core/src/index.ts
function healthPayload(service = "api") {
  return {
    status: "ok",
    service,
    uptime: process.uptime()
  };
}

// src/index.ts
var port = Number(process.env.PORT ?? 3000);
var server = Bun.serve({
  port,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/health") {
      return Response.json(healthPayload());
    }
    if (url.pathname === "/") {
      const name = url.searchParams.get("name") ?? "world";
      return new Response(`hello, ${name}`);
    }
    return new Response("Not Found", { status: 404 });
  }
});
console.log(`api listening on :${server.port}`);
