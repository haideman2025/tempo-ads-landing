/**
 * Meta Conversions API cho TEMPO.
 *
 * Landing chỉ bắn Lead từ trình duyệt lúc khách đặt COD. Purchase cố ý không bắn ở bước đó
 * — COD chưa thu được tiền — nên nó được gửi từ server qua đường này khi đơn đã giao thành công.
 *
 * Mọi định danh cá nhân đều được băm SHA-256 trước khi rời máy chủ, theo yêu cầu của Meta.
 */
import { createHash } from "node:crypto";

const GRAPH_API_VERSION = "v21.0";
const EVENT_SOURCE_URL = "https://v2joy.life/";
const REQUEST_TIMEOUT_MS = 5_000;

type CapiFetch = (input: string, init?: RequestInit) => Promise<Response>;

export type PurchaseOrder = {
  orderNumber: string;
  fullName: string;
  phone: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
  sku: string;
  fbp?: string | null;
  fbc?: string | null;
  clientIpAddress?: string | null;
  clientUserAgent?: string | null;
  deliveredAt: Date;
};

export type MetaCapiEvent = {
  event_name: "Purchase";
  event_id: string;
  event_time: number;
  action_source: "website";
  event_source_url: string;
  user_data: Record<string, string>;
  custom_data: {
    currency: string;
    value: number;
    content_type: string;
    content_ids: string[];
    contents: { id: string; quantity: number; item_price: number }[];
    order_id: string;
  };
};

/** Meta muốn số điện thoại ở dạng E.164 chỉ gồm chữ số, không dấu cộng. */
export function normalizePhoneForMeta(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("84")) return digits;
  return `84${digits.replace(/^0+/, "")}`;
}

/** Chuẩn hoá theo yêu cầu của Meta (chữ thường, bỏ khoảng thừa) rồi băm SHA-256. */
export function hashForMeta(value: string | null | undefined): string | undefined {
  const normalized = value?.trim().toLowerCase().replace(/\s+/g, " ");
  if (!normalized) return undefined;
  return createHash("sha256").update(normalized).digest("hex");
}

/** Tên tiếng Việt viết họ trước, tên gọi sau: token cuối là first name, token đầu là last name. */
function splitVietnameseName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  if (parts.length === 1) return { fn: parts[0] };
  return { fn: parts[parts.length - 1], ln: parts[0] };
}

function compact(entries: Record<string, string | undefined>): Record<string, string> {
  return Object.fromEntries(Object.entries(entries).filter(([, value]) => Boolean(value))) as Record<string, string>;
}

export function buildPurchaseEvent(order: PurchaseOrder): MetaCapiEvent {
  const { fn, ln } = splitVietnameseName(order.fullName);
  return {
    event_name: "Purchase",
    // Suy ra từ mã đơn để gửi lại cùng một đơn không tạo Purchase thứ hai bên Meta.
    event_id: `purchase-${order.orderNumber}`,
    event_time: Math.floor(order.deliveredAt.getTime() / 1000),
    action_source: "website",
    event_source_url: EVENT_SOURCE_URL,
    user_data: compact({
      ph: hashForMeta(normalizePhoneForMeta(order.phone)),
      fn: hashForMeta(fn),
      ln: hashForMeta(ln),
      fbp: order.fbp ?? undefined,
      fbc: order.fbc ?? undefined,
      client_ip_address: order.clientIpAddress ?? undefined,
      client_user_agent: order.clientUserAgent ?? undefined,
    }),
    custom_data: {
      currency: "VND",
      value: order.totalValue,
      content_type: "product",
      content_ids: [order.sku],
      contents: [{ id: order.sku, quantity: order.quantity, item_price: order.unitPrice }],
      order_id: order.orderNumber,
    },
  };
}

export async function sendMetaCapiEvent(
  event: MetaCapiEvent,
  options: { pixelId?: string; accessToken?: string; testEventCode?: string; fetchImpl?: CapiFetch } = {},
) {
  const pixelId = options.pixelId ?? process.env.VITE_META_PIXEL_ID;
  const accessToken = options.accessToken ?? process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) return { delivered: false, skipped: true } as const;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    // access_token đi trong body, không đặt trên URL để không lọt vào log truy cập.
    const response = await (options.fetchImpl ?? fetch)(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          data: [event],
          access_token: accessToken,
          ...(options.testEventCode ? { test_event_code: options.testEventCode } : {}),
        }),
        signal: controller.signal,
      },
    );
    if (!response.ok) return { delivered: false, skipped: false } as const;
    return { delivered: true, skipped: false } as const;
  } catch {
    return { delivered: false, skipped: false } as const;
  } finally {
    clearTimeout(timeout);
  }
}
