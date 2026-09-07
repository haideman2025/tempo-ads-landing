import { describe, expect, it } from "vitest";
import { TEMPO_INITIAL_STOCK, TEMPO_SKU, TEMPO_UNIT_PRICE, tempoCodOrderInputSchema } from "./orders";

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
});
