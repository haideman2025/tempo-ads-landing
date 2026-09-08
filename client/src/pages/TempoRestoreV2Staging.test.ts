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

  it("keeps a noindex staging route while mounting Restore V2 in production at the public root", () => {
    expect(appSource).toContain('path="/staging/tempo-restore-v2"');
    expect(appSource).toContain('const TempoRestoreV2Production = () => <TempoRestoreV2Staging mode="production" />');
    expect(appSource).toContain('path="/" component={TempoRestoreV2Production}');
    expect(appSource).toContain('const TempoRestoreV2Preview = () => <TempoRestoreV2Staging mode="staging" />');
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
    expect(pageSource).toContain('const isStaging = mode === "staging"');
    expect(pageSource).toContain("if (isStaging)");
    expect(pageSource).toContain('trackFunnel("staging", "Lead"');
    expect(pageSource).toContain("order.mutate({");
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

  it("chỉ bắt buộc đồng ý xử lý đơn, không ép đồng ý nhận marketing", () => {
    // Server khai marketingConsent là optional; ép tick ở UI vừa chặn phễu ở bước cuối,
    // vừa khiến đồng ý marketing không còn là đồng ý tự nguyện.
    expect(pageSource).toContain("if (!form.address.trim() || !form.orderConsent) {");
    expect(pageSource).not.toContain("|| !form.marketingConsent) {");
    const marketingCheckbox = pageSource.match(/<input type="checkbox" checked=\{form\.marketingConsent\}[^/]*\/>/)?.[0] ?? "";
    expect(marketingCheckbox).not.toContain("required");
    const orderCheckbox = pageSource.match(/<input type="checkbox" checked=\{form\.orderConsent\}[^/]*\/>/)?.[0] ?? "";
    expect(orderCheckbox).toContain("required");
  });

  it("gửi sự kiện tự đặt tên qua trackCustom để Meta không lặng lẽ bỏ", () => {
    // fbq('track') chỉ nhận tên chuẩn của Meta. ViewInfographic/ViewRitual/ViewFeedback
    // từng gửi qua 'track' và không hề xuất hiện trong dataset của pixel.
    expect(pageSource).toContain('STANDARD_PIXEL_EVENTS.has(event) ? "track" : "trackCustom"');
    const standardList = pageSource.match(/const STANDARD_PIXEL_EVENTS[^;]+;/)?.[0] ?? "";
    for (const standard of ["ViewContent", "InitiateCheckout", "Lead"]) {
      expect(standardList, standard).toContain(`"${standard}"`);
    }
    for (const custom of ["ViewInfographic", "ViewRitual", "ViewFeedback"]) {
      expect(standardList, custom).not.toContain(`"${custom}"`);
    }
  });
});
