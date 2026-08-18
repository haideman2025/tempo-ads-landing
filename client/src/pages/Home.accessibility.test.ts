import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

describe("TEMPO sales landing accessibility baseline", () => {
  it("keeps clear page landmarks and labelled image-led sections", () => {
    expect(source).toContain('<header className="night-header">');
    expect(source).toContain('<main id="top">');
    expect(source).toContain("<footer>");
    expect(source).toContain('aria-labelledby="ingredient-atlas-title"');
    expect(source).toContain('aria-labelledby="transparency-title"');
    expect(source).toContain('aria-labelledby="protocol-title"');
  });

  it("provides meaningful alternatives and functional navigation for key visual controls", () => {
    expect(source).toContain('alt: "Infographic TEMPO về chín chiết xuất thực vật trong danh mục INCI"');
    expect(source).toContain('alt={`Packshot ${item.name} có nhãn TEMPO rõ ràng`}');
    expect(source).toContain('href="#inci-full"');
    expect(source).toContain('href="#story"');
    expect(source).toContain('aria-label="Timeline video TEMPO"');
    expect(source).toContain('aria-label={autoAdvance ? "Dừng tự phát" : "Tiếp tục tự phát"}');
  });

  it("makes waitlist selections, FAQ and consent readable to assistive technology", () => {
    expect(source).toContain('role="radiogroup" aria-label="Chọn số lượng TEMPO 3ml"');
    expect(source).toContain('role="radio" aria-checked={quantity === option}');
    expect(source).toContain('aria-expanded={openFaq === index}');
    expect(source).toContain("marketingConsent");
    expect(source).toContain('aria-live="polite"');
  });
});
