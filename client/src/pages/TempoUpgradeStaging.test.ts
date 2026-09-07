import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "client/src/pages/TempoUpgradeStaging.tsx"), "utf8");
const styles = readFileSync(resolve(process.cwd(), "client/src/pages/tempo-upgrade-staging.css"), "utf8");
const app = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");
const documentHtml = readFileSync(resolve(process.cwd(), "client/index.html"), "utf8");

describe("TEMPO landing upgrade staging", () => {
  it("is isolated behind an explicit staging route", () => {
    expect(app).toContain('path="/staging/tempo-upgrade"');
    expect(source).toContain("BẢN STAGING · Không ghi đơn, không trừ tồn, không gửi Pixel production");
    expect(source).toContain("Bản staging: không lưu form, không tạo đơn và không giảm tồn kho.");
  });

  it("uses exactly the seven supplied visual names for the new landing system", () => {
    [
      "01-hero-grooming", "02-scale-hand-3ml", "03-ritual-black-actuator", "04-portable-grooming-pouch",
      "05-couple-evening-context", "06-pull-push-unboxing", "07-discreet-delivery",
    ].forEach(asset => expect(source).toContain(asset));
    expect((source.match(/name="(?:hero|scale|ritual|pouch|couple|unboxing|delivery)"/g) ?? []).length).toBeGreaterThanOrEqual(7);
  });

  it("keeps the compact 3ml physical-product constraints explicit", () => {
    ["TEMPO 3ML", "3ML THỰC TẾ", "Nằm gọn trong lòng bàn tay.", "Nút nhấn màu đen", "vòng cổ bạc", "KÉO TRÊN · ĐẨY DƯỚI", "teal–cam"].forEach(copy => expect(source).toContain(copy));
    expect(source).not.toContain("nắp mở");
  });

  it("implements nine sale-focused sections before footer", () => {
    ["tempo-stage__hero", "tempo-stage__intro", "tempo-stage__context", "tempo-stage__ritual", "tempo-stage__evening", "tempo-stage__design", "tempo-stage__transparency", "tempo-stage__offer", "tempo-stage__faq"].forEach(section => expect(source).toContain(section));
    expect((source.match(/<section\b/g) ?? [])).toHaveLength(9);
  });

  it("keeps operation facts transparent until V2JOY confirms them", () => {
    expect(source).toContain("CẦN V2JOY XÁC NHẬN");
    expect(source).toContain("PLACEHOLDER CẦN XÁC NHẬN");
    expect(source).toContain("Gọi xác nhận trước khi gửi");
    expect(source).toContain("đóng gói kín đáo");
  });

  it("keeps a two-step COD preview isolated behind staging mode", () => {
    expect(source).toContain("const [formStep, setFormStep] = useState<1 | 2>(1)");
    expect(source).toContain("1. THÔNG TIN");
    expect(source).toContain("2. GIAO HÀNG");
    expect(source).toContain('data-clarity-mask="true"');
    expect(source).toContain("if (isStaging)");
    expect(source).toContain("Bản staging đã kiểm tra đủ hai bước");
    expect(source).not.toContain('trackFunnel("Purchase"');
  });

  it("prepares only the allowed funnel progression and does not emit production events in staging", () => {
    ["ViewContent", "InitiateCheckout", "Lead", "QualifiedLead"].forEach(event => expect(source).toContain(event));
    expect(source).toContain('mode === "staging"');
    expect(source).not.toContain('window.fbq?.("track", "Purchase"');
  });

  it("preserves legal facts and avoids performance, treatment, or simulated-review claims", () => {
    ["Xịt 3–4 nhát", "chờ 60 phút rồi rửa sạch", "354/20/CBMP-NB", "Nanofrance", "Xuất xứ: Việt Nam", "Không hiển thị rating, tên cá nhân hay lời đánh giá tạo sẵn."].forEach(copy => expect(source).toContain(copy));
    ["gây tê", "kéo dài thời gian", "tăng cường sinh lý", "cam kết hiệu quả"].forEach(claim => expect(source).not.toContain(claim));
  });

  it("implements lazy responsive images, mobile text-media separation, JSON-LD and an accessible viewport", () => {
    expect(source).toContain('loading={priority ? "eager" : "lazy"}');
    expect(source).toContain('srcSet={`${asset.webp480} 480w, ${asset.webp960} 960w, ${asset.webp} ${asset.width}w`}');
    expect((source.match(/webp480:/g) ?? []).length).toBe(7);
    expect((source.match(/webp960:/g) ?? []).length).toBe(7);
    expect(source).toContain('type="application/ld+json"');
    expect(source).toContain('rel = "canonical"');
    expect(source).toContain('mode === "staging" ? document.createElement("meta") : null');
    expect(styles).toContain(".tempo-stage__hero-media { position: relative; order: 0;");
    expect(styles).toContain(".tempo-stage__hero-copy { order: 1;");
    expect(styles).toContain(".tempo-stage__evening-media { position: relative;");
    expect(styles).toContain("--teal: #007b8c");
    expect(styles).toContain("--teal-on-dark: #91dfe8");
    expect(styles).toContain("background: #9c3e22");
    expect(styles).toContain("color: #686862");
    expect(documentHtml).toContain("initial-scale=1.0");
    expect(documentHtml).not.toContain("maximum-scale=1");
  });
});
