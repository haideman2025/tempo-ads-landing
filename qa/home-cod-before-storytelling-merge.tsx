import { FormEvent, useEffect, useState } from "react";
import { ArrowDown, ArrowRight, CheckCircle2, ClipboardCheck, LockKeyhole, PackageCheck, ShieldCheck, ShoppingBag, TimerReset } from "lucide-react";
import { trpc } from "@/lib/trpc";

const images = {
  hero: "/manus-storage/tempo-brand-hero_6c096b85.png",
  product: "/manus-storage/tempo-pack-front_9e2c58ea.png",
  sides: "/manus-storage/tempo-pack-sides_99932a67.png",
  back: "/manus-storage/tempo-pack-back_267c13e5.png",
  hands: "/manus-storage/tempo-couple-hands_6b173623.png",
  benefits: "/manus-storage/tempo-benefits_e53327fd.png",
  steps: "/manus-storage/tempo-use-steps_a7b53030.png",
  wait: "/manus-storage/tempo-wait-ritual_0db05ba8.png",
  carry: "/manus-storage/tempo-carry_5d2617d2.png",
  unbox: "/manus-storage/tempo-unbox_7fe4ee69.png",
  detail: "/manus-storage/tempo-design-detail_b6e6ad35.png",
  story: "/manus-storage/tempo-story_fc38bf3c.png",
  label: "/manus-storage/tempo-claim-label_10f35a7d.png",
};

type Attribution = Record<"utmSource" | "utmMedium" | "utmCampaign" | "utmContent" | "utmTerm" | "fbclid", string>;
const initialAttribution: Attribution = { utmSource: "", utmMedium: "", utmCampaign: "", utmContent: "", utmTerm: "", fbclid: "" };
const vnd = (value: number) => `${value.toLocaleString("vi-VN")}đ`;

function scrollToOrder() { document.getElementById("dat-hang")?.scrollIntoView({ behavior: "smooth", block: "start" }); }
function readAttribution(): Attribution {
  const map = { utmSource: "utm_source", utmMedium: "utm_medium", utmCampaign: "utm_campaign", utmContent: "utm_content", utmTerm: "utm_term", fbclid: "fbclid" } as const;
  try {
    const saved = JSON.parse(localStorage.getItem("tempo-attribution") || "{}") as Partial<Attribution>;
    const query = new URLSearchParams(location.search);
    const result = { ...initialAttribution };
    (Object.keys(map) as Array<keyof Attribution>).forEach(key => { result[key] = query.get(map[key])?.trim() || saved[key] || ""; });
    localStorage.setItem("tempo-attribution", JSON.stringify(result));
    return result;
  } catch { return initialAttribution; }
}

