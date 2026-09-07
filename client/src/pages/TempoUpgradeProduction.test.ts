import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "client/src/pages/TempoUpgradeStaging.tsx"), "utf8");
const app = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");

describe("TEMPO landing upgrade production", () => {
  it("mounts the approved landing candidate at the public root", () => {
    expect(app).toContain('const TempoUpgradeProduction = () => <TempoUpgradeStaging mode="production" />');
    expect(app).toContain('const TempoUpgradePreview = () => <TempoUpgradeStaging mode="staging" />');
    expect(app).toContain('path="/" component={TempoUpgradeProduction}');
    expect(app).toContain('path="/staging/tempo-upgrade" component={TempoUpgradePreview}');
  });

  it("creates a real COD reservation only in production mode", () => {
    expect(source).toContain("const order = trpc.orders.create.useMutation");
    expect(source).toContain("if (isStaging)");
    expect(source).toContain("order.mutate({ fullName: form.fullName");
    expect(source).toContain("orderConsent: form.consent");
    expect(source).toContain('data-clarity-mask="true"');
  });

  it("uses ViewContent, InitiateCheckout and Lead without recording a COD submit as Purchase", () => {
    ["ViewContent", "InitiateCheckout", "Lead", "QualifiedLead", "Purchase"].forEach(event => expect(source).toContain(event));
    expect(source).toContain('window.fbq?.("track", event, payload, { eventID: payload.event_id })');
    expect(source).not.toContain('trackFunnel("Purchase"');
    expect(source).not.toContain('window.fbq?.("track", "Purchase"');
  });
});
