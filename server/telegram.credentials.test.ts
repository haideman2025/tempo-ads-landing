import { describe, expect, it } from "vitest";

describe("Telegram credentials", () => {
  it("xác thực bot bằng endpoint getMe mà không ghi lộ token", async () => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    expect(token).toMatch(/^\d+:[A-Za-z0-9_-]{20,}$/);

    const response = await fetch(`https://api.telegram.org/bot${token}/getMe`);
    expect(response.ok).toBe(true);

    const payload = await response.json() as {
      ok: boolean;
      result?: { id: number; is_bot: boolean };
    };
    expect(payload.ok).toBe(true);
    expect(payload.result?.is_bot).toBe(true);

    const chatId = process.env.TELEGRAM_CHAT_ID;
    expect(chatId).toMatch(/^-?\d+$/);
    const chatResponse = await fetch(`https://api.telegram.org/bot${token}/getChat?chat_id=${encodeURIComponent(chatId ?? "")}`);
    expect(chatResponse.ok).toBe(true);
    const chatPayload = await chatResponse.json() as { ok: boolean; result?: { id: number } };
    expect(chatPayload.ok).toBe(true);
    expect(chatPayload.result?.id).toBeDefined();
  }, 15_000);
});
