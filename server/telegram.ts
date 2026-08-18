export type TempoReservationNotification = {
  fullName: string;
  phone: string;
  email?: string | null;
  quantity: number;
  totalValue: number;
  slotNumber: number;
  note?: string | null;
};

type TelegramFetch = (input: string, init?: RequestInit) => Promise<Response>;

export function formatTempoReservationNotification(notification: TempoReservationNotification) {
  const lines = [
    "TEMPO 3ML · ĐĂNG KÝ MỚI",
    `Suất: ${String(notification.slotNumber).padStart(4, "0")}`,
    `Số lượng: ${notification.quantity} chai · ${notification.totalValue.toLocaleString("vi-VN")}đ`,
    `Khách: ${notification.fullName}`,
    `Điện thoại: ${notification.phone}`,
  ];

  if (notification.email) lines.push(`Email: ${notification.email}`);
  if (notification.note) lines.push(`Lời nhắn: ${notification.note}`);
  lines.push("Đã lưu vào danh sách chờ TEMPO.");
  return lines.join("\n");
}

export async function notifyTempoReservation(
  notification: TempoReservationNotification,
  options: {
    token?: string;
    chatId?: string;
    fetchImpl?: TelegramFetch;
  } = {},
) {
  const token = options.token ?? process.env.TELEGRAM_BOT_TOKEN;
  const chatId = options.chatId ?? process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { delivered: false, skipped: true } as const;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5_000);
  try {
    const response = await (options.fetchImpl ?? fetch)(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatTempoReservationNotification(notification),
        disable_web_page_preview: true,
      }),
      signal: controller.signal,
    });
    if (!response.ok) {
      console.error("[Telegram] Không gửi được thông báo đăng ký TEMPO", { status: response.status });
      return { delivered: false, skipped: false } as const;
    }
    return { delivered: true, skipped: false } as const;
  } catch {
    console.error("[Telegram] Lỗi khi gửi thông báo đăng ký TEMPO");
    return { delivered: false, skipped: false } as const;
  } finally {
    clearTimeout(timeout);
  }
}
