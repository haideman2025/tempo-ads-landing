import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { PRODUCT_CONFIG, formatVnd } from "@/config/tempoProduct";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(testDir, "../../..");
const pageSource = readFileSync(path.join(testDir, "TempoRestoreV2Staging.tsx"), "utf8");
const appSource = readFileSync(path.join(projectRoot, "client/src/App.tsx"), "utf8");
const mainSource = readFileSync(path.join(projectRoot, "client/src/main.tsx"), "utf8");
const htmlSource = readFileSync(path.join(projectRoot, "client/index.html"), "utf8");
const boundarySource = readFileSync(path.join(projectRoot, "client/src/components/ErrorBoundary.tsx"), "utf8");

function recordsIn(constant: string) {
  const match = pageSource.match(new RegExp(`const ${constant} = \\[(.*?)\\] as const;`, "s"));
  return match?.[1].match(/\{ id: /g) ?? [];
}

describe("TEMPO Restore V2 staging regression", () => {
  it("centralizes the owner-confirmed 499.000đ product configuration", () => {
    expect(PRODUCT_CONFIG).toMatchObject({ sku: "tempo-3ml", price: 499_000, currency: "VND", maxQuantity: 2, inventoryCapacity: 1000 });
    expect(formatVnd(PRODUCT_CONFIG.price)).toBe("499.000đ");
    expect(pageSource).toContain("PRODUCT_CONFIG");
    expect(pageSource).not.toContain("349.000");
  });

  it("keeps Restore V2 on an independent noindex staging route", () => {
    expect(appSource).toContain('path="/staging/tempo-restore-v2"');
    expect(appSource).toContain('path="/" component={TempoUpgradeProduction}');
    expect(pageSource).toContain("noindex, nofollow");
  });

  it("restores every required media collection without replacing it with seven supplemental images", () => {
    expect(recordsIn("INFOGRAPHICS")).toHaveLength(10);
    expect(recordsIn("FEEDBACK")).toHaveLength(10);
    expect(recordsIn("DIARY")).toHaveLength(5);
    expect(pageSource.match(/tempo-background-0[1-5]/g)).toHaveLength(5);
    expect(pageSource).toContain("const handleVideoError");
    expect(pageSource).toContain("retryCount.current >= 2");
    expect(pageSource).toContain("const preloadObserver");
    expect(pageSource).toContain("const playbackObserver");
    expect(pageSource).toContain("entry.isIntersecting && entry.intersectionRatio >= 0.18");
    expect(pageSource).toContain('rootMargin: eager ? "0px" : "700px 0px"');
    expect(pageSource).toContain("player.pause()");
    expect(pageSource).toContain("autoPlay");
    expect(pageSource).toContain("muted");
    expect(pageSource).toContain("playsInline");
    expect(pageSource).not.toContain("requestPlayback");
    expect(pageSource).not.toContain("Phát nền chuyển động");
    expect(pageSource).not.toContain("manualPlayback");
    ["01-hero-grooming", "02-scale-hand-3ml", "03-ritual-black-actuator", "04-portable-grooming-pouch", "05-couple-evening-context", "06-pull-push-unboxing", "07-discreet-delivery"].forEach(asset => expect(pageSource).toContain(asset));
    ["tempo-pack-front", "tempo-pack-sides", "tempo-pack-back"].forEach(asset => expect(pageSource).toContain(asset));
  });

  it("protects exact header, product guidance, consent and safe claims", () => {
    expect(pageSource).toContain("TEMPO — XỊT LÀM CHỦ NHỊP YÊU 3ML");
    expect(pageSource).toContain("xịt 3–4 nhát, chờ 60 phút rồi rửa sạch");
    expect(pageSource).toContain("orderConsent");
    expect(pageSource).toContain("marketingConsent");
    expect(pageSource).toContain("354/20/CBMP-NB");
    expect(pageSource).toContain("không phải rating, không phải cam kết kết quả");
  });

  it("keeps staging non-mutating and excludes Purchase tracking at COD intent", () => {
    expect(pageSource).toContain("Không có đơn, thông tin liên hệ, trừ tồn kho, Pixel Purchase hoặc CAPI Purchase nào được tạo");
    expect(pageSource).not.toContain("orders.create");
    expect(pageSource).not.toContain("fbq(");
    expect(pageSource).not.toMatch(/track\([^\n]*Purchase/);
    expect(pageSource).toContain("QualifiedLead chỉ theo CRM sau xác nhận và Purchase chỉ theo CAPI sau khi giao thành công");
  });

  it("includes P0 resilience before and after React mounts without public stack traces", () => {
    expect(htmlSource).toContain('id="root" data-app-mounted="false"');
    expect(htmlSource).toContain("tempo-boot-fallback");
    expect(mainSource).toContain('document.getElementById("root")');
    expect(mainSource).toContain('recordBootIssue("missing_root")');
    expect(mainSource).toContain("onRecoverableError");
    expect(mainSource).toContain("tempo:boot-ready");
    expect(boundarySource).toContain("Thông tin COD chưa được ghi nhận");
    expect(boundarySource).not.toContain("error?.stack");
  });
});
