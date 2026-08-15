import { describe, expect, it } from "vitest";
import { getRemainingSlots, isWaitlistFull, WAITLIST_CAPACITY, waitlistInputSchema } from "./waitlist";

describe("TEMPO waitlist validation", () => {
  it("accepts a compliant 3ml pre-order waitlist request", () => {
    const result = waitlistInputSchema.safeParse({
      fullName: "Nguyễn Minh An",
      phone: "0912345678",
      email: "an@example.com",
      preferredSku: "3ml",
      note: "Liên hệ vào buổi tối.",
      marketingConsent: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a request without marketing consent or a valid phone", () => {
    const result = waitlistInputSchema.safeParse({
      fullName: "A",
      phone: "12345",
      preferredSku: "5ml",
      marketingConsent: false,
    });
    expect(result.success).toBe(false);
  });

  it("never exposes more than 1,000 reservable slots", () => {
    expect(getRemainingSlots(0)).toBe(WAITLIST_CAPACITY);
    expect(getRemainingSlots(999)).toBe(1);
    expect(getRemainingSlots(1000)).toBe(0);
    expect(getRemainingSlots(1005)).toBe(0);
    expect(isWaitlistFull(1000)).toBe(true);
  });
});
