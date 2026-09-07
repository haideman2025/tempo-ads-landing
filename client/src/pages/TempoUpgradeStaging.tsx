import { ArrowDown, ArrowRight, Check, ChevronDown, CircleAlert, ClipboardCheck, LockKeyhole, PackageCheck, PhoneCall, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import "./tempo-upgrade-staging.css";

const PRICE = 499_000;
const vnd = (value: number) => `${value.toLocaleString("vi-VN")}đ`;

const ASSET = {
  logo: "/manus-storage/v2joylogo-official_9302769f.webp",
  hero: { webp480: "/manus-storage/01-hero-grooming-480_c164fe4e.webp", webp960: "/manus-storage/01-hero-grooming-960_1a254cd1.webp", webp: "/manus-storage/01-hero-grooming_3964bc1c.webp", png: "/manus-storage/01-hero-grooming_4a73bdb5.png", width: 1672, height: 941 },
  scale: { webp480: "/manus-storage/02-scale-hand-3ml-480_cf67e79f.webp", webp960: "/manus-storage/02-scale-hand-3ml-960_ccd1274e.webp", webp: "/manus-storage/02-scale-hand-3ml_2be8617f.webp", png: "/manus-storage/02-scale-hand-3ml_02f14fc9.png", width: 1536, height: 1024 },
  ritual: { webp480: "/manus-storage/03-ritual-black-actuator-480_0ed14d63.webp", webp960: "/manus-storage/03-ritual-black-actuator-960_38eb15af.webp", webp: "/manus-storage/03-ritual-black-actuator_216f29f2.webp", png: "/manus-storage/03-ritual-black-actuator_2f8a79c7.png", width: 1536, height: 1024 },
  pouch: { webp480: "/manus-storage/04-portable-grooming-pouch-480_8c63cda0.webp", webp960: "/manus-storage/04-portable-grooming-pouch-960_7d77d385.webp", webp: "/manus-storage/04-portable-grooming-pouch_c4693388.webp", png: "/manus-storage/04-portable-grooming-pouch_619b3f4a.png", width: 1536, height: 1024 },
  couple: { webp480: "/manus-storage/05-couple-evening-context-480_f63ae016.webp", webp960: "/manus-storage/05-couple-evening-context-960_851ce329.webp", webp: "/manus-storage/05-couple-evening-context_def084a1.webp", png: "/manus-storage/05-couple-evening-context_f864353c.png", width: 1672, height: 941 },
  unboxing: { webp480: "/manus-storage/06-pull-push-unboxing-480_b345fe28.webp", webp960: "/manus-storage/06-pull-push-unboxing-960_65b99cb2.webp", webp: "/manus-storage/06-pull-push-unboxing_a1821968.webp", png: "/manus-storage/06-pull-push-unboxing_b3ae3d2d.png", width: 1536, height: 1024 },
  delivery: { webp480: "/manus-storage/07-discreet-delivery-480_1a69c6b9.webp", webp960: "/manus-storage/07-discreet-delivery-960_f5a808c8.webp", webp: "/manus-storage/07-discreet-delivery_fadce894.webp", png: "/manus-storage/07-discreet-delivery_f676417b.png", width: 1536, height: 1024 },
} as const;

const FUNNEL_EVENT_POLICY = {
  ViewContent: "Khi landing được xem",
  InitiateCheckout: "Khi người dùng bắt đầu form COD",
  Lead: "Khi khách gửi form COD thành công trên production",
  QualifiedLead: "Chỉ sau khi V2JOY gọi xác nhận đơn hợp lệ",
  Purchase: "Chỉ sau khi đơn COD đã giao thành công",
} as const;

type AssetName = Exclude<keyof typeof ASSET, "logo">;
type StageForm = { fullName: string; phone: string; address: string; note: string; quantity: 1 | 2; consent: boolean };
type LandingMode = "staging" | "production";
type Attribution = Record<"utmSource" | "utmMedium" | "utmCampaign" | "utmContent" | "utmTerm" | "fbclid", string>;
const blankAttribution: Attribution = { utmSource: "", utmMedium: "", utmCampaign: "", utmContent: "", utmTerm: "", fbclid: "" };

function getAttribution(): Attribution {
  try {
    const query = new URLSearchParams(window.location.search);
    const prior = JSON.parse(localStorage.getItem("tempo-attribution") || "{}") as Partial<Attribution>;
    const next: Attribution = {
      utmSource: query.get("utm_source") || prior.utmSource || "", utmMedium: query.get("utm_medium") || prior.utmMedium || "",
      utmCampaign: query.get("utm_campaign") || prior.utmCampaign || "", utmContent: query.get("utm_content") || prior.utmContent || "",
      utmTerm: query.get("utm_term") || prior.utmTerm || "", fbclid: query.get("fbclid") || prior.fbclid || "",
    };
    localStorage.setItem("tempo-attribution", JSON.stringify(next));
    return next;
  } catch { return blankAttribution; }
}

const INCI = "Purified Water, Alcohol (Ethanol), Butylene Glycol, Cnidium monnieri extract (Chiết xuất Xà Sàng Tử), Zanthoxylum bungeanum extract (Chiết xuất Hoa Tiêu), Sophora flavescens extract (Chiết xuất Khổ Sâm), Polygonatum sibiricum extract (Chiết xuất Hoàng Tinh), Eucommia ulmoides extract (Chiết xuất Đỗ Trọng), Cynomorium songaricum extract (Chiết xuất Tỏa Dương), Epimedium brevicornum extract (Chiết xuất Dâm Dương Hoắc), Verbena officinalis extract (Chiết xuất Mã Tiên Thảo), Morinda officinalis extract (Chiết xuất Ba Kích Thiên), Sodium Benzoate, Panthenol.";

function ResponsiveAsset({ name, alt, className = "", priority = false, sizes = "(max-width: 700px) 100vw, 50vw" }: { name: AssetName; alt: string; className?: string; priority?: boolean; sizes?: string }) {
  const asset = ASSET[name];
  return <picture className={`tempo-stage__picture ${className}`}>
    <source srcSet={`${asset.webp480} 480w, ${asset.webp960} 960w, ${asset.webp} ${asset.width}w`} type="image/webp" sizes={sizes} />
    <img src={asset.png} alt={alt} width={asset.width} height={asset.height} sizes={sizes} loading={priority ? "eager" : "lazy"} decoding="async" />
  </picture>;
}

function SignalRail() {
  return <svg className="tempo-stage__signal" viewBox="0 0 560 80" fill="none" aria-hidden="true"><path d="M0 43H58c30 0 29-23 56-23 29 0 25 43 56 43 33 0 25-35 56-35 35 0 23 30 58 30 29 0 27-20 57-20 27 0 30 13 56 13h56" /></svg>;
}

function createEventId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `tempo-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function useLandingSeo(mode: LandingMode) {
  useEffect(() => {
    const title = document.title;
    const description = document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
    document.title = "TEMPO 3ml by V2JOY — Chăm sóc cá nhân dành cho nam";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.setAttribute("name", "description"); document.head.appendChild(meta); }
    meta.setAttribute("content", "Khám phá TEMPO 3ml by V2JOY — một nghi thức chăm sóc cá nhân nhỏ gọn, kín đáo và có chủ đích. Đặt hàng COD, đóng gói riêng tư.");
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = "https://v2joy.life/";
    canonical.dataset.tempoLanding = mode;
    document.head.appendChild(canonical);
    const robots = mode === "staging" ? document.createElement("meta") : null;
    if (robots) { robots.name = "robots"; robots.content = "noindex, nofollow"; robots.dataset.tempoStaging = "true"; document.head.appendChild(robots); }
    return () => { document.title = title; meta?.setAttribute("content", description); canonical.remove(); robots?.remove(); };
  }, [mode]);
}

export default function TempoUpgradeStaging({ mode = "staging" }: { mode?: LandingMode }) {
  const isStaging = mode === "staging";
  useLandingSeo(mode);
  const formRef = useRef<HTMLFormElement>(null);
  const utils = trpc.useUtils();
  const { data: stock } = trpc.orders.status.useQuery(undefined, { refetchInterval: 30_000 });
  const order = trpc.orders.create.useMutation({ onSuccess: () => utils.orders.status.invalidate() });
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [startedCheckout, setStartedCheckout] = useState(false);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState<StageForm>({ fullName: "", phone: "", address: "", note: "", quantity: 1, consent: false });
  const remaining = stock?.remaining ?? 1000;
  const attribution = useRef<Attribution>(blankAttribution);

  const trackFunnel = (event: "ViewContent" | "InitiateCheckout" | "Lead", params: Record<string, unknown> = {}) => {
    const payload = { event_id: createEventId(), policy: FUNNEL_EVENT_POLICY[event], content_ids: ["tempo-3ml"], content_type: "product", currency: "VND", ...params };
    if (isStaging) { console.info("[TEMPO staging funnel]", event, payload); return; }
    window.fbq?.("track", event, payload, { eventID: payload.event_id });
  };

  useEffect(() => { attribution.current = getAttribution(); trackFunnel("ViewContent", { value: PRICE }); }, []);

  const scrollToOrder = () => {
    if (!startedCheckout) { setStartedCheckout(true); trackFunnel("InitiateCheckout", { value: form.quantity * PRICE, num_items: form.quantity }); }
    document.getElementById("dat-cod")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const updateForm = <K extends keyof StageForm>(key: K, value: StageForm[K]) => setForm(current => ({ ...current, [key]: value }));

  const nextStep = () => {
    if (!startedCheckout) { setStartedCheckout(true); trackFunnel("InitiateCheckout", { value: form.quantity * PRICE, num_items: form.quantity }); }
    if (!form.fullName.trim() || !form.phone.trim()) { formRef.current?.reportValidity(); return; }
    setFormStep(2); setNotice("");
  };

  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.address.trim() || !form.consent) { formRef.current?.reportValidity(); return; }
    if (isStaging) { trackFunnel("Lead", { value: form.quantity * PRICE, num_items: form.quantity, order_intent: "cod" }); setNotice("Bản staging đã kiểm tra đủ hai bước. Không có đơn, tồn kho hay sự kiện Purchase nào được tạo ở môi trường này."); return; }
    setNotice("");
    order.mutate({ fullName: form.fullName, phone: form.phone, address: form.address, note: form.note, quantity: form.quantity, orderConsent: form.consent, marketingConsent: false, ...attribution.current }, {
      onSuccess: result => {
        if (result.kind === "created") { trackFunnel("Lead", { value: result.order.totalValue, num_items: result.order.quantity, order_intent: "cod" }); setNotice(`Đơn ${result.order.orderNumber} đã được ghi nhận. V2JOY sẽ liên hệ xác nhận trước khi gửi COD.`); setFormStep(1); setForm({ fullName: "", phone: "", address: "", note: "", quantity: 1, consent: false }); }
        else setNotice(result.kind === "existing" ? "Số điện thoại này đã có đơn TEMPO đang được xử lý. V2JOY sẽ liên hệ xác nhận." : "TEMPO hiện đã hết hàng. Cảm ơn bạn đã quan tâm.");
      }, onError: error => setNotice(error.message || "Không thể tạo đơn lúc này. Vui lòng thử lại."),
    });
  };
  const submitPreview = submitOrder;

  const productJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: "TEMPO 3ml by V2JOY",
    brand: { "@type": "Brand", name: "V2JOY" },
    image: [ASSET.hero.webp, ASSET.scale.webp, ASSET.ritual.webp],
    description: "TEMPO 3ml by V2JOY là một nghi thức chăm sóc cá nhân nhỏ gọn, kín đáo và có chủ đích.",
    offers: { "@type": "Offer", price: "499000", priceCurrency: "VND", availability: "https://schema.org/InStock", url: "https://v2joy.life/" },
  });

  return <main className={`tempo-stage ${isStaging ? "" : "tempo-stage--production"}`} id="top">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: productJsonLd }} />
    {isStaging && <div className="tempo-stage__preview" role="status">BẢN STAGING · Không ghi đơn, không trừ tồn, không gửi Pixel production</div>}
    <header className="tempo-stage__header">
      <a href="#top" className="tempo-stage__brand" aria-label="V2JOY TEMPO 3ml"><img src={ASSET.logo} alt="V2JOY" width="48" height="48" /><span>TEMPO <small>3ML</small></span></a>
      <nav aria-label="Điều hướng landing staging"><a href="#tempo-la-gi">TEMPO là gì</a><a href="#nghi-thuc">Nghi thức</a><a href="#thong-tin">Thông tin</a></nav>
      <button type="button" className="tempo-stage__header-cta" onClick={scrollToOrder}>ĐẶT TEMPO 3ML <ArrowRight size={16} /></button>
    </header>

    <section className="tempo-stage__hero" aria-labelledby="stage-hero-title">
      <div className="tempo-stage__hero-media"><ResponsiveAsset name="hero" priority sizes="100vw" alt="TEMPO 3 ml trong nghi thức chăm sóc cá nhân của quý ông" /></div>
      <div className="tempo-stage__hero-copy"><p className="tempo-stage__eyebrow">TEMPO 3ML · CHĂM SÓC CÁ NHÂN DÀNH CHO NAM</p><h1 id="stage-hero-title">CHẬM MỘT NHỊP.<br /><em>GẦN NHAU HƠN.</em></h1><p>Một bước chăm sóc da nhỏ gọn trước khoảnh khắc riêng tư — để sự chuẩn bị thêm chủ động, kín đáo và đúng nhịp.</p><div className="tempo-stage__actions"><button type="button" className="tempo-stage__button" onClick={scrollToOrder}>ĐẶT TEMPO 3ML — 499.000Đ <ArrowRight size={18} /></button><a href="#nghi-thuc" className="tempo-stage__text-link">XEM NGHI THỨC 3 BƯỚC <ArrowDown size={16} /></a></div><p className="tempo-stage__trust"><LockKeyhole size={15} /> COD · Đóng gói kín đáo · Gọi xác nhận trước khi giao</p></div>
      <div className="tempo-stage__hero-signal"><SignalRail /><span>{remaining.toLocaleString("vi-VN")} chai 3ml sẵn sàng nhận đơn</span></div>
    </section>

    <section className="tempo-stage__intro section-shell" id="tempo-la-gi" aria-labelledby="what-title"><div className="tempo-stage__heading"><p className="tempo-stage__eyebrow">TEMPO LÀ GÌ?</p><h2 id="what-title">MỘT NGHI THỨC NHỎ.<br /><em>CHO SỰ CHUẨN BỊ CÓ CHỦ ĐÍCH.</em></h2></div><div className="tempo-stage__benefits"><article><ShieldCheck /><h3>CHĂM SÓC KÍN ĐÁO</h3><p>Một bước chăm sóc da cá nhân được thiết kế cho những khoảnh khắc riêng tư.</p></article><article><PackageCheck /><h3>NHỎ GỌN 3ML</h3><p>Nằm gọn trong lòng bàn tay và túi grooming.</p></article><article><Sparkles /><h3>ĐÚNG NHỊP CỦA BẠN</h3><p>Một khoảng chuẩn bị riêng để bạn bước vào cuộc hẹn với sự hiện diện trọn vẹn hơn.</p></article></div></section>

    <section className="tempo-stage__context section-shell" aria-labelledby="context-title"><div className="tempo-stage__heading"><p className="tempo-stage__eyebrow">KÍCH THƯỚC & BỐI CẢNH</p><h2 id="context-title">NHỎ ĐỂ MANG THEO.<br /><em>KÍN ĐÁO ĐỂ GIỮ NHỊP RIÊNG.</em></h2><p>TEMPO 3 ml được tạo ra như một món đồ grooming cá nhân: vừa đủ nhỏ để ở cạnh bạn, vừa đủ kín đáo để không cần giải thích.</p></div><div className="tempo-stage__context-panels"><figure><ResponsiveAsset name="scale" alt="Chai TEMPO 3 ml nhỏ gọn trong bàn tay" /><figcaption><span>3ML THỰC TẾ</span><strong>Nằm gọn trong lòng bàn tay.</strong></figcaption></figure><figure><ResponsiveAsset name="pouch" alt="TEMPO 3 ml nằm gọn trong túi grooming" /><figcaption><span>MANG THEO KÍN ĐÁO</span><strong>Đủ nhỏ cho túi grooming cá nhân.</strong></figcaption></figure></div></section>

    <section className="tempo-stage__ritual section-shell" id="nghi-thuc" aria-labelledby="ritual-title"><div className="tempo-stage__ritual-media"><ResponsiveAsset name="ritual" alt="Nút nhấn màu đen và vòng cổ bạc của TEMPO" /></div><div className="tempo-stage__ritual-copy"><p className="tempo-stage__eyebrow">NGHI THỨC TEMPO</p><h2 id="ritual-title">BA BƯỚC.<br /><em>ĐÚNG NHỊP.</em></h2><ol><li><b>01</b><span><strong>VỆ SINH & LẮC ĐỀU</strong>Vệ sinh sạch và lắc đều sản phẩm.</span></li><li><b>02</b><span><strong>XỊT THEO HƯỚNG DẪN</strong>Xịt 3–4 nhát từ khoảng cách 3–5 cm.</span></li><li><b>03</b><span><strong>CHỜ 60 PHÚT & RỬA SẠCH</strong>Chờ đủ thời gian theo hướng dẫn rồi rửa sạch.</span></li></ol><p className="tempo-stage__warning"><CircleAlert size={18} /> Chỉ dùng ngoài da. Không dùng trên vùng da trầy xước; ngưng dùng nếu có kích ứng.</p><a href="#thong-tin" className="tempo-stage__text-link">XEM ĐẦY ĐỦ HƯỚNG DẪN VÀ CẢNH BÁO <ArrowDown size={16} /></a></div></section>

    <section className="tempo-stage__evening" aria-labelledby="evening-title"><div className="tempo-stage__evening-media"><ResponsiveAsset name="couple" alt="Một buổi tối được chuẩn bị có chủ đích cùng TEMPO" sizes="100vw" /></div><div className="tempo-stage__evening-copy"><p className="tempo-stage__eyebrow">TỪ CHUẨN BỊ ĐẾN HIỆN DIỆN</p><h2 id="evening-title">CHUẨN BỊ KỸ HƠN.<br /><em>ĐỂ KHOẢNH KHẮC TỰ NHIÊN HƠN.</em></h2><p>TEMPO không thay thế kết nối, đồng thuận hay sự quan tâm giữa hai người. Nó chỉ là một phần nhỏ trong cách bạn chủ động chăm sóc bản thân trước khi có mặt cho nhau.</p></div></section>

    <section className="tempo-stage__design section-shell" aria-labelledby="design-title"><div className="tempo-stage__design-copy"><p className="tempo-stage__eyebrow">THIẾT KẾ KỂ CHUYỆN</p><h2 id="design-title">HAI CHUYỂN ĐỘNG.<br /><em>MỘT NHỊP MỞ.</em></h2><p>Kéo nhẹ từ quai teal. Đẩy lên từ điểm chạm phía dưới. Hai chuyển động gặp nhau để khay sản phẩm xuất hiện theo một nhịp liền mạch.</p><ul><li><b>KÍNH TRONG VỪA ĐỦ</b><span>Nhìn thấy chai nhưng vẫn giữ cảm giác kín đáo.</span></li><li><b>KÉO TRÊN · ĐẨY DƯỚI</b><span>Trải nghiệm mở hộp có chủ đích.</span></li><li><b>NHỊP ĐÔI LIỀN MẠCH</b><span>Hai đường teal–cam chạy xuyên suốt từ hộp đến chai.</span></li></ul></div><figure className="tempo-stage__design-media"><ResponsiveAsset name="unboxing" alt="Hộp TEMPO mở bằng thao tác kéo trên và đẩy dưới" /><figcaption><span>KÉO</span><SignalRail /><span>ĐẨY</span></figcaption></figure></section>

    <section className="tempo-stage__transparency section-shell" id="thong-tin" aria-labelledby="information-title"><div className="tempo-stage__heading"><p className="tempo-stage__eyebrow">PHẢN HỒI + MINH BẠCH</p><h2 id="information-title">THÔNG TIN ĐỂ<br /><em>BẠN TỰ ĐỐI CHIẾU.</em></h2><p>Không hiển thị rating, tên cá nhân hay lời đánh giá tạo sẵn. Visual phản hồi chỉ được đưa lại sau khi V2JOY hoàn tất đối chiếu nguồn và quyền sử dụng.</p></div><aside className="tempo-stage__proof-note"><ClipboardCheck size={25} /><div><b>TRẠNG THÁI BẰNG CHỨNG XÃ HỘI</b><p>Chưa trích phản hồi tách rời trong staging để tránh biến dữ liệu không được xác nhận thành testimonial. Điều này cần V2JOY duyệt trước khi phát hành.</p></div></aside><div className="tempo-stage__details"><details><summary>HƯỚNG DẪN ĐẦY ĐỦ <ChevronDown size={18} /></summary><p>Lắc đều. Xịt 3–4 nhát cách da khoảng 3–5 cm, chờ 60 phút rồi rửa sạch. Chỉ dùng ngoài da.</p></details><details><summary>DANH MỤC THÀNH PHẦN (INCI) <ChevronDown size={18} /></summary><p>{INCI}</p></details><details><summary>CẢNH BÁO VÀ BẢO QUẢN <ChevronDown size={18} /></summary><p>Không dùng với người mẫn cảm với bất kỳ thành phần nào. Không xịt lên vùng da có vết thương hở hoặc đang trầy xước. Ngưng sử dụng và tham khảo ý kiến chuyên gia khi có dấu hiệu kích ứng, mẩn đỏ. Bảo quản nơi khô ráo, thoáng mát, dưới 30°C; tránh nắng trực tiếp. Hạn sử dụng: 24 tháng kể từ ngày sản xuất.</p></details><details><summary>NHÀ SẢN XUẤT VÀ SỐ CÔNG BỐ <ChevronDown size={18} /></summary><p>Chi nhánh Hà Nam – Công ty TNHH Sản xuất DP Công nghệ cao Nanofrance. Khu công nghiệp Đồng Văn IV, Phường Lê Hồ, Tỉnh Ninh Bình, Việt Nam. Xuất xứ: Việt Nam. Số công bố hiển thị: 354/20/CBMP-NB. Vui lòng đối chiếu thông tin lô hàng thực nhận với nhãn thành phẩm.</p></details></div></section>

    <section className="tempo-stage__offer section-shell" id="dat-cod" aria-labelledby="order-title"><div className="tempo-stage__delivery-media"><ResponsiveAsset name="delivery" alt="Hộp TEMPO trong kiện giao hàng không lộ thông tin sản phẩm" /></div><div className="tempo-stage__offer-copy"><p className="tempo-stage__eyebrow">OFFER + COD</p><h2 id="order-title">ĐẶT MỘT CHAI.<br /><em>GIỮ MỘT NHỊP.</em></h2><p>V2JOY gọi xác nhận trước khi gửi; bạn chỉ thanh toán khi nhận hàng.</p><div className="tempo-stage__order-card"><div><span>TEMPO 3 ML</span><strong>{vnd(PRICE)}</strong></div><dl><div><dt>Số lượng</dt><dd>01 hoặc 02 chai</dd></div><div><dt>Phí giao hàng</dt><dd><mark>CẦN V2JOY XÁC NHẬN</mark></dd></div><div><dt>Thời gian giao</dt><dd><mark>CẦN V2JOY XÁC NHẬN</mark></dd></div><div><dt>Quy trình</dt><dd>Gọi xác nhận trước khi gửi</dd></div><div><dt>Đóng gói</dt><dd>Ngoài kiện không lộ tên sản phẩm</dd></div></dl></div></div><form ref={formRef} className="tempo-stage__cod-form" data-clarity-mask="true" onSubmit={submitPreview} aria-label="Form COD hai bước bản staging"><div className="tempo-stage__form-progress"><span className={formStep === 1 ? "is-active" : "is-complete"}>1. THÔNG TIN</span><span className={formStep === 2 ? "is-active" : ""}>2. GIAO HÀNG</span></div>{formStep === 1 ? <fieldset><legend>THÔNG TIN NHẬN HÀNG</legend><label>HỌ VÀ TÊN<input value={form.fullName} onChange={event => updateForm("fullName", event.target.value)} autoComplete="name" required placeholder="Tên người nhận" /></label><label>SỐ ĐIỆN THOẠI<input value={form.phone} onChange={event => updateForm("phone", event.target.value)} autoComplete="tel" inputMode="tel" required placeholder="Ví dụ: 090 123 4567" /></label><div className="tempo-stage__quantity"><span>SỐ LƯỢNG</span><div role="radiogroup" aria-label="Chọn số lượng"><button type="button" aria-pressed={form.quantity === 1} onClick={() => updateForm("quantity", 1)}>01 chai</button><button type="button" aria-pressed={form.quantity === 2} onClick={() => updateForm("quantity", 2)}>02 chai</button></div></div><button type="button" className="tempo-stage__button" onClick={nextStep}>TIẾP TỤC ĐỊA CHỈ <ArrowRight size={17} /></button></fieldset> : <fieldset><legend>ĐỊA CHỈ VÀ XÁC NHẬN</legend><label>ĐỊA CHỈ NHẬN HÀNG<textarea value={form.address} onChange={event => updateForm("address", event.target.value)} autoComplete="street-address" required placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành" /></label><label>LỜI NHẮN <small>(không bắt buộc)</small><input value={form.note} onChange={event => updateForm("note", event.target.value)} placeholder="Thời điểm thuận tiện để nhận cuộc gọi..." /></label><div className="tempo-stage__total"><span>TẠM TÍNH <small>Phí giao chờ V2JOY xác nhận</small></span><strong>{vnd(form.quantity * PRICE)}</strong></div><label className="tempo-stage__consent"><input type="checkbox" checked={form.consent} onChange={event => updateForm("consent", event.target.checked)} required /><span>Tôi đồng ý để V2JOY dùng thông tin này để xác nhận và giao đơn COD.</span></label><div className="tempo-stage__form-actions"><button type="button" className="tempo-stage__back" onClick={() => setFormStep(1)}>QUAY LẠI</button><button className="tempo-stage__button" type="submit" disabled={remaining < 1}>{remaining < 1 ? "TEMPO ĐÃ HẾT HÀNG" : <>XÁC NHẬN ĐẶT COD <ShoppingBag size={17} /></>}</button></div></fieldset>}{notice && <p className="tempo-stage__form-notice" role="status"><Check size={17} /> {notice}</p>}<p className="tempo-stage__privacy"><LockKeyhole size={14} /> Bản staging: không lưu form, không tạo đơn và không giảm tồn kho.</p></form></section>

    <section className="tempo-stage__faq section-shell" id="cau-hoi" aria-labelledby="faq-title"><div className="tempo-stage__heading"><p className="tempo-stage__eyebrow">CÂU HỎI THƯỜNG GẶP</p><h2 id="faq-title">CẦN BIẾT TRƯỚC<br /><em>KHI ĐẶT COD.</em></h2></div><div className="tempo-stage__faq-list"><details><summary>TEMPO là sản phẩm gì?<ChevronDown size={18} /></summary><p>TEMPO là sản phẩm chăm sóc da cá nhân. Mục đích sử dụng trên hồ sơ hiện hành: giúp chăm sóc dưỡng ẩm da.</p></details><details><summary>Chai có dung tích bao nhiêu?<ChevronDown size={18} /></summary><p>Mỗi chai có dung tích 3 ml, được thiết kế nhỏ gọn để mang theo.</p></details><details><summary>Sử dụng và rửa sạch như thế nào?<ChevronDown size={18} /></summary><p>Vệ sinh sạch và lắc đều; xịt 3–4 nhát từ khoảng cách 3–5 cm; chờ 60 phút rồi rửa sạch.</p></details><details><summary>Đơn hàng được đóng gói ra sao?<ChevronDown size={18} /></summary><p>Kiện ngoài được định hướng đóng gói kín đáo, không lộ tên sản phẩm. Quy cách cuối cùng cần V2JOY xác nhận trước khi production.</p></details><details><summary>Tôi thanh toán bằng cách nào?<ChevronDown size={18} /></summary><p>Bạn thanh toán COD sau khi nhận hàng, sau bước V2JOY gọi xác nhận đơn.</p></details><details><summary>Phí và thời gian giao hàng?<ChevronDown size={18} /></summary><p><strong>PLACEHOLDER CẦN XÁC NHẬN:</strong> phí giao và thời gian giao chưa được cung cấp, nên chưa hiển thị số liệu cụ thể trên staging.</p></details><details><summary>Tôi cần lưu ý điều gì trước khi sử dụng?<ChevronDown size={18} /></summary><p>Chỉ dùng ngoài da. Không dùng trên da trầy xước; ngưng dùng nếu có kích ứng. Đọc kỹ nhãn thành phẩm của lô hàng thực nhận.</p></details></div><div className="tempo-stage__policy" id="chinh-sach"><div><b>CHÍNH SÁCH BẢO MẬT</b><span>PLACEHOLDER CẦN V2JOY XÁC NHẬN</span></div><div><b>CHÍNH SÁCH GIAO HÀNG</b><span>PLACEHOLDER CẦN V2JOY XÁC NHẬN</span></div><div><b>CHÍNH SÁCH ĐỔI TRẢ</b><span>PLACEHOLDER CẦN V2JOY XÁC NHẬN</span></div><div><b>ĐIỀU KHOẢN & HỖ TRỢ</b><span>PLACEHOLDER CẦN V2JOY XÁC NHẬN</span></div></div><div className="tempo-stage__final" aria-label="Đặt TEMPO 3 ml"><div><p className="tempo-stage__eyebrow">TEMPO 3ML · 499.000Đ</p><h2>ĐẶT MỘT CHAI.<br /><em>GIỮ MỘT NHỊP.</em></h2><p>COD · Đóng gói kín đáo · V2JOY gọi xác nhận trước khi giao.</p></div><button type="button" className="tempo-stage__button" onClick={scrollToOrder}>ĐẶT TEMPO 3ML <ArrowRight size={18} /></button></div></section>
    <footer className="tempo-stage__footer"><span>© V2JOY VIỆT NAM</span><span>TEMPO 3ML · CHỈ DÙNG NGOÀI DA</span><a href="#chinh-sach">CHÍNH SÁCH & HỖ TRỢ</a></footer>
    <div className="tempo-stage__sticky"><div><span>TEMPO 3ML</span><b>499.000Đ</b></div><button type="button" onClick={scrollToOrder}>ĐẶT COD <ShoppingBag size={17} /></button></div>
  </main>;
}
