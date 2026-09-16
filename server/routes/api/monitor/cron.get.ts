import { defineEventHandler, getRequestHeader, setResponseStatus } from "h3";
import { authOk, runMonitorCycle } from "../../../lib/market-monitor";

export default defineEventHandler(async (event) => {
  const request = new Request("http://internal", { headers: { authorization: getRequestHeader(event, "authorization") ?? "" } });
  if (!authOk(request)) { setResponseStatus(event, 401); return { ok: false, error: "Unauthorized" }; }
  try {
    const state = await runMonitorCycle();
    return { ok: true, updatedAt: state.updatedAt, last: state.last, newSignals: state.newSignals, metrics: state.metrics };
  } catch (error) {
    setResponseStatus(event, 500);
    return { ok: false, error: error instanceof Error ? error.message : "Monitor cycle failed" };
  }
});
