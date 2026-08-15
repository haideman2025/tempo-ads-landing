import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

describe("TEMPO landing accessibility baseline", () => {
  it("keeps clear page landmarks and labelled image-led sections", () => {
    expect(source).toContain("<header className=\"night-header\">");
    expect(source).toContain("<main id=\"top\">");
    expect(source).toContain("<footer>");
    expect(source).toContain('aria-labelledby="ingredient-origin-title"');
    expect(source).toContain('aria-labelledby="transparency-title"');
  });

  it("provides meaningful alternatives and functional navigation for key visual controls", () => {
    expect(source).toContain('alt="Nghiên cứu hình ảnh diễn giải các chiết xuất thực vật trong danh mục INCI TEMPO"');
    expect(source).toContain('alt="TEMPO 3ml bên điện thoại và vật dụng chuẩn bị trước khi đi"');
    expect(source).toContain('href="#inci-full"');
    expect(source).toContain('href="#story"');
  });

  it("makes waitlist selections and disclosures readable to assistive technology", () => {
    expect(source).toContain('role="radiogroup" aria-label="Chọn pack TEMPO quan tâm"');
    expect(source).toContain('role="radio" aria-checked={preferredSku === item.id}');
    expect(source).toContain('aria-expanded={openFaq === index}');
    expect(source).toContain('marketingConsent');
  });
});
