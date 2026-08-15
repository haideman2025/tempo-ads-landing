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
    const commercialAssets = source.match(/\/manus-storage\/tempo-(?:p|l|h|i)\d{2}[^\"]+/g) ?? [];
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

  it("uses the connected ten-scene diary and visual fallback rather than rejected lifestyle frames", () => {
    expect(source).not.toContain('ASSETS.pocket, "01 / POCKET SIGNAL"');
    expect(source).not.toContain('ASSETS.gift, "07 / GIFT READY"');
    expect(source).not.toContain('ASSETS.date, "08 / THE TABLE"');
    expect(source).not.toContain("ASSETS.ritual}");
    expect(source).toContain("ASSETS.approvedScale");
    expect(source).toContain("ASSETS.masterTabletop");
    expect(source).toContain("function SafeImage");
    expect(source).toContain("tempo-diary-rebuilt-01-exit");
    const diaryFrames = source.match(/ASSETS\.diary(?:Exit|Pause|Signal|Choose|Together|Arrival|Evening|Detail|HomeAway|Return)/g) ?? [];
    expect(new Set(diaryFrames)).toHaveLength(10);
    expect(source).toContain("gallery-grid--diary");
  });
});
