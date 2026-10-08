import { expect, test } from "bun:test";
import { healthPayload } from "./index";

test("healthPayload reports ok with uptime", () => {
  const payload = healthPayload("api");
  expect(payload.status).toBe("ok");
  expect(payload.service).toBe("api");
  expect(payload.uptime).toBeGreaterThanOrEqual(0);
});
