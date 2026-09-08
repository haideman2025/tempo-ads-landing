import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  ClipboardCheck,
  Eye,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TimerReset,
  X,
} from "lucide-react";
import { FormEvent, TouchEvent, useEffect, useMemo, useRef, useState } from "react";
import { PRODUCT_CONFIG, formatVnd } from "@/config/tempoProduct";
import { trpc } from "@/lib/trpc";
import "./tempo-restore-v2-staging.css";

type ResponsiveAsset = {
  webp480: string;
  webp960: string;
  webp: string;
  png: string;
  width: number;
  height: number;
};

const MEDIA = {
  logo: "/manus-storage/v2joylogo-official_9302769f.webp",
  heroGrooming: {
    webp480: "/manus-storage/01-hero-grooming-480_c164fe4e.webp",
    webp960: "/manus-storage/01-hero-grooming-960_1a254cd1.webp",
    webp: "/manus-storage/01-hero-grooming_3964bc1c.webp",
    png: "/manus-storage/01-hero-grooming_4a73bdb5.png",
    width: 1672,
    height: 941,
  },
  scale: {
    webp480: "/manus-storage/02-scale-hand-3ml-480_cf67e79f.webp",
    webp960: "/manus-storage/02-scale-hand-3ml-960_ccd1274e.webp",
    webp: "/manus-storage/02-scale-hand-3ml_2be8617f.webp",
    png: "/manus-storage/02-scale-hand-3ml_02f14fc9.png",
    width: 1536,
    height: 1024,
  },
  actuator: {
    webp480: "/manus-storage/03-ritual-black-actuator-480_0ed14d63.webp",
    webp960: "/manus-storage/03-ritual-black-actuator-960_38eb15af.webp",
    webp: "/manus-storage/03-ritual-black-actuator_216f29f2.webp",
    png: "/manus-storage/03-ritual-black-actuator_2f8a79c7.png",
    width: 1536,
    height: 1024,
  },
  pouch: {
    webp480: "/manus-storage/04-portable-grooming-pouch-480_8c63cda0.webp",
    webp960: "/manus-storage/04-portable-grooming-pouch-960_7d77d385.webp",
    webp: "/manus-storage/04-portable-grooming-pouch_c4693388.webp",
    png: "/manus-storage/04-portable-grooming-pouch_619b3f4a.png",
    width: 1536,
    height: 1024,
  },
  couple: {
    webp480: "/manus-storage/05-couple-evening-context-480_f63ae016.webp",
    webp960: "/manus-storage/05-couple-evening-context-960_851ce329.webp",
    webp: "/manus-storage/05-couple-evening-context_def084a1.webp",
    png: "/manus-storage/05-couple-evening-context_f864353c.png",
    width: 1672,
    height: 941,
  },
  pullPush: {
    webp480: "/manus-storage/06-pull-push-unboxing-480_b345fe28.webp",
    webp960: "/manus-storage/06-pull-push-unboxing-960_65b99cb2.webp",
    webp: "/manus-storage/06-pull-push-unboxing_a1821968.webp",
    png: "/manus-storage/06-pull-push-unboxing_b3ae3d2d.png",
    width: 1536,
    height: 1024,
  },
  delivery: {
    webp480: "/manus-storage/07-discreet-delivery-480_1a69c6b9.webp",
    webp960: "/manus-storage/07-discreet-delivery-960_f5a808c8.webp",
    webp: "/manus-storage/07-discreet-delivery_fadce894.webp",
    png: "/manus-storage/07-discreet-delivery_f676417b.png",
    width: 1536,
    height: 1024,
  },
  legacyHero: "/manus-storage/tempo-brand-hero_6c096b85.png",
  packFront: "/manus-storage/tempo-pack-front_9e2c58ea.png",
  packSides: "/manus-storage/tempo-pack-sides_99932a67.png",
  packBack: "/manus-storage/tempo-pack-back_267c13e5.png",
  coupleHands: "/manus-storage/tempo-couple-hands_6b173623.png",
  benefits: "/manus-storage/tempo-benefits_e53327fd.png",
  steps: "/manus-storage/tempo-use-steps_a7b53030.png",
  wait: "/manus-storage/tempo-wait-ritual_0db05ba8.png",
  carry: "/manus-storage/tempo-carry_5d2617d2.png",
  unbox: "/manus-storage/tempo-unbox_7fe4ee69.png",
  detail: "/manus-storage/tempo-design-graphite_d1c18acb.png",
  story: "/manus-storage/tempo-story_fc38bf3c.png",
  label: "/manus-storage/tempo-claim-label_10f35a7d.png",
  diaryExit: "/manus-storage/tempo-lifestyle-01-exit-evening_334132f2.webp",
  diaryWalk: "/manus-storage/tempo-couple-04-walk-home-woman-man_8da9bbe8.png",
  diaryRitual: "/manus-storage/tempo-ritual-01-quiet-preparation_c68f7133.webp",
  diaryKitchen: "/manus-storage/tempo-couple-03-kitchen-evening-woman-man_9c71be8e.png",
  diaryMorning: "/manus-storage/tempo-lifestyle-04-morning-return_a7805e20.webp",
  video1: "/manus-storage/tempo-background-01_9f851f78.mp4",
  video2: "/manus-storage/tempo-background-02_d44fa0b9.mp4",
  video3: "/manus-storage/tempo-background-03_a5a1c511.mp4",
  video4: "/manus-storage/tempo-background-04_d33bb416.mp4",
  video5: "/manus-storage/tempo-background-05_b3e7f8c0.mp4",
} as const;

const INFOGRAPHICS = [
  { id: "01", image: MEDIA.legacyHero, label: "Bìa · TEMPO 3ML", alt: "Tổng quan TEMPO 3ml by V2JOY" },
  { id: "02", image: MEDIA.benefits, label: "Chăm sóc có chủ đích", alt: "Visual thông tin về nghi thức chăm sóc TEMPO" },
  { id: "03", image: MEDIA.steps, label: "Ba bước sử dụng", alt: "Visual ba bước sử dụng TEMPO" },
  { id: "04", image: MEDIA.wait, label: "Khoảng chờ 60 phút", alt: "Visual khoảng chờ trong nghi thức TEMPO" },
  { id: "05", image: MEDIA.carry, label: "Nhỏ gọn để mang theo", alt: "Visual TEMPO trong bối cảnh mang theo" },
  { id: "06", image: MEDIA.unbox, label: "Mở hộp kéo – đẩy", alt: "Visual mở hộp TEMPO dạng kéo trên đẩy dưới" },
  { id: "07", image: MEDIA.detail, label: "Chi tiết graphite", alt: "Visual chi tiết vòi và nắp graphite của TEMPO" },
  { id: "08", image: MEDIA.label, label: "Đọc nhãn sản phẩm", alt: "Visual nhãn và chi tiết sản phẩm TEMPO" },
  { id: "09", image: MEDIA.packSides, label: "Thông tin mặt hông", alt: "Visual mặt hông hộp TEMPO" },
  { id: "10", image: MEDIA.packBack, label: "Hướng dẫn mặt sau", alt: "Visual mặt sau hộp TEMPO" },
] as const;

