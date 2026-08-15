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

  it("references the complete commercial image system rather than a minimal three-image gallery", () => {
    const commercialAssets = source.match(/\/manus-storage\/tempo-[^\"]+/g) ?? [];
    expect(commercialAssets.length).toBeGreaterThanOrEqual(23);
    expect(source).toContain("const visualDiary = [");
    expect(source).toContain("THE VISUAL DIARY / 10 CHAPTERS");
    expect(source).toContain("DESIGN STUDIES / TRUE SCALE");
  });

  it("uses Golden Circle sections and makes every SKU available in the waitlist", () => {
    expect(source).toContain("WHY / 01");
    expect(source).toContain("HOW / 03 · MINH BẠCH TRƯỚC LỜI HỨA");
    expect(source).toContain("WHAT / THE FIRST EDITION");
    expect(source).toContain('"duo"');
    expect(source).toContain('"course-2x5ml"');
    expect(source).toContain("Đọc INCI");
    expect(source).toContain("Truy xuất");
  });

  it("keeps 5ml and 2×5ml formats on dedicated, non-mixed packshots", () => {
    expect(source).toContain('pack5ml: "/manus-storage/tempo-pack-5ml-standalone-final_a9834962.jpg"');
    expect(source).toContain('packCourse: "/manus-storage/tempo-pack-2x5ml-verified_194f0c5d.png"');
    expect(source).toContain('name: "TEMPO 5ml", title: "Nhịp đều đặn", note: "Format đầy đủ cho routine riêng tư", image: ASSETS.pack5ml');
    expect(source).toContain('name: "TEMPO 2×5ml", title: "Nhịp quay lại", note: "Bundle hai chai 5ml cho lựa chọn đầy đủ hơn", image: ASSETS.packCourse');
  });

  it("uses the connected ten-scene diary and visual fallback rather than rejected lifestyle frames", () => {
    expect(source).not.toContain('ASSETS.pocket, "01 / POCKET SIGNAL"');
    expect(source).not.toContain('ASSETS.gift, "07 / GIFT READY"');
    expect(source).not.toContain('ASSETS.date, "08 / THE TABLE"');
    expect(source).not.toContain("ASSETS.ritual}");
    expect(source).toContain("ASSETS.approvedScale");
    expect(source).toContain("ASSETS.masterTabletop");
    expect(source).toContain("function SafeImage");
    expect(source).toContain("tempo-diary-rebuilt-01-exit");
    expect(source).toContain("tempo-diary-final-02-pause_5f867810.jpg");
    expect(source).toContain("tempo-diary-final-03-signal_a5aaa208.jpg");
    expect(source).toContain("tempo-diary-final-04-choose_7af39b22.jpg");
    expect(source).toContain("tempo-diary-final-05-together_fc4a7e52.jpg");
    expect(source).toContain("tempo-diary-final-06-arrival_f6c3c434.jpg");
    expect(source).toContain("tempo-diary-final-07-evening_6f754f7b.jpg");
    expect(source).toContain("tempo-diary-final-08-detail_e88069c6.jpg");
    expect(source).toContain("tempo-diary-final-09-home-away_4b81419e.jpg");
    expect(source).toContain("tempo-diary-final-10-return_eaaf682b.jpg");
    const diaryFrames = source.match(/ASSETS\.diary(?:Exit|Pause|Signal|Choose|Together|Arrival|Evening|Detail|HomeAway|Return)/g) ?? [];
    expect(new Set(diaryFrames)).toHaveLength(10);
    expect(source).toContain("gallery-grid--diary");
  });
});
