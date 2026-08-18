import { describe, expect, it } from "vitest";
import { getRemainingSlots, hasRemainingCapacity, isWaitlistFull, WAITLIST_CAPACITY, waitlistInputSchema } from "./waitlist";

describe("TEMPO waitlist validation", () => {
  it("accepts a compliant 3ml pre-order waitlist request", () => {
    const result = waitlistInputSchema.safeParse({
      fullName: "Nguyễn Minh An",
      phone: "0912345678",
      email: "an@example.com",
      preferredSku: "3ml",
      quantity: 1,
      note: "Liên hệ vào buổi tối.",
      marketingConsent: true,
    });
    expect(result.success).toBe(true);
  });

  it("accepts one or two 3ml bottles and rejects a quantity outside the launch limit", () => {
    for (const quantity of [1, 2]) {
      expect(waitlistInputSchema.safeParse({
        fullName: "Nguyễn Minh An",
        phone: "0912345678",
        preferredSku: "3ml",
        quantity,
        marketingConsent: true,
      }).success).toBe(true);
    }

    expect(waitlistInputSchema.safeParse({
      fullName: "Nguyễn Minh An",
      phone: "0912345678",
      preferredSku: "3ml",
      quantity: 3,
      marketingConsent: true,
    }).success).toBe(false);
  });

  it("rejects formats outside the 3ml launch SKU", () => {
    for (const preferredSku of ["5ml", "duo", "course-2x5ml"]) {
      const result = waitlistInputSchema.safeParse({
        fullName: "Nguyễn Minh An",
        phone: "0912345678",
        preferredSku,
        quantity: 1,
        marketingConsent: true,
      });
      expect(result.success).toBe(false);
    }
  });

  it("rejects a request without marketing consent or a valid phone", () => {
    const result = waitlistInputSchema.safeParse({
      fullName: "A",
      phone: "12345",
      preferredSku: "3ml",
      quantity: 1,
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

  it("never permits a two-bottle reservation when only one bottle remains", () => {
    expect(hasRemainingCapacity(998, 2)).toBe(true);
    expect(hasRemainingCapacity(999, 1)).toBe(true);
    expect(hasRemainingCapacity(999, 2)).toBe(false);
    expect(hasRemainingCapacity(1000, 1)).toBe(false);
  });
});
