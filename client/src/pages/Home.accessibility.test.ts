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
    expect(source).toContain('id="thong-tin"');
  });

  it("provides meaningful image alternatives and functional in-page navigation", () => {
    expect(source).toContain('alt="TEMPO 3ml: hộp và chai sản phẩm"');
    expect(source).toContain('alt="Ba bước sử dụng TEMPO: làm sạch, xịt 3–4 nhát, chờ 60 phút rồi rửa sạch"');
    expect(source).toContain('aria-label="Điều hướng chính"');
    expect(source).toContain('href="#san-pham"');
    expect(source).toContain('href="#nghi-thuc"');
    expect(source).toContain('href="#thong-tin"');
  });

  it("makes quantity selection, consents and outcome status readable to assistive technology", () => {
    expect(source).toContain('role="radiogroup" aria-label="Chọn số lượng TEMPO 3ml"');
    expect(source).toContain('aria-pressed={quantity === 1}');
    expect(source).toContain('aria-pressed={quantity === 2}');
    expect(source).toContain('name="orderConsent" type="checkbox" required');
    expect(source).toContain('name="marketingConsent" type="checkbox"');
    expect(source).toContain('role="status"');
    expect(source).toContain('disabled={order.isPending || remaining < 1}');
  });

  it("makes the visual diary operable by touch, buttons and labelled tabs", () => {
    expect(source).toContain('aria-label="Xem khoảnh khắc trước"');
    expect(source).toContain('aria-label="Xem khoảnh khắc tiếp theo"');
    expect(source).toContain('role="tablist" aria-label="Các khoảnh khắc trong visual diary"');
    expect(source).toContain('data-swipe="enabled"');
  });
});
