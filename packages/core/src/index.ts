export interface HealthPayload {
  status: "ok";
  service: string;
  uptime: number;
}

export function healthPayload(service = "api"): HealthPayload {
  return {
    status: "ok",
    service,
    uptime: process.uptime(),
  };
}
