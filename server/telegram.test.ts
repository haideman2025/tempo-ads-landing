import { describe, expect, it, vi } from "vitest";
import { formatTempoReservationNotification, notifyTempoReservation } from "./telegram";

const reservation = {
  fullName: "Nguyễn An",
  phone: "0376676575",
  email: "an@example.com",
  quantity: 2,
  totalValue: 698_000,
  slotNumber: 12,
  note: "Liên hệ sau 19h",
};

describe("Telegram notification", () => {
  it("định dạng thông tin vận hành đầy đủ cho một reservation đã xác nhận", () => {
    const text = formatTempoReservationNotification(reservation);
    expect(text).toContain("Suất: 0012");
    expect(text).toContain("Số lượng: 2 chai · 698.000đ");
    expect(text).toContain("0376676575");
  });

  it("gửi sau reservation bằng payload Telegram không hiển thị token", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    await expect(notifyTempoReservation(reservation, { token: "123456:abcdefghijklmnopqrstuvwxyz", chatId: "-100123", fetchImpl })).resolves.toEqual({ delivered: true, skipped: false });
    expect(fetchImpl).toHaveBeenCalledOnce();
    expect(fetchImpl.mock.calls[0]?.[0]).toContain("/sendMessage");
    expect(fetchImpl.mock.calls[0]?.[1]?.body).toContain("TEMPO 3ML");
  });
});