export default function Home() {
  const utils = trpc.useUtils();
  const { data: stock } = trpc.orders.status.useQuery(undefined, { refetchInterval: 30_000 });
  const createOrder = trpc.orders.create.useMutation({ onSuccess: () => utils.orders.status.invalidate() });
  const [quantity, setQuantity] = useState(1);
  const [attribution, setAttribution] = useState<Attribution>(initialAttribution);
  const [formStarted, setFormStarted] = useState(false);
  const [scrollTracked, setScrollTracked] = useState(false);
  const [message, setMessage] = useState("");
  const remaining = stock?.remaining ?? 1000;

  useEffect(() => {
    setAttribution(readAttribution());
    window.fbq?.("track", "ViewContent", { content_ids: ["tempo-3ml"], content_type: "product", value: 499000, currency: "VND" });
    const onScroll = () => {
      if (!scrollTracked && (scrollY + innerHeight) / document.documentElement.scrollHeight >= .5) {
        window.fbq?.("trackCustom", "Scroll50");
        setScrollTracked(true);
      }
    };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, [scrollTracked]);

  const onFormFocus = () => {
    if (!formStarted) { window.fbq?.("trackCustom", "FormStart", { content_name: "TEMPO 3ml COD" }); setFormStarted(true); }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setMessage("");
    const data = new FormData(event.currentTarget);
    window.fbq?.("track", "InitiateCheckout", { content_ids: ["tempo-3ml"], content_type: "product", num_items: quantity, value: quantity * 499000, currency: "VND" });
    createOrder.mutate({
      fullName: String(data.get("fullName") || ""), phone: String(data.get("phone") || ""), address: String(data.get("address") || ""), note: String(data.get("note") || ""),
      orderConsent: data.get("orderConsent") === "on", marketingConsent: data.get("marketingConsent") === "on", quantity, ...attribution,
    }, { onSuccess: result => {
      if (result.kind === "created") {
        window.fbq?.("track", "Purchase", { content_ids: ["tempo-3ml"], content_type: "product", order_id: result.order.orderNumber, num_items: result.order.quantity, value: result.order.totalValue, currency: "VND" });
        window.fbq?.("trackCustom", "OrderCodSuccess", { order_id: result.order.orderNumber, value: result.order.totalValue, currency: "VND" });
        setMessage(`Đơn ${result.order.orderNumber} đã được ghi nhận. V2JOY sẽ liên hệ xác nhận trước khi gửi COD.`); event.currentTarget.reset(); setQuantity(1);
      } else if (result.kind === "existing") setMessage("Số điện thoại này đã có một đơn TEMPO đang được xử lý. V2JOY sẽ liên hệ xác nhận.");
      else setMessage("TEMPO hiện đã hết hàng. Cảm ơn bạn đã quan tâm.");
    }, onError: error => setMessage(error.message || "Không thể tạo đơn lúc này. Vui lòng thử lại.") });
  };

  return <main className="tempo-site">
    <header className="tempo-header"><a href="#top" className="tempo-brand" aria-label="V2JOY TEMPO"><span>V2JOY</span><b>TEMPO</b></a><nav aria-label="Điều hướng"><a href="#san-pham">Sản phẩm</a><a href="#nghi-thuc">Nghi thức</a><a href="#minh-bach">Thông tin</a></nav><button className="header-order" onClick={scrollToOrder}>Đặt COD <ArrowRight size={15}/></button></header>
    <section className="tempo-hero" id="top"><img src={images.hero} alt="TEMPO by V2JOY: hộp và chai 3ml trên nền ivory" fetchPriority="high"/><div className="hero-shadow"/><div className="hero-content"><p className="eyebrow">V2JOY / TEMPO 3ML</p><h1>Chậm một nhịp.<br/><em>Gần nhau hơn.</em></h1><p className="hero-copy">Một nghi thức chăm sóc kín đáo trước những khoảnh khắc riêng tư — để sự chuẩn bị có thêm chủ động, nhẹ nhàng và đúng nhịp của hai người.</p><div className="hero-actions"><button className="button-primary" onClick={scrollToOrder}>Đặt hàng COD <ArrowRight size={17}/></button><a href="#nghi-thuc" className="button-text">Xem nghi thức <ArrowDown size={15}/></a></div><div className="hero-facts"><span><b>499.000đ</b> / chai 3ml</span><span><b>{remaining.toLocaleString("vi-VN")}</b> chai sẵn sàng nhận đơn</span><span>Thanh toán khi nhận hàng</span></div></div></section>
    <div className="proof-strip" aria-label="Cam kết trải nghiệm"><span><LockKeyhole size={16}/> Đóng gói kín đáo</span><span><PackageCheck size={16}/> Thanh toán COD</span><span><ClipboardCheck size={16}/> Thông tin rõ trên nhãn</span><span><ShieldCheck size={16}/> Gọi xác nhận đơn</span></div>
    <section className="order-section" id="dat-hang" aria-labelledby="order-title"><div className="order-intro"><p className="eyebrow eyebrow-dark">TEMPO 3ML / COD</p><h2 id="order-title">Sẵn sàng cho<br/><em>nhịp của hai.</em></h2><p>Để lại thông tin nhận hàng. V2JOY gọi xác nhận trước khi gửi đi; bạn chỉ thanh toán khi nhận hàng.</p><div className="stock-status"><span/> Còn {remaining.toLocaleString("vi-VN")} / 1.000 chai</div></div><form className="cod-form" data-clarity-mask="true" onFocus={onFormFocus} onSubmit={onSubmit}>
      <div className="product-line"><img src={images.product} alt="Hộp TEMPO 3ml"/><div><span>TEMPO 3ML</span><strong>{vnd(499000)}</strong><small>Thanh toán COD sau khi nhận hàng</small></div></div>
      <fieldset className="quantity-field"><legend>Chọn số lượng</legend><div role="radiogroup" aria-label="Chọn số lượng TEMPO 3ml"><button type="button" aria-pressed={quantity===1} onClick={()=>setQuantity(1)}>01 <small>chai</small></button><button type="button" aria-pressed={quantity===2} onClick={()=>setQuantity(2)}>02 <small>chai</small></button></div></fieldset>
      <label>Họ và tên<input name="fullName" autoComplete="name" required placeholder="Tên người nhận"/></label><label>Số điện thoại<input name="phone" autoComplete="tel" inputMode="tel" required placeholder="Ví dụ: 090 123 4567"/></label><label>Địa chỉ nhận hàng<textarea name="address" autoComplete="street-address" required placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"/></label><label>Lời nhắn <small>(không bắt buộc)</small><input name="note" placeholder="Thời điểm thuận tiện để nhận cuộc gọi..."/></label>
      <div className="order-total"><span>Tạm tính <small>Phí giao được xác nhận trước khi gửi</small></span><strong>{vnd(quantity*499000)}</strong></div><label className="checkline"><input name="orderConsent" type="checkbox" required/><span>Tôi đồng ý để V2JOY dùng thông tin này để xác nhận và giao đơn COD.</span></label><label className="checkline checkline-subtle"><input name="marketingConsent" type="checkbox"/><span>Tôi đồng ý nhận thông tin TEMPO từ V2JOY. <em>Không bắt buộc.</em></span></label><button className="submit-order" type="submit" disabled={createOrder.isPending || remaining<1}>{createOrder.isPending?"Đang ghi nhận...":remaining<1?"TEMPO đã hết hàng":<>Ghi nhận đơn COD <ShoppingBag size={17}/></>}</button><p className="privacy-note"><LockKeyhole size={13}/> Thông tin dùng riêng để xử lý đơn, không hiển thị công khai.</p>{message&&<p className="form-notice" role="status"><CheckCircle2 size={17}/>{message}</p>}</form></section>
    <section className="split-story" id="san-pham"><div className="split-copy"><p className="eyebrow eyebrow-dark">01 — NHỊP CỦA HAI</p><h2>Khi hai người<br/><em>chưa cùng nhịp.</em></h2><p>Đôi khi cảm xúc đã gần, nhưng cả hai vẫn cần thêm một khoảng chuẩn bị để gặp nhau tự nhiên hơn.</p><a href="#nghi-thuc" className="inline-link">Khám phá nghi thức TEMPO <ArrowRight size={15}/></a></div><figure><img src={images.hands} alt="Hai bàn tay chạm gần nhau cùng chai TEMPO 3ml" loading="lazy"/><figcaption>NHỊP CỦA HAI / TEMPO 3ML</figcaption></figure></section>
    <section className="full-image-section"><img src={images.story} alt="TEMPO 3ml và hộp sản phẩm trên nền thiết kế nhịp sóng" loading="lazy"/><div><p className="eyebrow">02 — LÀM CHỦ NHỊP</p><h2>Chậm lại.<br/>Làm chủ.<br/><em>Đồng điệu.</em></h2><p>TEMPO biến khoảnh khắc chuẩn bị thành một nhịp chăm sóc chủ động, để cả hai có thêm thời gian tìm thấy nhau.</p></div></section>
    <section className="visual-grid" aria-label="Trải nghiệm TEMPO"><article className="visual-card visual-card-large"><img src={images.benefits} alt="Thông tin trải nghiệm chăm sóc da TEMPO" loading="lazy"/><div><span>CHĂM SÓC KÍN ĐÁO</span><p>Mọi thông tin sử dụng được thể hiện rõ ràng trên nhãn sản phẩm.</p></div></article><article className="visual-card"><img src={images.carry} alt="Chai TEMPO 3ml nhỏ gọn đặt cạnh túi cá nhân" loading="lazy"/><div><span>3ML / NHỎ GỌN</span><p>Gọn trong túi cá nhân, kín đáo khi mang theo.</p></div></article><article className="visual-card"><img src={images.detail} alt="Chi tiết nắp graphite và vòi xịt phun sương của TEMPO" loading="lazy"/><div><span>THIẾT KẾ TEMPO</span><p>Nắp graphite, vòi xịt phun sương và dấu nhịp đôi.</p></div></article></section>
    <section className="ritual-section" id="nghi-thuc"><div className="ritual-copy"><p className="eyebrow">03 — NGHI THỨC TEMPO</p><h2>Ba bước.<br/><em>Đúng nhịp.</em></h2><ol><li><b>01</b><span>Vệ sinh sạch và lau khô.</span></li><li><b>02</b><span>Xịt 3–4 nhát, thoa đều.</span></li><li><b>03</b><span>Chờ 60 phút, sau đó rửa sạch.</span></li></ol><p className="ritual-disclaimer">Chỉ dùng ngoài da. Đọc kỹ hướng dẫn trước khi sử dụng.</p></div><img src={images.steps} alt="Ba bước sử dụng TEMPO: làm sạch, xịt thoa đều và rửa sạch sau 60 phút" loading="lazy"/></section>
    <section className="wait-section"><img src={images.wait} alt="TEMPO và khoảng 60 phút chuẩn bị trước trải nghiệm riêng tư" loading="lazy"/><div><p className="eyebrow eyebrow-dark">04 — KHOẢNG CHỜ CÓ Ý NGHĨA</p><h2>60 phút cho<br/><em>một nhịp chuẩn bị.</em></h2><p>Chăm sóc bản thân. Chuẩn bị không gian. Bắt đầu cuộc trò chuyện. Để khoảng chờ là một phần của sự chủ động.</p></div></section>
    <section className="unbox-section"><div><p className="eyebrow">05 — TRẢI NGHIỆM MỞ HỘP</p><h2>Kéo một nhịp.<br/>Đẩy một nhịp.<br/><em>TEMPO xuất hiện.</em></h2><p>Thiết kế kéo–đẩy giúp mỗi chuyển động mở hộp trở nên rõ ràng, gọn gàng và riêng tư.</p></div><img src={images.unbox} alt="Các bước kéo và đẩy để mở hộp TEMPO" loading="lazy"/></section>
    <section className="transparency" id="minh-bach"><div className="transparency-head"><p className="eyebrow eyebrow-dark">06 — THÔNG TIN SẢN PHẨM</p><h2>Rõ ràng từ<br/><em>bên ngoài.</em></h2><p>Hình ảnh mặt hộp, hướng dẫn và cảnh báo được đặt ở đây để bạn kiểm tra trước khi quyết định đặt hàng.</p></div><div className="label-gallery"><figure><img src={images.sides} alt="Các mặt cạnh hộp TEMPO có hướng dẫn nghi thức" loading="lazy"/><figcaption>Nghi thức sử dụng trên hộp</figcaption></figure><figure><img src={images.back} alt="Mặt sau hộp TEMPO có hướng dẫn, cảnh báo và thông tin xuất xứ" loading="lazy"/><figcaption>Hướng dẫn, cảnh báo và bảo quản</figcaption></figure><figure><img src={images.label} alt="Chi tiết thiết kế chai TEMPO gồm nắp, vòi xịt và nhãn" loading="lazy"/><figcaption>Chi tiết thiết kế sản phẩm</figcaption></figure></div><div className="safety-grid"><div><TimerReset size={21}/><h3>Hướng dẫn</h3><p>Làm sạch và lau khô. Xịt 3–4 nhát, thoa đều. Chờ 60 phút rồi rửa sạch.</p></div><div><ShieldCheck size={21}/><h3>Cảnh báo</h3><p>Chỉ dùng ngoài da. Ngưng sử dụng nếu có kích ứng. Không dùng trên vùng da tổn thương.</p></div><div><ClipboardCheck size={21}/><h3>Bảo quản</h3><p>Để nơi khô ráo, tránh ánh nắng trực tiếp. Bảo quản dưới 30°C. Để xa tầm tay trẻ em.</p></div></div></section>
    <section className="trust-section"><div><p className="eyebrow">V2JOY / CAM KẾT MINH BẠCH</p><h2>Niềm tin bắt đầu<br/><em>từ sự thật.</em></h2><p>Chúng tôi không hiển thị rating hay review chưa được xác minh. Đánh giá từ khách đã mua và hoàn tất giao hàng sẽ được công bố tại đây khi có dữ liệu hợp lệ.</p></div><aside><CheckCircle2 size={24}/><h3>Đánh giá đã xác minh</h3><p>Đang thu thập sau các đơn giao thành công.</p><span>Không dùng review tạo sẵn hoặc rating giả.</span></aside></section>
    <section className="final-cta"><img src={images.product} alt="Hộp TEMPO 3ml" loading="lazy"/><div><p className="eyebrow">TEMPO 3ML / 499.000Đ</p><h2>Đặt một chai.<br/><em>Giữ một nhịp.</em></h2><p>Đặt hàng COD. V2JOY gọi xác nhận trước khi giao.</p><button className="button-primary" onClick={scrollToOrder}>Đặt hàng COD <ArrowRight size={17}/></button></div></section>
    <footer><span>© V2JOY VIỆT NAM</span><span>TEMPO 3ML · CHỈ DÙNG NGOÀI DA</span><button onClick={scrollToOrder}>Đặt hàng</button></footer>
  </main>;
}
