import { defineEventHandler, getRequestHeader } from "h3";
import { authOk, getMonitorState, runMonitorCycle } from "../../lib/market-monitor";

export default defineEventHandler(async (event) => {
  const request = new Request("http://internal", {
    headers: {
      authorization: getRequestHeader(event, "authorization") ?? "",
      "x-monitor-key": getRequestHeader(event, "x-monitor-key") ?? "",
    },
  });
  if (!authOk(request)) return { ok: false, error: "Unauthorized" };
  const run = new URL(event.node.req.url ?? "/api/monitor", "http://internal").searchParams.get("run") === "1";
  return run ? await runMonitorCycle() : await getMonitorState();
});
