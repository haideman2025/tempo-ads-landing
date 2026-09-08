/**
 * Kiểm chứng đường gửi Purchase qua Conversions API mà không đụng dữ liệu thật.
 *
 *     npx tsx scripts/verify-capi.ts <TEST_EVENT_CODE>
 *
 * Mã test lấy ở Events Manager > dataset > tab Test Events (dạng TEST12345). Sự kiện gửi kèm
 * mã này chỉ hiện trong tab Test Events, không vào dữ liệu dataset và không ảnh hưởng quy đổi
 * quảng cáo. Chạy không kèm mã sẽ bị từ chối — để không ai lỡ tay bơm Purchase giả vào dataset.
 *
 * Script dùng đúng buildPurchaseEvent/sendMetaCapiEvent mà server dùng, nên nếu nó chạy được
 * thì luồng markDelivered cũng chạy được.
 */
import "dotenv/config";
import { buildPurchaseEvent, sendMetaCapiEvent } from "../server/metaCapi";

const testEventCode = process.argv[2];

if (!testEventCode) {
  console.error("Thiếu mã test. Dùng: npx tsx scripts/verify-capi.ts <TEST_EVENT_CODE>");
  console.error("Lấy mã ở Events Manager > dataset > Test Events.");
  process.exit(1);
}

const pixelId = process.env.VITE_META_PIXEL_ID;
const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

if (!pixelId || !accessToken) {
  console.error("Thiếu VITE_META_PIXEL_ID hoặc META_CAPI_ACCESS_TOKEN trong môi trường.");
  process.exit(1);
}

// Đơn giả, mã đơn có tiền tố VERIFY để không trùng mã đơn thật nào.
const event = buildPurchaseEvent({
  orderNumber: `VERIFY-${Date.now().toString(36).toUpperCase()}`,
  fullName: "Nguyễn Văn An",
  phone: "0901234567",
  quantity: 1,
  unitPrice: 499_000,
  totalValue: 499_000,
  sku: "tempo-3ml",
  fbp: `fb.1.${Date.now()}.1234567890`,
  fbc: null,
  clientIpAddress: null,
  clientUserAgent: "Mozilla/5.0 (verify-capi)",
  deliveredAt: new Date(),
});

console.log(`Dataset: ${pixelId}`);
console.log(`Mã test: ${testEventCode}`);
console.log(`event_id: ${event.event_id}`);
console.log(`Định danh gửi đi: ${Object.keys(event.user_data).join(", ")}`);

const result = await sendMetaCapiEvent(event, { pixelId, accessToken, testEventCode });

if (result.skipped) {
  console.error("Bỏ qua: chưa cấu hình pixel hoặc access token.");
  process.exit(1);
}
if (!result.delivered) {
  console.error("Meta từ chối sự kiện. Kiểm tra quyền của token trên dataset.");
  process.exit(1);
}

console.log("\nMeta đã nhận. Mở Events Manager > Test Events để thấy Purchase vừa gửi.");
console.log("Sự kiện này KHÔNG vào dữ liệu dataset và không ảnh hưởng quy đổi quảng cáo.");
