import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, CircleCheck, Clock3, Leaf, LockKeyhole, Mail, Pause, Play, ShieldCheck, X } from "lucide-react";
import { trpc } from "@/lib/trpc";

const V2JOY_LOGO = "/manus-storage/v2joylogo-official_9302769f.webp";

const ASSETS = {
  heroPoster: "/manus-storage/tempo-h01-night-confident-hero_f68102f9.webp",
  signalHero: "/manus-storage/tempo-h02-teal-signal-hero_dc142bff.webp",
  pack3mlVerified: "/manus-storage/tempo-pack-3ml-verified_60cabc8e.png",
  pack5ml: "/manus-storage/tempo-pack-5ml-standalone-final_d1d4aa8e.webp",
  packDuoVerified: "/manus-storage/tempo-pack-duo-verified_5982e938.png",
  packCourse: "/manus-storage/tempo-pack-2x5ml-verified_bc1cb656.webp",
  lifestyleExit: "/manus-storage/tempo-lifestyle-01-exit-evening_334132f2.webp",
  lifestyleTogether: "/manus-storage/tempo-couple-03-kitchen-evening-woman-man_9c71be8e.png",
  lifestyleMorning: "/manus-storage/tempo-lifestyle-04-morning-return_a7805e20.webp",
  coupleKitchen: "/manus-storage/tempo-couple-03-kitchen-evening-woman-man_9c71be8e.png",
  coupleWalk: "/manus-storage/tempo-couple-04-walk-home-woman-man_8da9bbe8.png",
  ritualPreparation: "/manus-storage/tempo-ritual-01-quiet-preparation_c68f7133.webp",
  botanicalTraditional: "/manus-storage/tempo-botanical-01-traditional-herbarium_4de43fe9.jpg",
  botanicalExtraction: "/manus-storage/tempo-botanical-02-extraction-studio_16445f75.jpg",
  botanicalLedger: "/manus-storage/tempo-botanical-03-ingredient-ledger_0a16e037.jpg",
  botanicalNight: "/manus-storage/tempo-botanical-04-materials-night_67d7f994.jpg",
  infographicBotanical: "/manus-storage/tempo-infographic-03-botanical-index_5d3af3b9.png",
  infographicInci: "/manus-storage/tempo-infographic-04-inci-order_d4080563.png",
  infographicLabel: "/manus-storage/tempo-infographic-05-label-check_365134ff.png",
  motionReservation: "/manus-storage/tempo-motion-01-reservation_302dc7af.mp4",
  motionCarry: "/manus-storage/tempo-motion-02-carry_121f483d.mp4",
  motionCraft: "/manus-storage/tempo-motion-03-craft_c0137201.mp4",
  motionDate: "/manus-storage/tempo-motion-04-date-table_b2232978.mp4",
  motionHero: "/manus-storage/tempo-motion-05-duo-hero_0afbb738.mp4",
  realSizePhone: "/manus-storage/tempo-launch-3ml-real-size-phone_0fcb73c1.jpg",
  fineMist: "/manus-storage/tempo-launch-3ml-fine-mist_d0499407.jpg",
};

const productChoices = [
  { id: "3ml" as const, step: "01", name: "TEMPO 3ml", title: "Lô launch đầu tiên", note: "Chai 3ml nhỏ gọn cho khoảng 12–15 lần dùng theo hướng dẫn trên nhãn.", useCase: "1.000 chai đầu tiên — ưu tiên cho người muốn bắt đầu ngay.", image: ASSETS.pack3mlVerified },
];

const motionNotes = [
  { step: "02", title: "Mang theo", caption: "Một format nhỏ trong hành trang trước khi ra ngoài.", video: ASSETS.motionCarry, poster: ASSETS.pack3mlVerified, alt: "TEMPO 3ml có nhãn TEMPO rõ ràng" },
  { step: "03", title: "Đọc chất liệu", caption: "Đi từ thiết kế đến danh mục thông tin có thể đối chiếu.", video: ASSETS.motionCraft, poster: ASSETS.botanicalLedger, alt: "Sổ ghi thành phần và vật liệu thực vật theo phong cách đương đại" },
  { step: "04", title: "Đến cuộc hẹn", caption: "Một khung cảnh bình tĩnh, đặt sự có mặt lên trước mọi vội vàng.", video: ASSETS.motionDate, poster: ASSETS.lifestyleTogether, alt: "Không gian buổi tối ấm áp dành cho hai người trưởng thành" },
  { step: "05", title: "Giữ nhịp riêng", caption: "TEMPO 3ml gọn trong tay, sẵn sàng cho buổi tối bạn đã chọn.", video: ASSETS.motionHero, poster: ASSETS.pack3mlVerified, alt: "TEMPO 3ml với nhãn rõ ràng" },
] as const;

