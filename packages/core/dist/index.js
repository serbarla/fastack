// @bun
// src/index.ts
function healthPayload(service = "api") {
  return {
    status: "ok",
    service,
    uptime: process.uptime()
  };
}
export {
  healthPayload
};
