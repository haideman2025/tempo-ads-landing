import { z } from "zod";
import { normalizeVietnamesePhone } from "./waitlist";

export const TEMPO_UNIT_PRICE = 499_000;
export const TEMPO_INITIAL_STOCK = 1_000;
export const TEMPO_SKU = "tempo-3ml";

const attributionField = (maxLength: number) => z.string().trim().max(maxLength).optional().or(z.literal(""));

export const tempoCodOrderInputSchema = z.object({
  fullName: z.string().trim().min(2, "Vui lòng nhập họ và tên.").max(120, "Họ tên quá dài."),
  phone: z.preprocess(
    normalizeVietnamesePhone,
    z.string().regex(/^(?:0|\+84)(?:3|5|7|8|9)\d{8}$/, "Vui lòng nhập số điện thoại Việt Nam hợp lệ."),
  ),
  address: z.string().trim().min(12, "Vui lòng nhập địa chỉ nhận hàng đầy đủ.").max(500, "Địa chỉ tối đa 500 ký tự."),
  quantity: z.number().int().min(1).max(2),
  note: z.string().trim().max(500, "Lời nhắn tối đa 500 ký tự.").optional().or(z.literal("")),
  orderConsent: z.boolean().refine(value => value, "Bạn cần đồng ý để V2JOY xử lý đơn COD."),
  marketingConsent: z.boolean().optional().default(false),
  utmSource: attributionField(120),
  utmMedium: attributionField(120),
  utmCampaign: attributionField(180),
  utmContent: attributionField(180),
  utmTerm: attributionField(180),
  fbclid: attributionField(255),
  // Cookie _fbp/_fbc do trình duyệt gửi lên: cần lưu để Purchase gửi sau lúc giao hàng
  // vẫn quy được về đúng lượt click quảng cáo đã tạo ra đơn.
  fbp: attributionField(255),
  fbc: attributionField(255),
});

type HeaderBag = Record<string, string | string[] | undefined>;

const firstValue = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

/**
 * IP và User-Agent lấy từ header của request, không lấy từ dữ liệu client tự khai.
 * Trang chạy sau Cloudflare rồi tới proxy của Manus nên cf-connecting-ip là nguồn đúng nhất.
 */
export function readClientSignals(headers: HeaderBag) {
  const forwarded = firstValue(headers["x-forwarded-for"])?.split(",")[0]?.trim();
  const clientIpAddress = firstValue(headers["cf-connecting-ip"])?.trim() || forwarded || null;
  const clientUserAgent = firstValue(headers["user-agent"])?.slice(0, 500) || null;
  return { clientIpAddress: clientIpAddress || null, clientUserAgent };
}

export type TempoCodOrderInput = z.infer<typeof tempoCodOrderInputSchema>;