const ingredientInfographics = [
  { step: "01", image: ASSETS.infographicBotanical, alt: "Infographic TEMPO về chín chiết xuất thực vật trong danh mục INCI", title: "Bản đồ thành phần", copy: "Chín chiết xuất thực vật được gọi tên rõ ràng để bạn tự đọc, không phải để chúng tôi gán lời hứa riêng cho từng thành phần." },
  { step: "02", image: ASSETS.infographicInci, alt: "Infographic TEMPO hướng dẫn đọc công thức theo thứ tự công bố", title: "Thứ tự công bố", copy: "Công thức được trình bày theo danh mục INCI; thông tin công bố và nhãn thành phẩm luôn là điểm tham chiếu ưu tiên." },
  { step: "03", image: ASSETS.infographicLabel, alt: "Infographic TEMPO hướng dẫn đọc các thông tin chính trên nhãn sản phẩm", title: "Nhãn để đối chiếu", copy: "Tên sản phẩm, dung tích, INCI, số lô, NSX/HSD và hướng dẫn sử dụng là những điểm cần xem trước khi chọn." },
] as const;

const visualDiary = [
  { src: ASSETS.lifestyleExit, index: "01", kicker: "RỜI NGÀY DÀI", title: "Rời ngày dài" },
  { src: ASSETS.coupleWalk, index: "02", kicker: "TRÊN ĐƯỜNG VỀ", title: "Để lại khoảng vội" },
  { src: ASSETS.ritualPreparation, index: "03", kicker: "KHOẢNG DỪNG", title: "Chọn một điểm dừng" },
  { src: ASSETS.coupleKitchen, index: "04", kicker: "KHOẢNH KHẮC", title: "Có mặt cho nhau" },
  { src: ASSETS.lifestyleTogether, index: "05", kicker: "BUỔI TỐI", title: "Giữ nhịp vừa đủ" },
  { src: ASSETS.lifestyleMorning, index: "06", kicker: "TRỞ VỀ", title: "Mang nhịp về lại" },
] as const;

function goToWaitlist() {
  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Signal({ className = "" }: { className?: string }) {
  return <svg className={`signal ${className}`} viewBox="0 0 560 80" fill="none" aria-hidden="true"><path d="M0 43H58c30 0 29-23 56-23 29 0 25 43 56 43 33 0 25-35 56-35 35 0 23 30 58 30 29 0 27-20 57-20 27 0 30 13 56 13h56" /></svg>;
}

function SafeImage({ src, alt, className = "", fallback = ASSETS.heroPoster }: { src: string; alt: string; className?: string; fallback?: string }) {
  return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" onError={({ currentTarget }) => {
    if (currentTarget.dataset.fallbackApplied) return;
    currentTarget.dataset.fallbackApplied = "true";
    currentTarget.src = fallback;
  }} />;
}

function SectionVideoBackdrop({ video, poster, label }: { video: string; poster: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = videoRef.current;
    if (!element || reducedMotion) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) void element.play().catch(() => undefined);
      else element.pause();
    }, { threshold: 0.18 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion, video]);

  return <div className="section-video-backdrop" aria-hidden="true">
    <img src={poster} alt="" />
    {!reducedMotion && <video ref={videoRef} muted loop playsInline preload="metadata" poster={poster} aria-label={label} onError={({ currentTarget }) => { currentTarget.dataset.failed = "true"; }}>
      <source src={video} type="video/mp4" />
    </video>}
  </div>;
}

function V2JoyBadge({ className = "" }: { className?: string }) {
  return <span className={`v2joy-badge ${className}`}><img src={V2JOY_LOGO} alt="V2JOY" /></span>;
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);
  return reducedMotion;
}

function EditorialVideo() {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playbackState, setPlaybackState] = useState<"loading" | "playing" | "reduced" | "error">("loading");
  const [hasPlaybackError, setHasPlaybackError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;
    const startPlayback = () => {
      const playAttempt = video.play();
      if (!playAttempt) return;
      playAttempt.then(() => {
        if (!cancelled) {
          setHasPlaybackError(false);
          setPlaybackState("playing");
        }
      }).catch(() => {
        if (!cancelled) {
          setHasPlaybackError(true);
          setPlaybackState("error");
        }
      });
    };
    setHasPlaybackError(false);
    setPlaybackState("loading");
    video.addEventListener("canplay", startPlayback, { once: true });
    const retryTimer = window.setTimeout(startPlayback, 80);
    return () => {
      cancelled = true;
      window.clearTimeout(retryTimer);
      video.removeEventListener("canplay", startPlayback);
    };
  }, [reducedMotion]);

  return <div className="video-frame" data-playback-state={playbackState}>
    <img className="video-frame__fallback" src={ASSETS.heroPoster} alt="" aria-hidden="true" />
    <video ref={videoRef} autoPlay muted loop playsInline preload="auto" poster={ASSETS.heroPoster} data-motion-preference={reducedMotion ? "reduced" : "play"} aria-label="Video 01: khoảng dừng trước buổi tối" onPlaying={() => { setHasPlaybackError(false); setPlaybackState("playing"); }} onError={() => { setHasPlaybackError(true); setPlaybackState("error"); }}>
      <source src={ASSETS.motionReservation} type="video/mp4" />
    </video>
    {hasPlaybackError && <span className="sr-only">Video không thể phát; ảnh thay thế đang hiển thị.</span>}
    <div className="video-frame__wash" />
    <div className="video-frame__label"><span>CẢNH 01 / 05</span><span>KHOẢNH KHẮC BẮT ĐẦU</span></div>
  </div>;
}

