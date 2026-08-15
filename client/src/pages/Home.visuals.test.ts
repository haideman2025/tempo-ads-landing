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
    expect(commercialAssets).toHaveLength(23);
    expect(source).toContain("const visualDiary = [");
    expect(source).toContain("THE VISUAL DIARY / 10 FRAMES");
    expect(source).toContain("DESIGN STUDIES / TRUE SCALE");
  });
});
