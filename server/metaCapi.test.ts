import { createHash } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import { buildPurchaseEvent, hashForMeta, normalizePhoneForMeta, sendMetaCapiEvent } from "./metaCapi";

const order = {
  orderNumber: "TMP-ABC-1234",
  fullName: "  Nguyễn Văn An ",
  phone: "0901234567",
  quantity: 2,
  unitPrice: 499_000,
  totalValue: 998_000,
  sku: "tempo-3ml",
  fbp: "fb.1.1700000000000.1234567890",
  fbc: "fb.1.1700000000000.IwAR0abc",
  clientIpAddress: "203.0.113.9",
  clientUserAgent: "Mozilla/5.0 (iPhone)",
  deliveredAt: new Date("2026-09-08T10:00:00Z"),
};

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

describe("normalizePhoneForMeta", () => {
  it("đưa số Việt Nam về dạng E.164 không dấu cộng như Meta yêu cầu", () => {
    expect(normalizePhoneForMeta("0901234567")).toBe("84901234567");
    expect(normalizePhoneForMeta("+84 901 234 567")).toBe("84901234567");
    expect(normalizePhoneForMeta("84901234567")).toBe("84901234567");
  });
});

describe("hashForMeta", () => {
  it("chuẩn hoá về chữ thường, bỏ khoảng thừa rồi băm SHA-256", () => {
    expect(hashForMeta("  Nguyễn  ")).toBe(sha256("nguyễn"));
  });

  it("trả undefined cho giá trị rỗng để không gửi băm của chuỗi trống", () => {
    expect(hashForMeta("   ")).toBeUndefined();
    expect(hashForMeta(null)).toBeUndefined();
  });
});

describe("buildPurchaseEvent", () => {
  const event = buildPurchaseEvent(order);

  it("gắn event_id suy ra từ mã đơn nên gửi lại cùng một đơn không nhân đôi Purchase", () => {
    expect(event.event_id).toBe("purchase-TMP-ABC-1234");
    expect(buildPurchaseEvent(order).event_id).toBe(event.event_id);
  });

  it("khai báo đúng sự kiện Purchase phát sinh từ website", () => {
    expect(event.event_name).toBe("Purchase");
    expect(event.action_source).toBe("website");
    expect(event.event_source_url).toBe("https://v2joy.life/");
    expect(event.event_time).toBe(Math.floor(order.deliveredAt.getTime() / 1000));
  });

  it("chỉ gửi định danh đã băm, không gửi số điện thoại hay tên dạng đọc được", () => {
    expect(event.user_data.ph).toBe(sha256("84901234567"));
    expect(event.user_data.ln).toBe(sha256("nguyễn"));
    expect(event.user_data.fn).toBe(sha256("an"));
    const serialized = JSON.stringify(event);
    expect(serialized).not.toContain("0901234567");
    expect(serialized).not.toContain("Nguyễn");
  });

  it("chuyển nguyên fbp/fbc và ngữ cảnh trình duyệt để Meta quy được về lượt click quảng cáo", () => {
    expect(event.user_data.fbp).toBe(order.fbp);
    expect(event.user_data.fbc).toBe(order.fbc);
    expect(event.user_data.client_ip_address).toBe(order.clientIpAddress);
    expect(event.user_data.client_user_agent).toBe(order.clientUserAgent);
  });

  it("báo đúng doanh thu COD thực nhận", () => {
    expect(event.custom_data).toMatchObject({
      currency: "VND",
      value: 998_000,
      content_type: "product",
      content_ids: ["tempo-3ml"],
      order_id: "TMP-ABC-1234",
    });
    expect(event.custom_data.contents).toEqual([{ id: "tempo-3ml", quantity: 2, item_price: 499_000 }]);
  });

  it("bỏ qua các định danh không có thay vì gửi khoá rỗng", () => {
    const event = buildPurchaseEvent({ ...order, fbc: null, clientIpAddress: null });
    expect(event.user_data).not.toHaveProperty("fbc");
    expect(event.user_data).not.toHaveProperty("client_ip_address");
  });
});

describe("sendMetaCapiEvent", () => {
  it("bỏ qua khi chưa cấu hình access token, không ném lỗi làm hỏng luồng đơn hàng", async () => {
    const fetchImpl = vi.fn();
    const result = await sendMetaCapiEvent(buildPurchaseEvent(order), { pixelId: "123", accessToken: "", fetchImpl });
    expect(result).toEqual({ delivered: false, skipped: true });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("gửi sự kiện tới đúng dataset và không đặt access token trên URL", async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({ events_received: 1 }), { status: 200 }));
    const result = await sendMetaCapiEvent(buildPurchaseEvent(order), {
      pixelId: "1955804598438163",
      accessToken: "secret-token",
      fetchImpl,
    });
    expect(result).toEqual({ delivered: true, skipped: false });
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toContain("/1955804598438163/events");
    expect(url).not.toContain("secret-token");
    const body = JSON.parse(String(init?.body));
    expect(body.access_token).toBe("secret-token");
    expect(body.data).toHaveLength(1);
    expect(body.data[0].event_name).toBe("Purchase");
  });

  it("báo không gửi được khi Meta trả lỗi, thay vì ném ra ngoài", async () => {
    const fetchImpl = vi.fn(async () => new Response("{}", { status: 400 }));
    const result = await sendMetaCapiEvent(buildPurchaseEvent(order), { pixelId: "1", accessToken: "t", fetchImpl });
    expect(result).toEqual({ delivered: false, skipped: false });
  });

  it("nuốt lỗi mạng để việc đánh dấu đã giao không bị chặn bởi Meta", async () => {
    const fetchImpl = vi.fn(async () => { throw new Error("network down"); });
    const result = await sendMetaCapiEvent(buildPurchaseEvent(order), { pixelId: "1", accessToken: "t", fetchImpl });
    expect(result).toEqual({ delivered: false, skipped: false });
  });
});

describe("cấu hình Meta CAPI triển khai", () => {
  const pixelId = process.env.VITE_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  it.runIf(Boolean(pixelId && accessToken))("xác thực token đi qua lớp quyền ghi mà không tạo event", async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7_000);
    try {
      // Token Events Manager không có quyền GET metadata Pixel. Gửi payload thiếu event_name
      // xác nhận token đã qua permission rồi dừng ở lớp validation, không có event nào được tạo.
      const response = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ data: [{}], access_token: accessToken }),
        signal: controller.signal,
      });
      expect(response.status).toBe(400);
      const payload = await response.json() as { error?: { code?: number; error_subcode?: number } };
      expect(payload.error?.code).toBe(100);
      expect(payload.error?.error_subcode).toBe(2_804_019);
    } finally {
      clearTimeout(timeout);
    }
  });
});