function MotionCarousel() {
  const [activeMotion, setActiveMotion] = useState(0);
  const [playbackState, setPlaybackState] = useState<"loading" | "playing" | "paused" | "error">("loading");
  const [hasPlaybackError, setHasPlaybackError] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const active = motionNotes[activeMotion];

  const chooseSlide = (index: number) => {
    setPlaybackState("loading");
    setHasPlaybackError(false);
    setActiveMotion(index);
  };
  const changeSlide = (direction: -1 | 1) => chooseSlide((activeMotion + direction + motionNotes.length) % motionNotes.length);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setHasPlaybackError(false);
    if (reducedMotion || !autoAdvance) {
      video.pause();
      setPlaybackState("paused");
      return;
    }
    let cancelled = false;
    const startPlayback = () => {
      const playAttempt = video.play();
      if (!playAttempt) return;
      playAttempt.then(() => {
        if (!cancelled) setPlaybackState("playing");
      }).catch(() => {
        if (!cancelled) {
          setHasPlaybackError(true);
          setPlaybackState("error");
        }
      });
    };
    video.addEventListener("canplay", startPlayback, { once: true });
    const retryTimer = window.setTimeout(startPlayback, 100);
    return () => {
      cancelled = true;
      window.clearTimeout(retryTimer);
      video.removeEventListener("canplay", startPlayback);
    };
  }, [active.video, autoAdvance, reducedMotion]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (startX === null || endX === undefined || Math.abs(endX - startX) < 44) return;
    changeSlide(endX < startX ? 1 : -1);
  };

  return <section className="motion-carousel" aria-label="Bốn chương video tiếp theo của câu chuyện TEMPO" aria-roledescription="carousel">
    <div className="motion-carousel__masthead"><p className="overline">CÁCH TEMPO ĐI CÙNG BẠN</p><h2>Một buổi tối.<br /><em>Nhiều khoảnh khắc vừa đủ.</em></h2><p>Xem từng cảnh theo thứ tự hoặc tự chọn khoảnh khắc bạn muốn khám phá.</p></div>
    <div className="motion-carousel__timeline" role="tablist" aria-label="Timeline video TEMPO">
      {motionNotes.map((note, index) => <button key={note.step} type="button" role="tab" aria-selected={activeMotion === index} aria-label={`Chương ${note.step}: ${note.title}`} onClick={() => chooseSlide(index)}><span>{note.step}</span><i>{note.title}</i><b aria-hidden="true" /></button>)}
    </div>
    <div className="motion-carousel__stage" data-playback-state={reducedMotion ? "reduced-motion" : playbackState} data-swipe="enabled" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {(reducedMotion || hasPlaybackError) && <SafeImage src={active.poster} alt={active.alt} className="motion-carousel__fallback" />}
      <video ref={videoRef} key={active.video} autoPlay={autoAdvance && !reducedMotion} muted playsInline preload="auto" poster={active.poster} aria-label={`Video ${active.step}: ${active.title}`} onPlaying={() => setPlaybackState("playing")} onTimeUpdate={({ currentTarget }) => { if (!currentTarget.paused && currentTarget.currentTime > 0) setPlaybackState("playing"); }} onPause={() => { if (!hasPlaybackError) setPlaybackState("paused"); }} onEnded={() => { if (autoAdvance) changeSlide(1); }} onError={() => { setPlaybackState("error"); setHasPlaybackError(true); }}><source src={active.video} type="video/mp4" /></video>
      <div className="motion-carousel__wash" />
      <div className="motion-carousel__copy"><span>CHƯƠNG {active.step} / 05</span><h3>{active.title}</h3><p>{active.caption}</p><small>{playbackState === "playing" ? "Đang phát" : playbackState === "paused" ? "Đã tạm dừng" : "Đang chuẩn bị cảnh"}</small></div>
      <div className="motion-carousel__controls"><button type="button" aria-label="Xem cảnh trước" onClick={() => changeSlide(-1)}><ChevronLeft size={20} /></button><button type="button" aria-label={autoAdvance ? "Dừng tự phát" : "Tiếp tục tự phát"} aria-pressed={autoAdvance} onClick={() => setAutoAdvance(current => !current)}>{autoAdvance ? <Pause size={17} /> : <Play size={17} />}</button><button type="button" aria-label="Xem cảnh tiếp theo" onClick={() => changeSlide(1)}><ChevronRight size={20} /></button></div>
      <div className="motion-carousel__dots" aria-hidden="true">{motionNotes.map((note, index) => <span key={note.step} className={activeMotion === index ? "is-active" : ""} />)}</div>
    </div>
  </section>;
}

