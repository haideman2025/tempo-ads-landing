import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
const styles = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");
const documentHtml = readFileSync(resolve(process.cwd(), "client/index.html"), "utf8");

describe("TEMPO COD landing", () => {
  it("uses the new concept image system", () => {
    [
      "tempo-brand-hero_6c096b85.png", "tempo-pack-front_9e2c58ea.png", "tempo-pack-sides_99932a67.png",
      "tempo-pack-back_267c13e5.png", "tempo-couple-hands_6b173623.png", "tempo-benefits_e53327fd.png",
      "tempo-use-steps_a7b53030.png", "tempo-wait-ritual_0db05ba8.png", "tempo-carry_5d2617d2.png",
      "tempo-unbox_7fe4ee69.png", "tempo-design-detail_b6e6ad35.png", "tempo-story_fc38bf3c.png",
      "tempo-claim-label_10f35a7d.png",
    ].forEach(asset => expect(source).toContain(asset));
  });

  it("states the commercial offer exactly and exposes COD as the payment method", () => {
    expect(source).toContain("499.000đ");
    expect(source).toContain("TEMPO 3ML");
    expect(source).toContain("Thanh toán COD");
    expect(source).toContain("V2JOY gọi xác nhận trước khi gửi đi");
    expect(source).toContain('const remaining = stock?.remaining ?? 1000');
  });

  it("has one COD conversion form reachable from the hero and all page CTAs", () => {
    const formPosition = source.indexOf('className="order-section" id="dat-hang"');
    expect(formPosition).toBeGreaterThan(source.indexOf('className="tempo-hero"'));
    expect((source.match(/<form className="cod-form"/g) ?? [])).toHaveLength(1);
    expect(source).toContain('data-clarity-mask="true"');
    expect(source).toContain('className="mobile-sticky"');
    expect(source.match(/onClick={scrollToOrder}/g)?.length).toBeGreaterThanOrEqual(4);
  });

  it("collects only the information required to fulfil a COD order", () => {
    ["fullName", "phone", "address", "note", "orderConsent", "marketingConsent"].forEach(field => expect(source).toContain(`name="${field}"`));
    expect(source).toContain('autoComplete="street-address"');
    expect(source).toContain("Tôi đồng ý để V2JOY dùng thông tin này để xác nhận và giao đơn COD.");
  });

  it("supports a 1–2 bottle order and calculates the COD subtotal", () => {
    expect(source).toContain('const [quantity, setQuantity] = useState<1 | 2>(1)');
    expect(source).toContain('aria-label="Chọn số lượng TEMPO 3ml"');
    expect(source).toContain("value: quantity * 499000");
    expect(source).toContain("vnd(quantity * 499000)");
  });

  it("fires funnel events without sending PII to Meta", () => {
    expect(source).toContain('window.fbq?.("track", "ViewContent"');
    expect(source).toContain('window.fbq?.("trackCustom", "Scroll50")');
    expect(source).toContain('window.fbq?.("trackCustom", "FormStart"');
    expect(source).toContain('window.fbq?.("track", "InitiateCheckout"');
    expect(source).toContain('window.fbq?.("track", "Purchase"');
    expect(source).toContain('window.fbq?.("trackCustom", "OrderCodSuccess"');
    expect(source).not.toContain('fullName: String(data.get("fullName") || ""), value: quantity * 499000');
  });

  it("persists only non-PII campaign attribution", () => {
    expect(source).toContain('localStorage.getItem("tempo-attribution")');
    expect(source).toContain('utmSource: "utm_source"');
    expect(source).toContain('fbclid: "fbclid"');
    expect(source).toContain("...source");
  });

  it("uses only user-provided feedback visuals with transparent trust language", () => {
    ["feedback-01-spray_28cc30b5.png", "feedback-02-wait_8add3a01.png", "feedback-03-clean_7143b919.png", "feedback-04-intention_a9caba0e.png", "feedback-05-care_082b777c.png", "feedback-06-unboxing_d9e5a446.png", "feedback-07-guidance_62df674a.png", "feedback-08-flow_aa0ad378.png", "feedback-09-design_5d665c00.png", "feedback-10-compact_bcf288fa.png"].forEach(asset => expect(source).toContain(asset));
    expect(source).toContain("10 visual ghi lại các ý kiến tổng hợp từ nhóm khách hàng trải nghiệm TEMPO do V2JOY cung cấp.");
    expect(source).toContain("Trải nghiệm cá nhân có thể khác nhau.");
    expect(source).toContain("Không hiển thị rating, tên cá nhân hay lời đánh giá tạo sẵn.");
    expect(source).not.toContain("5.0/5");
    expect(source).not.toContain("khách hàng nói");
    expect(source).toContain('id="phan-hoi"');
    expect(styles).toContain(".feedback-gallery__stage{position:relative;aspect-ratio:1/1");
  });

  it("restores all five video chapters, visual diary and deferred media loading", () => {
    ["1-3_488cdaeb.mp4", "2-2_1c24d56b.mp4", "3-2_1be35ced.mp4", "4-2_5b3104ee.mp4", "5-2_104c988a.mp4"].forEach(video => expect(source).toContain(video));
    expect(source).toContain("function Scene(");
    expect(source).toContain("function Diary()");
    expect(source).toContain('aria-label="Các khoảnh khắc trong visual diary"');
    expect(source).toContain('rootMargin: "700px 0px"');
    expect(styles).toContain(".video-story-scene");
    expect(styles).toContain(".visual-diary__stage");
  });

  it("preserves complete text-bearing concept art in square mobile frames", () => {
    ["product-proof__image--square", "product-detail-showcase__image", "ritual-section--asset", "wait-section--asset", "mobile-safe-square"].forEach(className => expect(source).toContain(className));
    expect(styles).toContain(".mobile-safe-square{object-fit:contain!important");
    expect(styles).toContain(".product-detail-showcase__figure{aspect-ratio:1/1");
    expect(styles).toContain(".label-gallery figure{aspect-ratio:1/1");
    expect(styles).toContain(".final-cta>.mobile-safe-square{object-fit:contain!important");
  });

  it("uses one focused desktop product-detail slide instead of three competing visual cards", () => {
    expect(source).toContain("function ProductDetails()");
    expect(source).toContain('aria-label="Các góc nhìn chi tiết TEMPO"');
    expect(source).toContain("product-detail-showcase__tabs");
    expect(source).not.toContain('className="visual-grid"');
    expect(styles).toContain(".product-detail-showcase__layout{display:grid");
  });

  it("keeps product guidance factual and presents label-backed safety content", () => {
    ["Xịt 3–4 nhát", "Chờ 60 phút, sau đó rửa sạch.", "Chỉ dùng ngoài da, không được uống.", "Không xịt lên vùng da có vết thương hở hoặc đang trầy xước.", "dưới 30°C", "Hạn sử dụng: 24 tháng kể từ ngày sản xuất.", "354/20/CBMP-NB"].forEach(copy => expect(source).toContain(copy));
    expect(source).toContain("Chi nhánh Hà Nam – Công ty TNHH Sản xuất DP Công nghệ cao Nanofrance");
    expect(source).toContain("Xuất xứ: Việt Nam.");
    expect(source).toContain("Danh mục thành phần (INCI)");
  });

  it("keeps responsive, Vietnamese and tracking foundations", () => {
    expect(documentHtml).toContain("Be+Vietnam+Pro");
    expect(documentHtml).toContain("family=Lora");
    expect(documentHtml).toContain("connect.facebook.net/en_US/fbevents.js");
    expect(documentHtml).toContain('"y468d5yk1c"');
    expect(styles).toContain(".tempo-hero");
    expect(styles).toContain(".cod-form");
    expect(styles).toContain("@media(max-width:800px)");
  });
});
