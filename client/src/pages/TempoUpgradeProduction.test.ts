import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "client/src/pages/TempoRestoreV2Staging.tsx"), "utf8");
const app = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");

describe("TEMPO Restore V2 production", () => {
  it("mounts Restore V2 at the public root and retains an independent staging route", () => {
    expect(app).toContain('const TempoRestoreV2Production = () => <TempoRestoreV2Staging mode="production" />');
    expect(app).toContain('const TempoRestoreV2Preview = () => <TempoRestoreV2Staging mode="staging" />');
    expect(app).toContain('path="/" component={TempoRestoreV2Production}');
    expect(app).toContain('path="/staging/tempo-restore-v2" component={TempoRestoreV2Preview}');
    expect(app).toContain('path="/staging/tempo-upgrade" component={TempoUpgradePreview}');
  });

  it("creates a real COD reservation only in production mode", () => {
    expect(source).toContain("const order = trpc.orders.create.useMutation");
    expect(source).toContain('const isStaging = mode === "staging"');
    expect(source).toContain("if (isStaging)");
    expect(source).toContain("order.mutate({");
    expect(source).toContain("orderConsent: form.orderConsent");
    expect(source).toContain('data-clarity-mask="true"');
  });

  it("uses ViewContent, InitiateCheckout and Lead without recording a COD submit as Purchase", () => {
    ["ViewContent", "InitiateCheckout", "Lead", "QualifiedLead", "Purchase"].forEach(event => expect(source).toContain(event));
    expect(source).toContain('window.fbq?.(STANDARD_PIXEL_EVENTS.has(event) ? "track" : "trackCustom", event, detail, { eventID: detail.event_id })');
    expect(source).not.toContain('trackFunnel("production", "Purchase"');
    expect(source).not.toContain('window.fbq?.("track", "Purchase"');
  });
});