export default function Home() {
  const [quantity, setQuantity] = useState<1 | 2>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formResult, setFormResult] = useState<{ kind: "reserved" | "existing" | "full"; slot?: number; quantity?: number } | null>(null);
  const status = trpc.waitlist.status.useQuery(undefined, { staleTime: 30_000, retry: 1 });
  const join = trpc.waitlist.join.useMutation();
  const claimed = status.data?.claimed ?? 0;
  const remaining = status.data?.remaining ?? 1000;
  const totalValue = quantity * 349_000;

  useEffect(() => {
    if (remaining < quantity) setQuantity(1);
  }, [quantity, remaining]);

  function submitWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    join.mutate({ fullName: String(data.get("fullName") ?? ""), phone: String(data.get("phone") ?? ""), email: String(data.get("email") ?? ""), preferredSku: "3ml", quantity, note: String(data.get("note") ?? ""), marketingConsent: data.get("marketingConsent") === "on" }, {
      onSuccess: result => {
        setFormResult({ kind: result.kind, slot: result.entry?.slotNumber, quantity: result.kind === "reserved" ? result.quantity : result.entry?.quantity });
        if (result.kind === "reserved") {
          window.fbq?.("track", "Purchase", {
            value: result.totalValue,
            currency: "VND",
            content_ids: ["tempo-3ml"],
            content_type: "product",
            num_items: result.quantity,
          });
          form.reset();
        }
        void status.refetch();
      },
    });
  }

  return <div className="night-site">
    <header className="night-header">
      <a href="#top" className="brand" aria-label="TEMPO by V2JOY"><V2JoyBadge /><span className="tempo-wordmark">TEMPO</span><small>3ML / LÔ ĐẦU TIÊN</small></a>
      <div className="header-center"><span>TEMPO 3ml / lô đầu tiên</span><i /> <span>Còn {remaining.toLocaleString("vi-VN")} chai</span></div>
      <button type="button" onClick={goToWaitlist} className="header-cta">Giữ suất <ArrowUpRight size={15} /></button>
    </header>

    <main id="top">
      <section className="hero-night">
        <EditorialVideo />
        <div className="hero-wash" />
        <div className="hero-noise" />
        <div className="hero-copy">
          <p className="overline">V2JOY / TEMPO 3ML / LÔ ĐẦU TIÊN</p>
          <h1>Đêm nay,<br /><em>chọn sự chuẩn bị vừa đủ.</em></h1>
          <p className="hero-lead">TEMPO 3ml là chai xịt chăm sóc da nhỏ gọn cho những buổi tối bạn muốn chuẩn bị kỹ hơn. Lô đầu tiên gồm 1.000 chai, giá ra mắt 349.000đ/chai.</p>
          <div className="hero-actions"><button onClick={goToWaitlist} type="button" className="teal-button">Đăng ký mua TEMPO 3ml <ArrowDownRight size={18} /></button><a href="#story" className="ghost-link">Xem TEMPO đi cùng bạn <span>↓</span></a></div>
        </div>
        <div className="hero-counter"><b>{remaining.toLocaleString("vi-VN")}</b><span>chai 3ml<br />còn lại</span></div>
        <div className="hero-footer"><span>CẢNH 01 / 05</span><Signal /><span>TEMPO 3ML · LÔ ĐẦU TIÊN</span></div>
      </section>

      <section className="commerce-intro" id="story" aria-labelledby="why-title">
        <div><p className="chapter">VÌ SAO BẮT ĐẦU</p><p className="commerce-intro__eyebrow">TRƯỚC KHI NÓI VỀ SẢN PHẨM</p></div>
        <div><h2 id="why-title">Chuẩn bị kỹ hơn.<br /><em>Để buổi tối tự nhiên hơn.</em></h2><p>TEMPO dành cho người muốn có một bước chuẩn bị kín đáo trước cuộc hẹn. Một chai nhỏ, cách dùng rõ ràng và một lựa chọn không cần phô trương.</p></div>
        <div className="commerce-intro__side"><Clock3 size={20} /><p>TEMPO là một sản phẩm chăm sóc da cho bước chuẩn bị trước buổi tối — không thay thế sự kết nối, giao tiếp và đồng thuận giữa hai người.</p></div>
      </section>

      <section className="cinema-section cinema-section--lifestyle">
        <SectionVideoBackdrop video={ASSETS.motionCarry} poster={ASSETS.lifestyleExit} label="Video 02: TEMPO 3ml được mang theo trước khi ra ngoài" />
        <div className="cinema-section__copy"><p className="overline">CÁCH BẮT ĐẦU</p><h2>Chủ động chuẩn bị.<br /><em>Không cần nói quá.</em></h2><p>Giữ mọi thứ đơn giản: đọc nhãn, dùng đúng hướng dẫn và để tâm đến cảm giác của chính bạn cùng người bên cạnh.</p><span className="micro-note">ĐỌC NHÃN / DÙNG ĐÚNG HƯỚNG DẪN / TỰ QUYẾT ĐỊNH</span></div>
      </section>

      <section className="story-panel story-panel--pocket">
        <div className="story-image"><SafeImage src={ASSETS.pack3mlVerified} alt="TEMPO 3ml với nhãn TEMPO rõ ràng trên thân chai và hộp" /><span className="image-index">3ML / MANG THEO MỖI NGÀY</span></div>
        <div className="story-copy"><p className="overline overline--dark">TEMPO 3ML / MANG THEO</p><h2>Nhỏ để mang theo.<br /><em>Dễ bắt đầu.</em></h2><p>TEMPO 3ml là phiên bản duy nhất của lô ra mắt. Chai gọn, dễ cất trong túi và có hướng dẫn rõ ràng để bạn bắt đầu đúng cách.</p><button onClick={goToWaitlist} type="button" className="text-button">Đăng ký mua TEMPO 3ml <ArrowUpRight size={16} /></button></div>
      </section>

      <section className="ingredient-atlas" aria-labelledby="ingredient-atlas-title">
        <div className="ingredient-atlas__heading"><div><p className="overline overline--dark">ĐỌC TRƯỚC KHI CHỌN</p><h2 id="ingredient-atlas-title">Biết mình đang chọn gì.<br /><em>Trước khi dùng.</em></h2></div><p>Bạn có thể xem thành phần bằng hình ảnh, rồi đối chiếu lại bằng chữ trên INCI và nhãn thành phẩm trước khi quyết định.</p></div>
        <div className="ingredient-atlas__grid">{ingredientInfographics.map(item => <article key={item.step}><SafeImage src={item.image} alt={item.alt} /><div><span>{item.step} / THÀNH PHẦN</span><h3>{item.title}</h3><p>{item.copy}</p></div></article>)}</div>
        <div className="ingredient-atlas__claim"><Leaf size={20} /><p><b>Claim ghi nhãn:</b> “Giúp chăm sóc dưỡng ẩm da.” Không gán vùng trồng, nước xuất xứ hoặc công dụng riêng cho từng chiết xuất khi chưa có hồ sơ công khai xác nhận.</p></div>
      </section>

      <section className="transparency-protocol" id="nguon-goc" aria-labelledby="transparency-title">
        <div className="transparency-protocol__masthead"><div><p className="overline overline--dark">ĐỌC RÕ TRƯỚC KHI MUA</p><h2 id="transparency-title">Đọc rõ rồi chọn.<br /><em>Không cần đoán.</em></h2></div><p>TEMPO là mỹ phẩm. Những thông tin dưới đây giúp bạn hiểu sản phẩm trước khi đăng ký mua lô 3ml đầu tiên.</p></div>
        <div className="transparency-hero"><SectionVideoBackdrop video={ASSETS.motionCraft} poster={ASSETS.botanicalLedger} label="Video 03: chất liệu và thông tin TEMPO được đối chiếu" /><div className="transparency-hero__copy"><span>01 / THÀNH PHẦN</span><h3>Danh mục rõ ràng.<br /><em>Không cần đoán.</em></h3><p>INCI mở; thành phần có Alcohol (Ethanol), Butylene Glycol, chín chiết xuất thực vật, Sodium Benzoate và Panthenol.</p><a href="#inci-full" className="transparency-link">Xem INCI đầy đủ <ArrowDownRight size={16} /></a></div></div>
        <div className="transparency-steps">
          <article className="transparency-card transparency-card--origin"><SafeImage src={ASSETS.botanicalExtraction} alt="Không gian chiết xuất đương đại minh hoạ quy trình đối chiếu thông tin sản phẩm" /><div><span>02 / NƠI SẢN XUẤT</span><h3>Sản xuất tại<br /><em>Việt Nam.</em></h3><p><b>Công ty TNHH SX Công nghệ cao NANOFRANCE</b><br />KCN Đồng Văn IV, Ninh Bình.</p></div></article>
          <article className="transparency-card transparency-card--label"><SafeImage src={ASSETS.botanicalTraditional} alt="Vật liệu thực vật và giấy ghi chép minh hoạ bước đọc nhãn sản phẩm" /><div><span>03 / NHÃN SẢN PHẨM</span><h3>Đọc nhãn trước<br /><em>khi bắt đầu.</em></h3><p>Tên SKU · dung tích · INCI · số lô · NSX/HSD · hướng dẫn.</p></div></article>
          <article className="transparency-card transparency-card--proof"><SafeImage src={ASSETS.botanicalNight} alt="Tĩnh vật thảo mộc trong ánh sáng teal dịu minh hoạ nguyên tắc minh bạch hồ sơ" /><div><span>04 / HỒ SƠ CÔNG KHAI</span><h3>Hồ sơ mở bán<br /><em>được cập nhật.</em></h3><p>Nhãn thành phẩm và hồ sơ chính thức tại thời điểm mở bán là nguồn thông tin áp dụng ưu tiên.</p></div></article>
        </div>
        <div className="transparency-inci" id="inci-full"><div><span>DANH SÁCH THÀNH PHẦN / INCI</span><h3>Toàn bộ tên thành phần<br /><em>theo danh mục công bố.</em></h3></div><details><summary>Xem tên thành phần <ChevronDown size={16} /></summary><p>Purified Water, Alcohol (Ethanol), Butylene Glycol, Cnidium monnieri extract, Zanthoxylum bungeanum extract, Sophora flavescens extract, Polygonatum sibiricum extract, Eucommia ulmoides extract, Cynomorium songaricum extract, Epimedium brevicornum extract, Verbena officinalis extract, Morinda officinalis extract, Sodium Benzoate, Panthenol.</p></details></div>
        <div className="transparency-safety"><LockKeyhole size={20} /><div><b>Đọc kỹ trước khi dùng.</b><p>Chỉ dùng ngoài da. Thử lượng nhỏ ở mặt trong cổ tay trước lần đầu; ngưng dùng nếu có biểu hiện không phù hợp. Đối chiếu cảnh báo trên nhãn thành phẩm trước khi chọn.</p></div><button type="button" onClick={goToWaitlist} className="text-button">Nhận thông tin mở bán <ArrowUpRight size={16} /></button></div>
      </section>

      <section className="product-protocol" aria-labelledby="protocol-title">
        <div className="product-protocol__heading"><p className="overline">CÁCH DÙNG VÀ LƯU Ý</p><h2 id="protocol-title">Dùng đúng hướng dẫn.<br /><em>Chăm sóc da vừa đủ.</em></h2><p>Hãy đọc nhãn thành phẩm trước khi dùng và làm theo hướng dẫn chính thức đi kèm sản phẩm.</p></div>
        <div className="product-protocol__steps">
          <article><span>01</span><h3>Vệ sinh và lắc đều</h3><p>Vệ sinh sạch vùng da cần chăm sóc, sau đó lắc đều chai.</p></article>
          <article><span>02</span><h3>Giữ khoảng cách phù hợp</h3><p>Để chai cách vùng da khoảng 3–5cm và xịt lượng vừa đủ, khoảng 2–3 lần.</p></article>
          <article><span>03</span><h3>Massage nhẹ</h3><p>Massage nhẹ khoảng 1–2 phút để sản phẩm thẩm thấu.</p></article>
          <article><span>04</span><h3>Đọc cảnh báo</h3><p>Có thể rửa lại bằng nước sạch nếu cần. Không dùng khi da đang trầy xước, viêm hoặc tổn thương.</p></article>
        </div>
        <div className="product-protocol__footer"><ShieldCheck size={20} /><p><b>TEMPO là mỹ phẩm, không phải thuốc.</b> Sản phẩm không thay thế hướng dẫn chuyên môn hoặc thuốc chữa bệnh.</p></div>
      </section>

      <section className="real-size-section" aria-labelledby="real-size-title"><div className="real-size-section__heading"><p className="overline overline--dark">NHÌN THẤY KÍCH THƯỚC THẬT</p><h2 id="real-size-title">Nhỏ gọn để<br /><em>mang theo.</em></h2><p>Chai TEMPO 3ml được đặt cạnh điện thoại để bạn hình dung kích thước trong tay và trong túi. Số lần dùng phụ thuộc lượng dùng theo hướng dẫn trên nhãn.</p></div><div className="real-size-section__grid"><figure><SafeImage src={ASSETS.realSizePhone} alt="Chai TEMPO 3ml đặt cạnh điện thoại để minh họa kích thước thực tế" /><figcaption>01 / KÍCH THƯỚC THỰC TẾ</figcaption></figure><figure><SafeImage src={ASSETS.fineMist} alt="Chai TEMPO 3ml phun màn sương mịn trong studio" /><figcaption>02 / MÀN SƯƠNG MỊN</figcaption></figure></div></section>\n\n      <section className="product-block" id="san-pham">
        <div className="product-block__top"><div><p className="overline overline--dark">TEMPO 3ML / LÔ RA MẮT</p><h2>Một phiên bản.<br /><em>Một quyết định dễ hơn.</em></h2></div><p>Lô ra mắt chỉ có TEMPO 3ml, giá 349.000đ/chai. Chỉ 1.000 chai đầu tiên được mở bán trong đợt này.</p></div>
        <div className="format-grid">{productChoices.map(item => <article className="format-card" key={item.id}><div className="format-card__image"><SafeImage src={item.image} alt={`Packshot ${item.name} có nhãn TEMPO rõ ràng`} /></div><div className="format-card__copy"><span>{item.step} / {item.name}</span><h3>{item.title}</h3><p>{item.note}</p><small>{item.useCase}</small><button type="button" onClick={goToWaitlist}>Đăng ký mua {item.name} <ArrowUpRight size={15} /></button></div></article>)}</div>
      </section>

      <section className="motion-bridge" aria-label="Video 04: khoảnh khắc hẹn hò của TEMPO">
        <SectionVideoBackdrop video={ASSETS.motionDate} poster={ASSETS.lifestyleTogether} label="Video 04: một khoảnh khắc buổi tối dành cho hai người trưởng thành" />
        <div className="motion-bridge__copy"><span>CẢNH 04 / 05</span><h2>Đến cuộc hẹn.<br /><em>Giữ nhịp vừa đủ.</em></h2></div>
      </section>

      <section className="visual-proof" aria-label="Mạch hình ảnh Night Confident">
        <div className="visual-proof__heading"><p className="overline">6 KHOẢNH KHẮC TRONG ĐỜI SỐNG</p><h2>Không chỉ một ảnh.<br /><em>Mà là cả một buổi tối.</em></h2><p>Sáu khung hình nối nhau để kể bối cảnh; sản phẩm chỉ xuất hiện khi nó thật sự liên quan đến lựa chọn của bạn.</p></div>
        <div className="gallery-grid gallery-grid--diary">{visualDiary.map(frame => <figure key={frame.index}><SafeImage src={frame.src} alt={`${frame.index} / ${frame.kicker} — ${frame.title}`} /><div className="gallery-grid__copy"><span>{frame.index} / {frame.kicker}</span><h3>{frame.title}</h3></div></figure>)}</div>
      </section>

      <section className="waitlist-section" id="waitlist">
        <div className="waitlist-cinema"><SectionVideoBackdrop video={ASSETS.motionHero} poster={ASSETS.lifestyleTogether} label="Video 05: TEMPO 3ml khép lại câu chuyện buổi tối" /><div className="waitlist-cinema__wash" /><div className="waitlist-cinema__copy"><p className="overline">CẢNH 05 / 05 · 1.000 CHAI TEMPO 3ML</p><h2>Lô đầu tiên<br /><em>đã sẵn sàng.</em></h2><p>Đăng ký để nhận thông tin mua, giao hàng và số lượng còn lại của phiên bản 3ml.</p></div></div>
        <div className="waitlist-form-wrap"><div className="waitlist-topline"><span>NHẬN THÔNG TIN MUA / TEMPO 3ML</span><span>{claimed.toLocaleString("vi-VN")} / 1.000 chai đã được giữ</span></div><h2>Giữ quyền mua<br />TEMPO 3ml.</h2><p className="form-intro">Đăng ký để được liên hệ xác nhận mua TEMPO 3ml. Mỗi lượt có thể giữ tối đa 2 chai, tùy số lượng còn lại. Đây chưa phải thanh toán; V2JOY sẽ liên hệ theo thứ tự đăng ký về giao hàng. Giá ra mắt: 349.000đ/chai.</p>
          <form className="waitlist-form" onSubmit={submitWaitlist}>
            <div className="launch-product-summary"><img src={ASSETS.pack3mlVerified} alt="" loading="lazy" /><div><span>TEMPO 3ml</span><small>349.000đ / chai · lô thử nghiệm đầu tiên</small></div></div>
            <fieldset className="quantity-choice" aria-describedby="quantity-total"><legend>Chọn số lượng</legend><div role="radiogroup" aria-label="Chọn số lượng TEMPO 3ml">{([1, 2] as const).map(option => <button key={option} type="button" role="radio" aria-checked={quantity === option} disabled={remaining < option} onClick={() => setQuantity(option)} className={quantity === option ? "is-active" : ""}><span>{option} chai</span><small>{(option * 349_000).toLocaleString("vi-VN")}đ</small></button>)}</div><p id="quantity-total">Tổng dự kiến: <b>{totalValue.toLocaleString("vi-VN")}đ</b> · số lượng còn lại: {remaining.toLocaleString("vi-VN")} chai.</p></fieldset>
            <label>Họ và tên<input name="fullName" required autoComplete="name" placeholder="Tên của bạn" /></label>
            <label>Số điện thoại<input name="phone" required inputMode="tel" autoComplete="tel" placeholder="0xxxxxxxxx" /></label>
            <label>Email <em>(không bắt buộc)</em><input name="email" type="email" autoComplete="email" placeholder="ban@email.com" /></label>
            <label>Lời nhắn <em>(không bắt buộc)</em><textarea name="note" rows={3} maxLength={500} placeholder="Ví dụ: thời gian liên hệ phù hợp" /></label>
            <label className="consent"><input name="marketingConsent" type="checkbox" required /><span>Tôi đồng ý để V2JOY lưu thông tin và liên hệ về việc mua TEMPO 3ml. Tôi có thể yêu cầu xóa thông tin bất kỳ lúc nào.</span></label>
            {join.error && <p className="form-error"><X size={15} /> {join.error.message}</p>}
            {formResult && <div aria-live="polite" className={`form-result form-result--${formResult.kind}`}>{formResult.kind === "full" ? <><X size={17} /><span>Số chai còn lại không đủ cho lựa chọn này. V2JOY sẽ cập nhật đợt tiếp theo khi lô đầu tiên đã đủ.</span></> : <><Check size={17} /><span>{formResult.kind === "existing" ? "Số điện thoại này đã được ghi nhận" : `Bạn đã được ghi nhận quyền mua ${formResult.quantity} chai`}{formResult.slot ? ` · Suất ${String(formResult.slot).padStart(4, "0")}` : ""}.</span></>}</div>}
            <button className="submit-button" disabled={join.isPending || remaining < quantity} type="submit">{join.isPending ? "Đang giữ số lượng…" : remaining < quantity ? "Số lượng còn lại không đủ" : `Giữ ${quantity} chai · ${totalValue.toLocaleString("vi-VN")}đ`}<ArrowUpRight size={18} /></button>
          </form><p className="data-note"><Mail size={14} /> Không yêu cầu địa chỉ hay thanh toán ở bước này. Thông tin chỉ dùng để liên hệ về TEMPO.</p>
        </div>
      </section>

      <section className="faq-section"><div><p className="overline overline--dark">ĐIỀU BẠN CẦN BIẾT</p><h2>Biết trước,<br /><em>chọn kỹ hơn.</em></h2></div><div className="faq-list">{[
        ["Đây có phải đơn đặt hàng đã xác nhận không?", "Chưa. Đây là danh sách chờ để V2JOY liên hệ khi có thông tin mở bán và điều kiện đặt hàng chính thức."],
        ["TEMPO có công dụng gì theo thông tin công bố?", "Claim ghi nhãn là: “Giúp chăm sóc dưỡng ẩm da.” TEMPO là mỹ phẩm, không phải thuốc."],
        ["Tôi có thể kiểm tra thành phần ở đâu?", "Bạn có thể xem danh mục INCI đầy đủ trên trang. Nhãn thành phẩm và hồ sơ chính thức tại thời điểm mở bán là nguồn thông tin áp dụng ưu tiên."],
        ["Tôi cần lưu ý gì trước khi dùng?", "Chỉ dùng ngoài da. Thử lượng nhỏ ở mặt trong cổ tay trước lần đầu; ngưng dùng nếu có biểu hiện không phù hợp. Không dùng khi da đang trầy xước, viêm hoặc tổn thương."],
        ["Hình ảnh và video trên trang đã là sản phẩm thật chưa?", "Đây là bộ concept visual và video cho giai đoạn đăng ký hàng chờ. Nhãn thành phẩm, màu sắc và thông tin chính thức cần được đối chiếu tại thời điểm mở bán."],
      ].map(([question, answer], index) => <article key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{String(index + 1).padStart(2, "0")}</span><b>{question}</b><ChevronDown size={18} /></button>{openFaq === index && <p>{answer}</p>}</article>)}</div></section>
    </main>
    <footer><div className="footer-brand"><V2JoyBadge /><span>TEMPO</span></div><p>Night Confident · đăng ký hàng chờ trước mở bán</p><p>Sản phẩm là mỹ phẩm, không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.</p></footer>
    <div className="mobile-sticky"><div><span>{remaining.toLocaleString("vi-VN")} chai còn lại</span><b>TEMPO / WAITLIST</b></div><button type="button" onClick={goToWaitlist}>Giữ chai <ArrowUpRight size={16} /></button></div>
  </div>;
}
