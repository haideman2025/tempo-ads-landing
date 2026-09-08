import { describe, expect, it } from "vitest";
import { TEMPO_INITIAL_STOCK, TEMPO_SKU, TEMPO_UNIT_PRICE, readClientSignals, tempoCodOrderInputSchema } from "./orders";

const validOrder = {
  fullName: "Nguyễn Minh Anh", phone: "090 123 4567", address: "12 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh",
  quantity: 1, note: "", orderConsent: true, marketingConsent: false, utmSource: "facebook", utmMedium: "paid_social", utmCampaign: "tempo-launch", utmContent: "video-01", utmTerm: "", fbclid: "fb.1.demo",
};

describe("TEMPO COD input", () => {
  it("keeps the agreed catalog constants", () => {
    expect(TEMPO_UNIT_PRICE).toBe(499_000);
    expect(TEMPO_INITIAL_STOCK).toBe(1_000);
    expect(TEMPO_SKU).toBe("tempo-3ml");
  });
  it("accepts a valid COD order and normalizes a spaced phone number", () => {
    const parsed = tempoCodOrderInputSchema.parse(validOrder);
    expect(parsed.phone).toBe("0901234567");
    expect(parsed.quantity).toBe(1);
  });
  it("accepts a maximum of two bottles per order", () => expect(tempoCodOrderInputSchema.parse({ ...validOrder, quantity: 2 }).quantity).toBe(2));
  it("rejects more than two bottles", () => expect(() => tempoCodOrderInputSchema.parse({ ...validOrder, quantity: 3 })).toThrow());
  it("requires an explicit fulfilment consent", () => expect(() => tempoCodOrderInputSchema.parse({ ...validOrder, orderConsent: false })).toThrow());
  it("rejects incomplete delivery details", () => expect(() => tempoCodOrderInputSchema.parse({ ...validOrder, address: "Quận 1" })).toThrow());

  it("nhận _fbp/_fbc để Purchase gửi sau lúc giao vẫn quy được về lượt click quảng cáo", () => {
    const parsed = tempoCodOrderInputSchema.parse({
      ...validOrder,
      fbp: "fb.1.1700000000000.1234567890",
      fbc: "fb.1.1700000000000.IwAR0abc",
    });
    expect(parsed.fbp).toBe("fb.1.1700000000000.1234567890");
    expect(parsed.fbc).toBe("fb.1.1700000000000.IwAR0abc");
  });

  it("vẫn nhận đơn khi không có _fbp/_fbc (khách vào thẳng, hoặc Pixel bị chặn)", () => {
    expect(() => tempoCodOrderInputSchema.parse(validOrder)).not.toThrow();
  });
});

describe("readClientSignals", () => {
  it("ưu tiên cf-connecting-ip vì trang chạy sau Cloudflare rồi mới tới proxy Manus", () => {
    expect(readClientSignals({
      "cf-connecting-ip": "203.0.113.9",
      "x-forwarded-for": "10.0.0.1, 172.16.0.1",
      "user-agent": "Mozilla/5.0 (iPhone)",
    })).toEqual({ clientIpAddress: "203.0.113.9", clientUserAgent: "Mozilla/5.0 (iPhone)" });
  });

  it("lùi về IP đầu tiên trong x-forwarded-for khi không có header của Cloudflare", () => {
    expect(readClientSignals({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" }).clientIpAddress).toBe("203.0.113.7");
  });

  it("trả null khi thiếu header thay vì chuỗi rỗng, để cột DB giữ đúng nghĩa không có dữ liệu", () => {
    expect(readClientSignals({})).toEqual({ clientIpAddress: null, clientUserAgent: null });
  });

  it("cắt User-Agent quá dài cho vừa cột varchar(500)", () => {
    expect(readClientSignals({ "user-agent": "x".repeat(900) }).clientUserAgent).toHaveLength(500);
  });
});
