import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

describe("TEMPO landing visual system", () => {
  it("uses the uploaded motion asset as an accessible, mobile-safe video", () => {
    expect(source).toContain("tempo-video-01-arrival_2c34df78.mp4");
    expect(source).toContain("autoPlay muted loop playsInline preload=\"metadata\"");
    expect(source).toContain("poster={ASSETS.heroPoster}");
  });

  it("references the expanded lifestyle-first image system rather than a minimal product gallery", () => {
    const commercialAssets = source.match(/\/manus-storage\/tempo-[^"]+/g) ?? [];
    expect(commercialAssets.length).toBeGreaterThanOrEqual(23);
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
    expect(source).toContain("transparencyFormula: \"/manus-storage/tempo-transparency-01-formula_2ad96b95.jpg\"");
    expect(source).toContain("tempo-transparency-02-origin_998f7423.jpg");
    expect(source).toContain("tempo-transparency-03-label_5b6f90ba.jpg");
    expect(source).toContain("tempo-transparency-04-proof_6ba9f88f.jpg");
    expect(source).toContain("Công ty TNHH SX Công nghệ cao NANOFRANCE");
    expect(source).toContain("Giúp chăm sóc dưỡng ẩm da.");
    expect(source).toContain("Purified Water, Alcohol (Ethanol)");
    expect(source.toLowerCase()).toContain("nhãn thành phẩm, số công bố và hồ sơ chính thức");
    expect(source).toContain("transparency-protocol");
  });

  it("uses image-led botanical and Vietnam-manufacturing storytelling without inventing ingredient provenance", () => {
    expect(source).toContain("tempo-provenance-01-botanical-studies_b1cbc1c5.jpg");
    expect(source).toContain("tempo-provenance-02-formula_4c74c193.jpg");
    expect(source).toContain("tempo-provenance-03-vietnam-made_a370a298.jpg");
    expect(source).toContain("tempo-provenance-04-open-file_a2a8f684.jpg");
    expect(source).toContain("tempo-ritual-02-carry-signal_4c7ab5e4.jpg");
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
    expect(source).toContain('pack5ml: "/manus-storage/tempo-pack-5ml-standalone-final_a9834962.jpg"');
    expect(source).toContain('packCourse: "/manus-storage/tempo-pack-2x5ml-verified_194f0c5d.png"');
    expect(source).toContain('name: "TEMPO 5ml", title: "Nhịp đều đặn", note: "Format đầy đủ cho routine riêng tư", image: ASSETS.pack5ml');
    expect(source).toContain('name: "TEMPO 2×5ml", title: "Nhịp quay lại", note: "Bundle hai chai 5ml cho lựa chọn đầy đủ hơn", image: ASSETS.packCourse');
  });

  it("uses a connected lifestyle diary and keeps the product as a supporting cue", () => {
    expect(source).toContain("tempo-lifestyle-01-exit-evening_9c1f24f7.jpg");
    expect(source).toContain("tempo-lifestyle-02-night-walk_745b948a.jpg");
    expect(source).toContain("tempo-lifestyle-03-together-at-home_98385daf.jpg");
    expect(source).toContain("tempo-lifestyle-04-morning-return_bb8916d6.jpg");
    expect(source).toContain("tempo-l09-date-table_dcf91e62.jpg");
    expect(source).toContain("MỘT BUỔI TỐI, KHÔNG PHẢI MỘT CATALOGUE");
    expect(source).toContain("info-ribbon--lifestyle");
    expect(source).toContain("ASSETS.approvedScale");
    expect(source).toContain("function SafeImage");
    const diaryFrames = source.match(/ASSETS\.(?:lifestyleExit|lifestyleWalk|lifestyleObjects|lifestyleTogether|ritualPreparation|lifestyleMorning)/g) ?? [];
    expect(new Set(diaryFrames)).toHaveLength(6);
    expect(source).toContain("gallery-grid--diary");
  });

  it("uses a reusable round V2JOY badge instead of loose logo images in the page chrome", () => {
    expect(source).toContain("function V2JoyBadge");
    expect(source).toContain('<V2JoyBadge />');
    expect(source).toContain('className={`v2joy-badge ${className}`}');
    expect(source).not.toContain('<footer><div className="footer-brand"><img src={V2JOY_LOGO}');
  });
});
