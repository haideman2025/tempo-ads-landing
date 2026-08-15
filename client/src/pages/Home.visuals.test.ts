import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
const styles = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");
const documentHtml = readFileSync(resolve(process.cwd(), "client/index.html"), "utf8");

describe("TEMPO landing visual system", () => {
  it("uses five uploaded motion assets as accessible, mobile-safe video", () => {
    expect(source).toContain("tempo-motion-01-reservation_302dc7af.mp4");
    expect(source).toContain("tempo-motion-02-carry_121f483d.mp4");
    expect(source).toContain("tempo-motion-03-craft_c0137201.mp4");
    expect(source).toContain("tempo-motion-04-date-table_b2232978.mp4");
    expect(source).toContain("tempo-motion-05-duo-hero_0afbb738.mp4");
    expect(source).toContain("autoPlay={!reducedMotion} muted loop playsInline preload=\"metadata\"");
    expect(source).toContain("poster={ASSETS.heroPoster}");
    expect(source).toContain("function MotionCarousel");
    expect(source).toContain("aria-roledescription=\"carousel\"");
    expect(source).toContain("onTouchStart={handleTouchStart}");
    expect(source).toContain("onTouchEnd={handleTouchEnd}");
    expect(source).toContain("Math.abs(endX - startX) < 44");
    expect(source).toContain("data-playback-state");
    expect(source).toContain("onPlaying={() => setPlaybackState(\"playing\")}");
    expect(source).toContain("const [hasPlaybackError, setHasPlaybackError] = useState(false)");
    expect(source).toContain("(reducedMotion || hasPlaybackError) && <SafeImage");
    expect(source).toContain("setHasPlaybackError(true)");
    expect(source).toContain("useReducedMotion");
  });

  it("references the expanded lifestyle-first image system rather than a minimal product gallery", () => {
    const commercialAssets = source.match(/\/manus-storage\/tempo-[^"]+/g) ?? [];
    expect(commercialAssets.length).toBeGreaterThanOrEqual(23);
    const optimizedImages = source.match(/\/manus-storage\/(?:tempo|v2joy)[^"]+\.webp/g) ?? [];
    expect(optimizedImages.length).toBeGreaterThanOrEqual(50);
    expect(source).toContain("const visualDiary = [");
    expect(source).toContain("THE VISUAL DIARY / 06 CHAPTERS");
    expect(source).toContain("DESIGN STUDIES / TRUE SCALE");
  });

  it("uses Golden Circle sections and makes every SKU available in the waitlist", () => {
    expect(source).toContain("WHY / 01");
    expect(source).toContain("HOW / 03 · MINH BẠCH TRƯỚC LỜI HỨA");
    expect(source).toContain("WHAT / THE FIRST EDITION");
    expect(source).toContain('"duo"');
    expect(source).toContain('"course-2x5ml"');
    expect(source).toContain("Xem INCI đầy đủ");
    expect(source.toLowerCase()).toContain("truy xuất");
  });

  it("makes the transparency module evidence-led, visual, and claim-safe", () => {
    expect(source).toContain("transparencyFormula: \"/manus-storage/tempo-transparency-01-formula_249721d9.webp\"");
    expect(source).toContain("tempo-transparency-02-origin_25a569e7.webp");
    expect(source).toContain("tempo-transparency-03-label_9497592e.webp");
    expect(source).toContain("tempo-transparency-04-proof_cf3834a3.webp");
    expect(source).toContain("Công ty TNHH SX Công nghệ cao NANOFRANCE");
    expect(source).toContain("Giúp chăm sóc dưỡng ẩm da.");
    expect(source).toContain("Purified Water, Alcohol (Ethanol)");
    expect(source.toLowerCase()).toContain("nhãn thành phẩm, số công bố và hồ sơ chính thức");
    expect(source).toContain("transparency-protocol");
  });

  it("uses image-led botanical and Vietnam-manufacturing storytelling without inventing ingredient provenance", () => {
    expect(source).toContain("tempo-provenance-01-botanical-studies_2391a2e1.webp");
    expect(source).toContain("tempo-provenance-02-formula_e1e3ff78.webp");
    expect(source).toContain("tempo-provenance-03-vietnam-made_ccf943a4.webp");
    expect(source).toContain("tempo-provenance-04-open-file_3404f077.webp");
    expect(source).toContain("tempo-ritual-02-carry-signal_4205e67a.webp");
    expect(source).toContain("TEMPO được sản xuất tại Việt Nam");
    expect(source).toContain("Hình ảnh thảo mộc là diễn giải danh mục chiết xuất thực vật");
    expect(source).not.toContain("Nguyên liệu Việt Nam");
    expect(source).not.toContain("trồng tại Việt Nam");
  });

  it("keeps the diary image-first rather than placing a paragraph on every frame", () => {
    expect(source).toContain("Sáu khung hình. Một nhịp liền mạch.");
    expect(source).not.toContain("copy: \"Một cuộc hẹn có chủ đích bắt đầu từ lúc bạn rời nhịp vội.\"");
    expect(source).not.toContain("{frame.copy}");
  });

  it("keeps 5ml and 2×5ml formats on dedicated, non-mixed packshots", () => {
    expect(source).toContain('pack5ml: "/manus-storage/tempo-pack-5ml-standalone-final_d1d4aa8e.webp"');
    expect(source).toContain('packCourse: "/manus-storage/tempo-pack-2x5ml-verified_bc1cb656.webp"');
    expect(source).toContain('name: "TEMPO 5ml", title: "Nhịp đều đặn", note: "Format đầy đủ cho routine riêng tư", image: ASSETS.pack5ml');
    expect(source).toContain('name: "TEMPO 2×5ml", title: "Nhịp quay lại", note: "Bundle hai chai 5ml cho lựa chọn đầy đủ hơn", image: ASSETS.packCourse');
  });

  it("uses a connected lifestyle diary and keeps the product as a supporting cue", () => {
    expect(source).toContain("tempo-lifestyle-01-exit-evening_334132f2.webp");
    expect(source).toContain("tempo-couple-01-kitchen-evening_df318ac9.webp");
    expect(source).toContain("tempo-couple-02-walk-home_e372d5a3.webp");
    expect(source).toContain("tempo-lifestyle-04-morning-return_a7805e20.webp");
    expect(source).toContain("tempo-l09-date-table_a6786deb.webp");
    expect(source).toContain("MỘT BUỔI TỐI, KHÔNG PHẢI MỘT CATALOGUE");
    expect(source).toContain("info-ribbon--lifestyle");
    expect(source).toContain("ASSETS.approvedScale");
    expect(source).toContain("function SafeImage");
    const diaryFrames = source.match(/ASSETS\.(?:lifestyleExit|coupleWalk|lifestyleObjects|coupleKitchen|ritualPreparation|lifestyleMorning)/g) ?? [];
    expect(new Set(diaryFrames)).toHaveLength(6);
    expect(source).toContain("gallery-grid--diary");
  });

  it("uses a reusable round V2JOY badge instead of loose logo images in the page chrome", () => {
    expect(source).toContain("function V2JoyBadge");
    expect(source).toContain('<V2JoyBadge />');
    expect(source).toContain('className={`v2joy-badge ${className}`}');
    expect(source).not.toContain('<footer><div className="footer-brand"><img src={V2JOY_LOGO}');
  });

  it("adds claim-safe technology and botanical infographics without inventing origin", () => {
    expect(source).toContain("tempo-infographic-01-design-signal_56b6f161.webp");
    expect(source).toContain("tempo-infographic-02-botanical-field_3dc407b6.webp");
    expect(source).toContain("Hình ảnh thảo mộc gợi không khí Việt Nam");
    expect(source).toContain("không xác nhận nguồn trồng, nước xuất xứ");
  });

  it("loads Vietnamese-supporting font families and uses responsive interaction styles", () => {
    expect(documentHtml).toContain("Be+Vietnam+Pro");
    expect(documentHtml).toContain("family=Lora");
    expect(styles).toContain('font-family:"Be Vietnam Pro"');
    expect(styles).toContain(".motion-carousel__stage");
    expect(styles).toContain(".infographic-pair__grid");
    expect(styles).toContain("touch-action:pan-y");
    expect(styles).toContain("@media (prefers-reduced-motion: reduce)");
    expect(styles).toContain(".motion-carousel__stage>video{display:none}");
  });
});