const FEEDBACK = [
  { id: "01", image: "/manus-storage/tempo-feedback-spray-graphite_05a6f498.png" },
  { id: "02", image: "/manus-storage/feedback-02-wait_8add3a01.png" },
  { id: "03", image: "/manus-storage/feedback-03-clean_7143b919.png" },
  { id: "04", image: "/manus-storage/feedback-04-intention_a9caba0e.png" },
  { id: "05", image: "/manus-storage/feedback-05-care_082b777c.png" },
  { id: "06", image: "/manus-storage/feedback-06-unboxing_d9e5a446.png" },
  { id: "07", image: "/manus-storage/feedback-07-guidance_62df674a.png" },
  { id: "08", image: "/manus-storage/feedback-08-flow_aa0ad378.png" },
  { id: "09", image: "/manus-storage/feedback-09-design_5d665c00.png" },
  { id: "10", image: "/manus-storage/feedback-10-compact_bcf288fa.png" },
] as const;

const DIARY = [
  { id: "01", image: MEDIA.diaryExit, kicker: "RỜI NGÀY DÀI", title: "Khép lại ngày dài", copy: "Rời lịch làm việc và để lại một khoảng vừa đủ cho chính mình." },
  { id: "02", image: MEDIA.diaryWalk, kicker: "TRÊN ĐƯỜNG VỀ", title: "Để lại khoảng vội", copy: "Một nhịp chậm trước khi gặp nhau giúp buổi tối bớt phải chạy theo." },
  { id: "03", image: MEDIA.diaryRitual, kicker: "KHOẢNG DỪNG", title: "Chọn một điểm dừng", copy: "Chăm sóc bản thân là một lựa chọn chủ động, kín đáo và bình tĩnh." },
  { id: "04", image: MEDIA.diaryKitchen, kicker: "KHOẢNH KHẮC", title: "Có mặt cho nhau", copy: "Câu chuyện của TEMPO luôn bắt đầu từ sự tôn trọng và đồng thuận." },
  { id: "05", image: MEDIA.diaryMorning, kicker: "TRỞ VỀ", title: "Giữ nhịp vừa đủ", copy: "Một nghi thức nhẹ nhàng để trở về với nhịp riêng của hai người." },
] as const;

const INCI = "Purified Water, Alcohol (Ethanol), Butylene Glycol, Cnidium monnieri extract (Chiết xuất Xà Sàng Tử), Zanthoxylum bungeanum extract (Chiết xuất Hoa Tiêu), Sophora flavescens extract (Chiết xuất Khổ Sâm), Polygonatum sibiricum extract (Chiết xuất Hoàng Tinh), Eucommia ulmoides extract (Chiết xuất Đỗ Trọng), Cynomorium songaricum extract (Chiết xuất Tỏa Dương), Epimedium brevicornum extract (Chiết xuất Dâm Dương Hoắc), Verbena officinalis extract (Chiết xuất Mã Tiên Thảo), Morinda officinalis extract (Chiết xuất Ba Kích Thiên), Sodium Benzoate, Panthenol.";

type CheckoutForm = {
  fullName: string;
  phone: string;
  address: string;
  note: string;
  quantity: 1 | 2;
  orderConsent: boolean;
  marketingConsent: boolean;
};

type TrackingEvent = "ViewContent" | "ViewInfographic" | "ViewRitual" | "ViewFeedback" | "InitiateCheckout" | "Lead";
type LandingMode = "staging" | "production";
type Attribution = Record<"utmSource" | "utmMedium" | "utmCampaign" | "utmContent" | "utmTerm" | "fbclid", string>;
const emptyAttribution: Attribution = { utmSource: "", utmMedium: "", utmCampaign: "", utmContent: "", utmTerm: "", fbclid: "" };

