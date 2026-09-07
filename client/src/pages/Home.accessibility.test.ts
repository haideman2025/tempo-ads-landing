import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

describe("TEMPO COD landing accessibility baseline", () => {
  it("keeps clear page landmarks and labelled product sections", () => {
    expect(source).toContain('<header className="tempo-header">');
    expect(source).toContain('<main className="tempo-site">');
    expect(source).toContain('<footer>');
    expect(source).toContain('id="dat-hang" aria-labelledby="order-title"');
    expect(source).toContain('id="san-pham"');
    expect(source).toContain('id="nghi-thuc"');
    expect(source).toContain('id="minh-bach"');
  });

  it("provides meaningful image alternatives and functional in-page navigation", () => {
    expect(source).toContain('alt="TEMPO by V2JOY: hộp và chai 3ml trên nền ivory"');
    expect(source).toContain('alt="Ba bước sử dụng TEMPO: làm sạch, xịt thoa đều và rửa sạch sau 60 phút"');
    expect(source).toContain('aria-label="Điều hướng"');
    expect(source).toContain('href="#san-pham"');
    expect(source).toContain('href="#nghi-thuc"');
    expect(source).toContain('href="#minh-bach"');
  });

  it("makes quantity selection, consents and outcome status readable to assistive technology", () => {
    expect(source).toContain('role="radiogroup" aria-label="Chọn số lượng TEMPO 3ml"');
    expect(source).toContain('aria-pressed={quantity===1}');
    expect(source).toContain('aria-pressed={quantity===2}');
    expect(source).toContain('name="orderConsent" type="checkbox" required');
    expect(source).toContain('name="marketingConsent" type="checkbox"');
    expect(source).toContain('role="status"');
    expect(source).toContain('disabled={createOrder.isPending || remaining<1}');
  });
});