function createEventId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `tempo-v2-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function stagingTrack(event: TrackingEvent, payload: Record<string, unknown> = {}) {
  const detail = {
    event,
    event_id: createEventId(),
    content_ids: [PRODUCT_CONFIG.sku],
    content_type: "product",
    currency: PRODUCT_CONFIG.currency,
    ...payload,
  };
  console.info("[TEMPO Restore V2 staging event]", detail);
  window.dispatchEvent(new CustomEvent("tempo:staging-event", { detail }));
}

function getAttribution(): Attribution {
  try {
    const query = new URLSearchParams(window.location.search);
    const previous = JSON.parse(localStorage.getItem("tempo-attribution") || "{}") as Partial<Attribution>;
    const attribution: Attribution = {
      utmSource: query.get("utm_source") || previous.utmSource || "",
      utmMedium: query.get("utm_medium") || previous.utmMedium || "",
      utmCampaign: query.get("utm_campaign") || previous.utmCampaign || "",
      utmContent: query.get("utm_content") || previous.utmContent || "",
      utmTerm: query.get("utm_term") || previous.utmTerm || "",
      fbclid: query.get("fbclid") || previous.fbclid || "",
    };
    localStorage.setItem("tempo-attribution", JSON.stringify(attribution));
    return attribution;
  } catch {
    return emptyAttribution;
  }
}

function trackFunnel(mode: LandingMode, event: TrackingEvent, payload: Record<string, unknown> = {}) {
  const detail = {
    event_id: createEventId(),
    content_ids: [PRODUCT_CONFIG.sku],
    content_type: "product",
    currency: PRODUCT_CONFIG.currency,
    ...payload,
  };
  if (mode === "staging") {
    stagingTrack(event, detail);
    return;
  }
  window.fbq?.("track", event, detail, { eventID: detail.event_id });
}

function useVisibilityEvent(id: string, event: TrackingEvent, mode: LandingMode) {
  const ref = useRef<HTMLElement>(null);
  const sent = useRef(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || sent.current) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.5) && !sent.current) {
          sent.current = true;
          trackFunnel(mode, event, { section_id: id });
          observer.disconnect();
        }
      },
      { threshold: [0.5] },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [event, id, mode]);
  return ref;
}

function ResponsiveImage({
  asset,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 760px) 100vw, 50vw",
}: {
  asset: ResponsiveAsset;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <picture className={className}>
      <source srcSet={`${asset.webp480} 480w, ${asset.webp960} 960w, ${asset.webp} ${asset.width}w`} sizes={sizes} type="image/webp" />
      <img src={asset.png} alt={alt} width={asset.width} height={asset.height} loading={priority ? "eager" : "lazy"} decoding="async" />
    </picture>
  );
}

function LegacyImage({ src, alt, className = "", eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return <img className={className} src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

function SignalRail() {
  return <svg className="tempo-r2__signal" viewBox="0 0 560 80" fill="none" aria-hidden="true"><path d="M0 43H58c30 0 29-23 56-23 29 0 25 43 56 43 33 0 25-35 56-35 35 0 23 30 58 30 29 0 27-20 57-20 27 0 30 13 56 13h56" /></svg>;
}

function CinematicVideo({ src, poster, label, eager = false }: { src: string; poster: string; label: string; eager?: boolean }) {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(eager);
  const [inView, setInView] = useState(eager);
  const [state, setState] = useState<"poster" | "loading" | "playing" | "paused" | "error">(eager ? "loading" : "poster");
  const retryCount = useRef(0);
  const retryTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (retryTimer.current !== null) window.clearTimeout(retryTimer.current);
  }, []);

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const preloadObserver = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) setLoad(true);
      },
      { rootMargin: eager ? "0px" : "700px 0px", threshold: 0.01 },
    );
    const playbackObserver = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry) setInView(entry.isIntersecting && entry.intersectionRatio >= 0.18);
      },
      { rootMargin: "0px", threshold: [0, 0.18, 0.5] },
    );
    preloadObserver.observe(element);
    playbackObserver.observe(element);
    return () => {
      preloadObserver.disconnect();
      playbackObserver.disconnect();
    };
  }, [eager]);

  useEffect(() => {
    const player = video.current;
    if (!player || !load) return;
    let cancelled = false;
    const play = () => {
      if (cancelled || !inView) return;
      player.play().then(() => !cancelled && setState("playing")).catch(() => !cancelled && setState("paused"));
    };
    if (inView) {
      const timers = [0, 320, 1000].map(delay => window.setTimeout(play, delay));
      player.addEventListener("canplay", play);
      return () => {
        cancelled = true;
        timers.forEach(window.clearTimeout);
        player.removeEventListener("canplay", play);
      };
    }
    player.pause();
    setState("paused");
  }, [inView, load]);

  const mediaEnabled = load;
  const handleVideoError = () => {
    const player = video.current;
    if (!player || !inView || retryCount.current >= 2) {
      setState("error");
      return;
    }
    retryCount.current += 1;
    setState("loading");
    retryTimer.current = window.setTimeout(() => {
      if (!video.current || !inView) return;
      video.current.load();
      video.current.play().then(() => setState("playing")).catch(() => setState("paused"));
    }, retryCount.current * 600);
  };
  return (
    <div ref={frame} className="tempo-r2__cinema" data-video-state={state} data-video-src={src} aria-label={label}>
      <LegacyImage src={poster} alt="" className="tempo-r2__cinema-poster" eager={eager} />
      {mediaEnabled && (
        <video
          ref={video}
          autoPlay
          muted
          loop
          playsInline
          preload={eager ? "auto" : "metadata"}
          poster={poster}
          onLoadStart={() => setState("loading")}
          onPlaying={() => { retryCount.current = 0; setState("playing"); }}
          onPause={() => setState("paused")}
          onError={handleVideoError}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="tempo-r2__cinema-wash" aria-hidden="true" />
    </div>
  );
}

function CinematicChapter({
  id,
  video,
  poster,
  eyebrow,
  title,
  accent,
  copy,
  detail,
  children,
}: {
  id: string;
  video: string;
  poster: string;
  eyebrow: string;
  title: string;
  accent: string;
  copy: string;
  detail: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="tempo-r2__chapter" aria-labelledby={`${id}-title`}>
      <CinematicVideo src={video} poster={poster} label={eyebrow} />
      <div className="tempo-r2__chapter-copy">
        <p className="tempo-r2__eyebrow">{eyebrow}</p>
        <h2 id={`${id}-title`}>{title}<br /><em>{accent}</em></h2>
        <p>{copy}</p>
        <b>{detail}</b>
        {children}
      </div>
    </section>
  );
}

function ImageLightbox({
  item,
  onClose,
  onPrevious,
  onNext,
  title,
}: {
  item: { id: string; image: string; label?: string; alt?: string };
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  title: string;
}) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);
  return (
    <div className="tempo-r2__lightbox" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="tempo-r2__lightbox-close" onClick={onClose} aria-label="Đóng ảnh phóng to"><X size={22} /></button>
      <button type="button" className="tempo-r2__lightbox-nav tempo-r2__lightbox-nav--previous" onClick={onPrevious} aria-label="Ảnh trước"><ChevronLeft size={26} /></button>
      <figure><LegacyImage src={item.image} alt={item.alt || `${title} ${item.id}`} eager /><figcaption>{item.id} / {item.label || title}</figcaption></figure>
      <button type="button" className="tempo-r2__lightbox-nav tempo-r2__lightbox-nav--next" onClick={onNext} aria-label="Ảnh tiếp theo"><ChevronRight size={26} /></button>
    </div>
  );
}

function InfographicGallery({ mode }: { mode: LandingMode }) {
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useVisibilityEvent("infographic-gallery", "ViewInfographic", mode);
  const item = active === null ? null : INFOGRAPHICS[active];
  const choose = (index: number) => setActive((index + INFOGRAPHICS.length) % INFOGRAPHICS.length);
  return (
    <section className="tempo-r2__section tempo-r2__infographics" ref={sectionRef} id="infographic" aria-labelledby="infographic-title">
      <div className="tempo-r2__section-heading"><p className="tempo-r2__eyebrow">THƯ VIỆN THÔNG TIN</p><h2 id="infographic-title">Mười khung hình.<br /><em>Để xem kỹ trước khi chọn.</em></h2><p>Toàn bộ visual có sẵn được giữ trong cùng một thư viện; chạm ảnh để xem trọn khung, không cắt chữ trên mobile.</p></div>
      <div className="tempo-r2__gallery-grid" aria-label="10 infographic TEMPO">
        {INFOGRAPHICS.map((info, index) => <button key={info.id} type="button" className="tempo-r2__gallery-card" onClick={() => choose(index)} aria-label={`Phóng to infographic ${info.id}: ${info.label}`}><LegacyImage src={info.image} alt={info.alt} /><span>{info.id} · {info.label}</span><Eye size={16} /></button>)}
      </div>
      {item && <ImageLightbox item={item} onClose={() => setActive(null)} onPrevious={() => choose(active! - 1)} onNext={() => choose(active! + 1)} title="Infographic TEMPO" />}
    </section>
  );
}

function VisualDiary() {
  const [active, setActive] = useState(0);
  const start = useRef<number | null>(null);
  const item = DIARY[active];
  const choose = (next: number) => setActive((next + DIARY.length) % DIARY.length);
  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const end = event.changedTouches[0]?.clientX;
    if (start.current !== null && end !== undefined && Math.abs(end - start.current) > 44) choose(active + (end < start.current ? 1 : -1));
    start.current = null;
  };
  return (
    <section className="tempo-r2__diary" aria-labelledby="diary-title">
      <div className="tempo-r2__section-heading"><p className="tempo-r2__eyebrow">VISUAL DIARY / TEMPO</p><h2 id="diary-title">Một buổi tối.<br /><em>Những khoảng vừa đủ.</em></h2><p>Năm khoảnh khắc được giữ trọn vẹn như một tuyến hình ảnh, không thay thế giao tiếp và sự đồng thuận giữa hai người.</p></div>
      <div className="tempo-r2__diary-stage" data-swipe="enabled" onTouchStart={event => { start.current = event.changedTouches[0]?.clientX ?? null; }} onTouchEnd={handleTouchEnd}>
        <LegacyImage src={item.image} alt={`${item.title}: ${item.copy}`} />
        <div className="tempo-r2__diary-copy"><span>{item.id} / 05 · {item.kicker}</span><h3>{item.title}</h3><p>{item.copy}</p></div>
        <div className="tempo-r2__gallery-controls"><button type="button" onClick={() => choose(active - 1)} aria-label="Khoảnh khắc trước"><ChevronLeft size={20} /></button><button type="button" onClick={() => choose(active + 1)} aria-label="Khoảnh khắc tiếp theo"><ChevronRight size={20} /></button></div>
      </div>
      <div className="tempo-r2__diary-dots" role="tablist" aria-label="Năm khoảnh khắc visual diary">{DIARY.map((moment, index) => <button key={moment.id} type="button" role="tab" aria-selected={active === index} onClick={() => choose(index)}><b>{moment.id}</b><span>{moment.kicker}</span></button>)}</div>
    </section>
  );
}

function FeedbackGallery({ mode }: { mode: LandingMode }) {
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useVisibilityEvent("feedback-gallery", "ViewFeedback", mode);
  const item = active === null ? null : FEEDBACK[active];
  const choose = (index: number) => setActive((index + FEEDBACK.length) % FEEDBACK.length);
  return (
    <section className="tempo-r2__feedback" ref={sectionRef} id="phan-hoi" aria-labelledby="feedback-title">
      <div className="tempo-r2__section-heading"><p className="tempo-r2__eyebrow tempo-r2__eyebrow--light">GÓC NHÌN NHÓM TRẢI NGHIỆM</p><h2 id="feedback-title">Những ghi nhận.<br /><em>Để bạn xem kỹ.</em></h2><p>Ba khung xem nhanh bên dưới dẫn tới toàn bộ 10 visual do V2JOY cung cấp. Không thêm rating, tên cá nhân hoặc lời trích dẫn tạo sẵn.</p></div>
      <div className="tempo-r2__feedback-preview">{FEEDBACK.slice(0, 3).map((feedback, index) => <button key={feedback.id} type="button" onClick={() => choose(index)} aria-label={`Xem phản hồi ${feedback.id} trên 10`}><LegacyImage src={feedback.image} alt={`Visual phản hồi tổng hợp ${feedback.id} trên 10`} /><span>PHẢN HỒI {feedback.id}</span></button>)}</div>
      <div className="tempo-r2__feedback-all" role="tablist" aria-label="Đầy đủ 10 visual phản hồi">{FEEDBACK.map((feedback, index) => <button key={feedback.id} type="button" role="tab" aria-label={`Mở visual phản hồi ${feedback.id} trên 10`} onClick={() => choose(index)}>{feedback.id}</button>)}</div>
      <p className="tempo-r2__feedback-disclaimer"><ClipboardCheck size={17} /> Visual giữ nguyên theo tài liệu V2JOY cung cấp. Nội dung phản ánh góc nhìn tổng hợp của nhóm trải nghiệm, không phải rating, không phải cam kết kết quả; trải nghiệm cá nhân có thể khác nhau và không thay thế thông tin trên nhãn thành phẩm.</p>
      {item && <ImageLightbox item={item} onClose={() => setActive(null)} onPrevious={() => choose(active! - 1)} onNext={() => choose(active! + 1)} title="Phản hồi nhóm trải nghiệm" />}
    </section>
  );
}

function useRestoreSeo(mode: LandingMode) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = mode === "staging" ? "STAGING · TEMPO — XỊT LÀM CHỦ NHỊP YÊU 3ML" : "TEMPO — XỊT LÀM CHỦ NHỊP YÊU 3ML | V2JOY";
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = "https://v2joy.life/";
    canonical.dataset.tempoRestoreV2 = mode;
    document.head.appendChild(canonical);
    const robots = mode === "staging" ? document.createElement("meta") : null;
    if (robots) {
      robots.name = "robots";
      robots.content = "noindex, nofollow";
      robots.dataset.tempoRestoreV2 = "true";
      document.head.appendChild(robots);
    }
    return () => { document.title = previousTitle; canonical.remove(); robots?.remove(); };
  }, [mode]);
}

export default function TempoRestoreV2Staging({ mode = "staging" }: { mode?: LandingMode }) {
  const isStaging = mode === "staging";
  useRestoreSeo(mode);
  const formRef = useRef<HTMLFormElement>(null);
  const utils = trpc.useUtils();
  const [step, setStep] = useState<1 | 2>(1);
  const [startedCheckout, setStartedCheckout] = useState(false);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState<CheckoutForm>({ fullName: "", phone: "", address: "", note: "", quantity: 1, orderConsent: false, marketingConsent: false });
  const { data: stock } = trpc.orders.status.useQuery(undefined, { refetchInterval: 30_000 });
  const order = trpc.orders.create.useMutation({ onSuccess: () => utils.orders.status.invalidate() });
  const remaining = stock?.remaining ?? PRODUCT_CONFIG.inventoryCapacity;
  const ritualRef = useVisibilityEvent("ritual", "ViewRitual", mode);
  const attribution = useRef<Attribution>(emptyAttribution);
  const total = useMemo(() => form.quantity * PRODUCT_CONFIG.price, [form.quantity]);

  useEffect(() => {
    attribution.current = getAttribution();
    trackFunnel(mode, "ViewContent", { value: PRODUCT_CONFIG.price, landing_mode: mode });
  }, [mode]);

  const updateForm = <K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) => setForm(current => ({ ...current, [key]: value }));
  const scrollToOrder = () => {
    if (!startedCheckout) {
      setStartedCheckout(true);
      trackFunnel(mode, "InitiateCheckout", { value: total, num_items: form.quantity, order_intent: "cod" });
    }
    document.getElementById("dat-cod")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const nextStep = () => {
    if (!startedCheckout) {
      setStartedCheckout(true);
      trackFunnel(mode, "InitiateCheckout", { value: total, num_items: form.quantity, order_intent: "cod" });
    }
    if (!form.fullName.trim() || !form.phone.trim()) { formRef.current?.reportValidity(); return; }
    setNotice("");
    setStep(2);
  };
  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.address.trim() || !form.orderConsent || !form.marketingConsent) { formRef.current?.reportValidity(); return; }
    if (isStaging) {
      trackFunnel("staging", "Lead", { value: total, num_items: form.quantity, order_intent: "cod", simulated: true });
      setNotice("Đã kiểm tra đủ luồng COD hai bước trên staging. Không có đơn, thông tin liên hệ, trừ tồn kho, Pixel Purchase hoặc CAPI Purchase nào được tạo.");
      return;
    }
    setNotice("");
    order.mutate({
      fullName: form.fullName,
      phone: form.phone,
      address: form.address,
      note: form.note,
      quantity: form.quantity,
      orderConsent: form.orderConsent,
      marketingConsent: form.marketingConsent,
      ...attribution.current,
    }, {
      onSuccess: result => {
        if (result.kind === "created") {
          trackFunnel("production", "Lead", { value: result.order.totalValue, num_items: result.order.quantity, order_intent: "cod" });
          setNotice(`Đơn ${result.order.orderNumber} đã được ghi nhận. V2JOY sẽ liên hệ xác nhận trước khi gửi COD.`);
          setStep(1);
          setForm({ fullName: "", phone: "", address: "", note: "", quantity: 1, orderConsent: false, marketingConsent: false });
        } else {
          setNotice(result.kind === "existing" ? "Số điện thoại này đã có đơn TEMPO đang được xử lý. V2JOY sẽ liên hệ xác nhận." : "TEMPO hiện đã hết hàng. Cảm ơn bạn đã quan tâm.");
        }
      },
      onError: error => setNotice(error.message || "Không thể tạo đơn lúc này. Vui lòng thử lại."),
    });
  };
  const productJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: PRODUCT_CONFIG.name,
    sku: PRODUCT_CONFIG.sku,
    brand: { "@type": "Brand", name: "V2JOY" },
    image: [MEDIA.heroGrooming.webp, MEDIA.scale.webp, MEDIA.actuator.webp],
    description: "TEMPO 3ml by V2JOY là sản phẩm chăm sóc da cá nhân nhỏ gọn, sử dụng theo hướng dẫn trên nhãn.",
    offers: { "@type": "Offer", price: String(PRODUCT_CONFIG.price), priceCurrency: PRODUCT_CONFIG.currency, availability: "https://schema.org/InStock", url: isStaging ? "https://v2joy.life/staging/tempo-restore-v2" : "https://v2joy.life/" },
  });

  return (
    <main className={`tempo-r2 ${isStaging ? "" : "tempo-r2--production"}`} id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: productJsonLd }} />
      {isStaging && <div className="tempo-r2__stage-ribbon" role="status">STAGING REVIEW · Không ghi đơn, không lưu PII, không trừ tồn, không gửi Pixel/CAPI production</div>}
      <header className="tempo-r2__header">
        <a href="#top" className="tempo-r2__brand" aria-label="V2JOY TEMPO 3ml"><img src={MEDIA.logo} alt="V2JOY" width="44" height="44" /><span>TEMPO</span></a>
        <p>TEMPO — XỊT LÀM CHỦ NHỊP YÊU 3ML</p>
        <nav aria-label="Điều hướng TEMPO Restore V2"><a href="#infographic">Khám phá</a><a href="#nghi-thuc">Nghi thức</a><a href="#thong-tin">Thông tin</a></nav>
        <button type="button" onClick={scrollToOrder}>ĐẶT COD <ArrowRight size={16} /></button>
      </header>

      <section className="tempo-r2__hero" aria-labelledby="hero-title">
        <CinematicVideo src={MEDIA.video1} poster={MEDIA.heroGrooming.webp} label="Hình ảnh mở đầu TEMPO" eager />
        <div className="tempo-r2__hero-copy"><p className="tempo-r2__eyebrow tempo-r2__eyebrow--light">V2JOY / TEMPO 3ML</p><h1 id="hero-title">CHẬM MỘT NHỊP.<br /><em>GẦN NHAU HƠN.</em></h1><p>Một bước chăm sóc cá nhân kín đáo trước những khoảnh khắc riêng tư — để sự chuẩn bị có thêm chủ động, nhẹ nhàng và đúng nhịp.</p><div><button type="button" className="tempo-r2__button" onClick={scrollToOrder}>ĐẶT TEMPO 3ML · {formatVnd(PRODUCT_CONFIG.price)} <ArrowRight size={18} /></button><a href="#nghi-thuc">XEM NGHI THỨC <ArrowDown size={16} /></a></div></div>
        <div className="tempo-r2__hero-stock"><b>{remaining.toLocaleString("vi-VN")}</b><span>/ {PRODUCT_CONFIG.inventoryCapacity.toLocaleString("vi-VN")} chai · COD · Gọi xác nhận trước khi giao</span><SignalRail /></div>
      </section>

      <div className="tempo-r2__trust-strip" aria-label="Thông tin mua hàng"><span><LockKeyhole size={16} /> Đóng gói kín đáo</span><span><PackageCheck size={16} /> Thanh toán COD</span><span><ClipboardCheck size={16} /> Thông tin rõ trên nhãn</span><span><ShieldCheck size={16} /> Gọi xác nhận đơn</span></div>

      <section className="tempo-r2__story tempo-r2__section" aria-labelledby="story-title"><div><p className="tempo-r2__eyebrow">VÌ SAO BẮT ĐẦU</p><h2 id="story-title">Chuẩn bị kỹ hơn.<br /><em>Để buổi tối tự nhiên hơn.</em></h2></div><div><p>TEMPO 3ml là lựa chọn chăm sóc da nhỏ gọn, với cách dùng và thông tin nhãn rõ ràng cho khoảng chuẩn bị riêng của bạn.</p><p className="tempo-r2__quiet-note"><TimerReset size={18} /> TEMPO là mỹ phẩm chăm sóc da. Sản phẩm không thay thế kết nối, giao tiếp và đồng thuận giữa hai người.</p></div></section>

      <CinematicChapter id="chapter-one" video={MEDIA.video2} poster={MEDIA.carry} eyebrow="MỘT KHOẢNG CHO RIÊNG MÌNH" title="Khép lại ngày dài." accent="Mang theo điều vừa đủ." copy="Bỏ chai vào túi. Rời khỏi lịch làm việc. Giữ một khoảng chuẩn bị riêng cho buổi tối bạn đã chọn." detail="MỘT CHAI NHỎ · MỘT NHỊP CHỦ ĐỘNG"><ResponsiveImage asset={MEDIA.pouch} alt="TEMPO 3 ml được cất trong túi grooming kín đáo" className="tempo-r2__chapter-inset" /></CinematicChapter>

      <section className="tempo-r2__product tempo-r2__section" id="san-pham" aria-labelledby="product-title"><div className="tempo-r2__product-image"><LegacyImage src={MEDIA.packFront} alt="Chai và hộp TEMPO 3ml" /><span>3ML / NHỎ GỌN</span></div><div className="tempo-r2__product-copy"><p className="tempo-r2__eyebrow">TEMPO 3ML / ĐẶT SỚM</p><h2 id="product-title">Nhỏ để mang theo.<br /><em>Dễ bắt đầu.</em></h2><p>Một chai TEMPO 3ml cho nhịp chăm sóc kín đáo. Thanh toán COD; V2JOY gọi xác nhận trước khi gửi.</p><dl><div><dt>Giá bán</dt><dd>{formatVnd(PRODUCT_CONFIG.price)} / chai</dd></div><div><dt>Đơn tối đa</dt><dd>{PRODUCT_CONFIG.maxQuantity.toString().padStart(2, "0")} chai</dd></div><div><dt>Tồn hiển thị</dt><dd>{remaining.toLocaleString("vi-VN")} / {PRODUCT_CONFIG.inventoryCapacity.toLocaleString("vi-VN")}</dd></div></dl><button type="button" className="tempo-r2__button" onClick={scrollToOrder}>XEM TÓM TẮT ĐƠN <ShoppingBag size={17} /></button></div><ResponsiveImage asset={MEDIA.scale} alt="Chai TEMPO 3 ml nằm gọn trong bàn tay" className="tempo-r2__product-scale" /></section>

      <InfographicGallery mode={mode} />

      <section className="tempo-r2__packaging tempo-r2__section" aria-labelledby="packaging-title"><div className="tempo-r2__section-heading"><p className="tempo-r2__eyebrow">THIẾT KẾ BAO BÌ</p><h2 id="packaging-title">Kéo trên. Đẩy dưới.<br /><em>Một nhịp mở liền mạch.</em></h2><p>Hộp đứng dạng khay rút: thao tác kéo từ phần teal phía trên và đẩy tại điểm chạm phía dưới. Cửa sổ vừa phải để nhìn thấy chai, vẫn giữ cảm giác kín đáo.</p></div><div className="tempo-r2__pack-grid"><figure><LegacyImage src={MEDIA.packFront} alt="Mặt trước hộp TEMPO dạng khay rút đứng" /><figcaption>Mặt trước</figcaption></figure><figure><LegacyImage src={MEDIA.packSides} alt="Mặt hông hộp TEMPO" /><figcaption>Mặt hông</figcaption></figure><figure><LegacyImage src={MEDIA.packBack} alt="Mặt sau hộp TEMPO" /><figcaption>Mặt sau</figcaption></figure></div><div className="tempo-r2__pull-push"><ResponsiveImage asset={MEDIA.pullPush} alt="Hộp TEMPO mở theo thao tác kéo trên và đẩy dưới" /><div><span>KÉO</span><SignalRail /><span>ĐẨY</span></div><p>Visual teal–cam chạy liên tục giữa hộp và chai; không phải thiết kế nắp mở hay hộp kiểu quyển sách.</p></div></section>

      <CinematicChapter id="chapter-two" video={MEDIA.video3} poster={MEDIA.label} eyebrow="BIẾT TRƯỚC KHI CHỌN" title="Dừng lại để đọc." accent="Tự đối chiếu trước khi dùng." copy="Sản phẩm chăm sóc da không cần được hứa quá. Bạn có thể xem thành phần, đối chiếu nhãn và chọn theo điều mình hiểu rõ." detail="ĐỌC INCI · ĐỐI CHIẾU NHÃN · TỰ QUYẾT ĐỊNH" />

      <section className="tempo-r2__ritual tempo-r2__section" ref={ritualRef} id="nghi-thuc" aria-labelledby="ritual-title"><div className="tempo-r2__ritual-copy"><p className="tempo-r2__eyebrow">NGHI THỨC TEMPO</p><h2 id="ritual-title">Ba bước.<br /><em>Đúng nhịp.</em></h2><ol><li><b>01</b><span><strong>VỆ SINH & LẮC ĐỀU</strong>Vệ sinh sạch vùng da cơ thể và lắc đều sản phẩm.</span></li><li><b>02</b><span><strong>XỊT THEO HƯỚNG DẪN</strong>Để chai cách vùng da cần chăm sóc khoảng 3–5 cm.</span></li><li><b>03</b><span><strong>CHỜ & RỬA SẠCH</strong>xịt 3–4 nhát, chờ 60 phút rồi rửa sạch.</span></li></ol><p className="tempo-r2__legal-callout"><CircleAlert size={18} /> Chỉ dùng ngoài da. Không dùng trên vùng da trầy xước; ngưng dùng nếu có kích ứng.</p></div><div className="tempo-r2__ritual-media"><LegacyImage src={MEDIA.steps} alt="Ba bước sử dụng TEMPO 3ml" /><ResponsiveImage asset={MEDIA.actuator} alt="Cụm nút nhấn và vòi graphite đen, vòng cổ bạc của TEMPO" /><LegacyImage src={MEDIA.wait} alt="Khoảng chờ 60 phút của nghi thức TEMPO" /></div></section>

      <CinematicChapter id="chapter-three" video={MEDIA.video4} poster={MEDIA.coupleHands} eyebrow="KHOẢNH KHẮC CỦA HAI NGƯỜI" title="Đến cuộc hẹn." accent="Có mặt cho nhau." copy="Một khung cảnh bình tĩnh, đặt sự có mặt lên trước mọi vội vàng. TEMPO chỉ là một bước chăm sóc trong nhịp riêng của bạn." detail="BÌNH TĨNH · TÔN TRỌNG · ĐỒNG THUẬN"><ResponsiveImage asset={MEDIA.couple} alt="Cặp đôi nam nữ trưởng thành trong một buổi tối riêng tư" className="tempo-r2__chapter-inset" /></CinematicChapter>

      <VisualDiary />

      <CinematicChapter id="chapter-four" video={MEDIA.video5} poster={MEDIA.story} eyebrow="GIỮ MỘT NHỊP RIÊNG" title="Nhẹ nhàng kết thúc." accent="Hiểu rõ điều mình dùng." copy="Từ một chai nhỏ đến một buổi tối bạn đã chọn — mọi thứ đều bắt đầu bằng việc hiểu rõ điều mình dùng." detail="TEMPO 3ML · KÍN ĐÁO · RÕ RÀNG" />

      <FeedbackGallery mode={mode} />

      <section className="tempo-r2__information tempo-r2__section" id="thong-tin" aria-labelledby="information-title"><div className="tempo-r2__section-heading"><p className="tempo-r2__eyebrow">THÔNG TIN SẢN PHẨM</p><h2 id="information-title">Rõ ràng từ thành phần<br /><em>đến nhãn thành phẩm.</em></h2><p>Thông tin dưới đây được giữ nguyên để bạn kiểm tra trước khi đặt COD. Nhãn in trên sản phẩm của từng lô luôn là nguồn ưu tiên.</p></div><div className="tempo-r2__label-grid"><figure><LegacyImage src={MEDIA.packSides} alt="Mặt hông hộp TEMPO có hướng dẫn nghi thức" /><figcaption>Hướng dẫn trên mặt hông</figcaption></figure><figure><LegacyImage src={MEDIA.packBack} alt="Mặt sau hộp TEMPO có thông tin bảo quản" /><figcaption>Hướng dẫn và bảo quản</figcaption></figure><figure><LegacyImage src={MEDIA.label} alt="Chi tiết nhãn chai TEMPO 3ml" /><figcaption>Chi tiết chai 3ml</figcaption></figure></div><div className="tempo-r2__safety-grid"><article><TimerReset size={21} /><h3>Hướng dẫn</h3><p>Lắc đều. Xịt 3–4 nhát cách da khoảng 3–5 cm, chờ 60 phút rồi rửa sạch.</p></article><article><ShieldCheck size={21} /><h3>Cảnh báo</h3><p>Chỉ dùng ngoài da. Không dùng trên vùng da trầy xước; ngưng dùng nếu có kích ứng.</p></article><article><ClipboardCheck size={21} /><h3>Bảo quản</h3><p>Nơi khô ráo, thoáng mát, dưới 30°C; tránh nắng trực tiếp và đóng kín nắp sau khi dùng.</p></article></div><div className="tempo-r2__details"><details><summary>Danh mục thành phần (INCI)<ChevronDown size={18} /></summary><p>{INCI}</p></details><details><summary>Cảnh báo và hạn sử dụng<ChevronDown size={18} /></summary><p>Chỉ dùng ngoài da, không được uống. Không dùng với người mẫn cảm với bất kỳ thành phần nào. Không xịt lên vùng da có vết thương hở hoặc đang trầy xước. Ngưng sử dụng và tham khảo ý kiến chuyên gia khi có dấu hiệu kích ứng, mẩn đỏ. Hạn sử dụng: 24 tháng kể từ ngày sản xuất.</p></details><details><summary>Nhà sản xuất và số công bố<ChevronDown size={18} /></summary><p>Chi nhánh Hà Nam – Công ty TNHH Sản xuất DP Công nghệ cao Nanofrance. Khu công nghiệp Đồng Văn IV, Phường Lê Hồ, Tỉnh Ninh Bình, Việt Nam. Xuất xứ: Việt Nam. Website trên nhãn: www.nanofrance.com.vn. Số công bố hiển thị: 354/20/CBMP-NB. Vui lòng đối chiếu thông tin lô hàng thực nhận với nhãn thành phẩm.</p></details></div></section>

      <section className="tempo-r2__order tempo-r2__section" id="dat-cod" aria-labelledby="order-title"><div className="tempo-r2__order-intro"><ResponsiveImage asset={MEDIA.delivery} alt="TEMPO trong kiện giao hàng kín đáo" /><div><p className="tempo-r2__eyebrow">TÓM TẮT ĐƠN / COD</p><h2 id="order-title">Đặt một chai.<br /><em>Giữ một nhịp.</em></h2><p>V2JOY gọi xác nhận trước khi gửi; bạn chỉ thanh toán khi nhận hàng.</p><dl><div><dt>TEMPO 3ML</dt><dd>{formatVnd(PRODUCT_CONFIG.price)} / chai</dd></div><div><dt>Số lượng tối đa</dt><dd>{PRODUCT_CONFIG.maxQuantity} chai</dd></div><div><dt>Phí giao hàng</dt><dd><mark>CẦN V2JOY XÁC NHẬN</mark></dd></div><div><dt>Thời gian giao</dt><dd><mark>CẦN V2JOY XÁC NHẬN</mark></dd></div></dl></div></div><form ref={formRef} className="tempo-r2__form" data-clarity-mask="true" onSubmit={submitOrder} aria-label={isStaging ? "Form COD hai bước staging" : "Form COD hai bước"}><div className="tempo-r2__form-progress"><span className={step === 1 ? "is-active" : "is-complete"}>1. THÔNG TIN</span><span className={step === 2 ? "is-active" : ""}>2. GIAO HÀNG</span></div>{step === 1 ? <fieldset><legend>Thông tin nhận hàng</legend><label>Họ và tên<input value={form.fullName} onChange={event => updateForm("fullName", event.target.value)} autoComplete="name" required placeholder="Tên người nhận" /></label><label>Số điện thoại<input value={form.phone} onChange={event => updateForm("phone", event.target.value)} autoComplete="tel" inputMode="tel" required placeholder="Ví dụ: 090 123 4567" /></label><div className="tempo-r2__quantity"><span>Số lượng</span><div role="radiogroup" aria-label="Chọn số lượng TEMPO"><button type="button" aria-pressed={form.quantity === 1} onClick={() => updateForm("quantity", 1)}>01 chai</button><button type="button" aria-pressed={form.quantity === 2} onClick={() => updateForm("quantity", 2)}>02 chai</button></div></div><button type="button" className="tempo-r2__button" onClick={nextStep}>TIẾP TỤC ĐỊA CHỈ <ArrowRight size={17} /></button></fieldset> : <fieldset><legend>Địa chỉ và xác nhận</legend><label>Địa chỉ nhận hàng<textarea value={form.address} onChange={event => updateForm("address", event.target.value)} autoComplete="street-address" required placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành" /></label><label>Lời nhắn <small>(không bắt buộc)</small><input value={form.note} onChange={event => updateForm("note", event.target.value)} placeholder="Thời điểm thuận tiện để nhận cuộc gọi..." /></label><div className="tempo-r2__form-total"><span>Tạm tính <small>Phí giao chờ V2JOY xác nhận</small></span><strong>{formatVnd(total)}</strong></div><label className="tempo-r2__consent"><input type="checkbox" checked={form.orderConsent} onChange={event => updateForm("orderConsent", event.target.checked)} required /><span>Tôi đồng ý để V2JOY dùng thông tin này để xác nhận và giao đơn COD.</span></label><label className="tempo-r2__consent"><input type="checkbox" checked={form.marketingConsent} onChange={event => updateForm("marketingConsent", event.target.checked)} required /><span>Tôi đồng ý nhận thông tin cập nhật sản phẩm và ưu đãi từ V2JOY.</span></label><div className="tempo-r2__form-actions"><button type="button" onClick={() => setStep(1)}>QUAY LẠI</button><button type="submit" className="tempo-r2__button" disabled={remaining < 1 || order.isPending}>{remaining < 1 ? "TEMPO ĐÃ HẾT HÀNG" : order.isPending ? "ĐANG GỬI ĐƠN..." : <>XÁC NHẬN ĐẶT COD <ShoppingBag size={17} /></>}</button></div></fieldset>}{notice && <p className="tempo-r2__form-notice" role="status"><Check size={17} /> {notice}</p>}<p className="tempo-r2__privacy"><LockKeyhole size={14} /> {isStaging ? "Bản staging không gửi form tới server;" : "V2JOY chỉ dùng thông tin để xác nhận và giao đơn COD;"} QualifiedLead chỉ theo CRM sau xác nhận và Purchase chỉ theo CAPI sau khi giao thành công.</p></form></section>

      <section className="tempo-r2__faq tempo-r2__section" aria-labelledby="faq-title"><div className="tempo-r2__section-heading"><p className="tempo-r2__eyebrow">CÂU HỎI THƯỜNG GẶP</p><h2 id="faq-title">Cần biết trước<br /><em>khi đặt COD.</em></h2></div><div>{[{ q: "TEMPO là sản phẩm gì?", a: "TEMPO là sản phẩm chăm sóc da cá nhân. Mục đích sử dụng ghi nhận: giúp chăm sóc dưỡng ẩm da." }, { q: "Chai có dung tích bao nhiêu?", a: "Mỗi chai có dung tích 3 ml, được thiết kế nhỏ gọn để mang theo." }, { q: "Sử dụng và rửa sạch như thế nào?", a: "Vệ sinh sạch và lắc đều; xịt 3–4 nhát từ khoảng cách 3–5 cm; chờ 60 phút rồi rửa sạch." }, { q: "Đơn hàng được đóng gói ra sao?", a: "Kiện ngoài được định hướng đóng gói kín đáo, không lộ tên sản phẩm. Quy cách cuối cùng cần V2JOY xác nhận trước khi production." }, { q: "Phí và thời gian giao hàng?", a: "PLACEHOLDER CẦN XÁC NHẬN: phí giao và thời gian giao chưa được V2JOY cung cấp, nên chưa hiển thị số liệu cụ thể trên staging." }].map(item => <details key={item.q}><summary>{item.q}<ChevronDown size={18} /></summary><p>{item.a}</p></details>)}</div><div className="tempo-r2__policy"><span>Chính sách bảo mật <b>PLACEHOLDER CẦN V2JOY XÁC NHẬN</b></span><span>Chính sách giao hàng <b>PLACEHOLDER CẦN V2JOY XÁC NHẬN</b></span><span>Chính sách đổi trả <b>PLACEHOLDER CẦN V2JOY XÁC NHẬN</b></span><span>Hỗ trợ khách hàng <b>PLACEHOLDER CẦN V2JOY XÁC NHẬN</b></span></div></section>

      <section className="tempo-r2__final"><p className="tempo-r2__eyebrow tempo-r2__eyebrow--light">TEMPO 3ML · {formatVnd(PRODUCT_CONFIG.price)}</p><h2>Đặt một chai.<br /><em>Giữ một nhịp.</em></h2><p>COD · Đóng gói kín đáo · V2JOY gọi xác nhận trước khi giao.</p><button type="button" className="tempo-r2__button" onClick={scrollToOrder}>ĐẶT TEMPO 3ML <ArrowRight size={18} /></button></section>
      <footer className="tempo-r2__footer"><span>© V2JOY VIỆT NAM</span><span>TEMPO 3ML · CHỈ DÙNG NGOÀI DA</span><a href="#top">LÊN ĐẦU TRANG</a></footer>
      <div className="tempo-r2__sticky"><div><span>TEMPO 3ML</span><b>{formatVnd(PRODUCT_CONFIG.price)}</b></div><button type="button" onClick={scrollToOrder}>ĐẶT COD <ShoppingBag size={17} /></button></div>
    </main>
  );
}
