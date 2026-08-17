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
  lifestyleTogether: "/manus-storage/tempo-lifestyle-03-together-at-home_2ee3a59f.webp",
  lifestyleMorning: "/manus-storage/tempo-lifestyle-04-morning-return_a7805e20.webp",
  coupleKitchen: "/manus-storage/tempo-couple-01-kitchen-evening_df318ac9.webp",
  coupleWalk: "/manus-storage/tempo-couple-02-walk-home_e372d5a3.webp",
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
};

type PreferredSku = "3ml" | "5ml" | "duo" | "course-2x5ml";

const productChoices = [
  { id: "3ml" as const, step: "01", name: "TEMPO 3ml", title: "Nhịp làm quen", note: "Format gọn để bắt đầu tìm hiểu sản phẩm.", useCase: "Dành cho lần đầu cân nhắc TEMPO.", image: ASSETS.pack3mlVerified },
  { id: "5ml" as const, step: "02", name: "TEMPO 5ml", title: "Nhịp đều đặn", note: "Format đầy đủ cho routine chăm sóc riêng tư.", useCase: "Dành cho người ưu tiên format chủ lực.", image: ASSETS.pack5ml },
  { id: "duo" as const, step: "03", name: "TEMPO Duo", title: "Ở nhà, đi xa", note: "Một 3ml mang theo, một 5ml cho không gian ở nhà.", useCase: "Dành cho hai bối cảnh sử dụng khác nhau.", image: ASSETS.packDuoVerified },
  { id: "course-2x5ml" as const, step: "04", name: "TEMPO 2×5ml", title: "Nhịp quay lại", note: "Hai chai 5ml trong lựa chọn đầy đủ hơn.", useCase: "Dành cho người muốn nhận thông tin về bundle.", image: ASSETS.packCourse },
];

const motionNotes = [
  { step: "02", title: "Mang theo", caption: "Một format nhỏ trong hành trang trước khi ra ngoài.", video: ASSETS.motionCarry, poster: ASSETS.pack3mlVerified, alt: "TEMPO 3ml có nhãn TEMPO rõ ràng" },
  { step: "03", title: "Đọc chất liệu", caption: "Đi từ thiết kế đến danh mục thông tin có thể đối chiếu.", video: ASSETS.motionCraft, poster: ASSETS.botanicalLedger, alt: "Sổ ghi thành phần và vật liệu thực vật theo phong cách đương đại" },
  { step: "04", title: "Đến cuộc hẹn", caption: "Một khung cảnh bình tĩnh, đặt sự có mặt lên trước mọi vội vàng.", video: ASSETS.motionDate, poster: ASSETS.lifestyleTogether, alt: "Không gian buổi tối ấm áp dành cho hai người trưởng thành" },
  { step: "05", title: "Chọn hệ nhịp", caption: "3ml và 5ml cho những bối cảnh riêng trong cùng một ritual.", video: ASSETS.motionHero, poster: ASSETS.packDuoVerified, alt: "TEMPO Duo với nhãn rõ ràng" },
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
    if (reducedMotion) {
      video.pause();
      setPlaybackState("reduced");
      return;
    }
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
  const [preferredSku, setPreferredSku] = useState<PreferredSku>("5ml");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formResult, setFormResult] = useState<{ kind: "reserved" | "existing" | "full"; slot?: number } | null>(null);
  const status = trpc.waitlist.status.useQuery(undefined, { staleTime: 30_000, retry: 1 });
  const join = trpc.waitlist.join.useMutation();
  const claimed = status.data?.claimed ?? 0;
  const remaining = status.data?.remaining ?? 1000;

  function submitWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    join.mutate({ fullName: String(data.get("fullName") ?? ""), phone: String(data.get("phone") ?? ""), email: String(data.get("email") ?? ""), preferredSku, note: String(data.get("note") ?? ""), marketingConsent: data.get("marketingConsent") === "on" }, {
      onSuccess: result => {
        setFormResult({ kind: result.kind, slot: result.entry?.slotNumber });
        if (result.kind === "reserved") form.reset();
        void status.refetch();
      },
    });
  }

  return <div className="night-site">
    <header className="night-header">
      <a href="#top" className="brand" aria-label="TEMPO by V2JOY"><V2JoyBadge /><span className="tempo-wordmark">TEMPO</span><small>ĐĂNG KÝ NHẬN TIN / 01</small></a>
      <div className="header-center"><span>5 cảnh trong một buổi tối</span><i /> <span>Danh sách chờ 01.000</span></div>
      <button type="button" onClick={goToWaitlist} className="header-cta">Giữ suất <ArrowUpRight size={15} /></button>
    </header>

    <main id="top">
      <section className="hero-night">
        <EditorialVideo />
        <div className="hero-wash" />
        <div className="hero-noise" />
        <div className="hero-copy">
          <p className="overline">V2JOY / TEMPO / CẢNH 01</p>
          <h1>Đêm nay,<br /><em>bạn chọn một nhịp khác.</em></h1>
          <p className="hero-lead">Một lựa chọn chăm sóc kín đáo, bắt đầu từ việc dành thời gian cho điều quan trọng.</p>
          <div className="hero-actions"><button onClick={goToWaitlist} type="button" className="teal-button">Vào danh sách chờ <ArrowDownRight size={18} /></button><a href="#story" className="ghost-link">Xem câu chuyện 01 → 05 <span>↓</span></a></div>
        </div>
        <div className="hero-counter"><b>{remaining.toLocaleString("vi-VN")}</b><span>lời mời đầu tiên<br />còn mở</span></div>
        <div className="hero-footer"><span>CẢNH 01 / 05</span><Signal /><span>TEMPO 3ML · 5ML</span></div>
      </section>

      <section className="commerce-intro" id="story" aria-labelledby="why-title">
        <div><p className="chapter">VÌ SAO BẮT ĐẦU</p><p className="commerce-intro__eyebrow">TRƯỚC KHI NÓI VỀ SẢN PHẨM</p></div>
        <div><h2 id="why-title">Bớt một nhịp vội.<br /><em>Thêm một điều có mặt.</em></h2><p>V2JOY bắt đầu từ niềm tin rằng một cuộc hẹn đáng nhớ không cần phô trương. Nó cần sự chỉn chu, một khoảng dừng và sự quan tâm dành cho cả hai người.</p></div>
        <div className="commerce-intro__side"><Clock3 size={20} /><p>TEMPO là một phần trong nghi thức chăm sóc trước buổi tối — không phải một lời hứa thay thế cho sự kết nối.</p></div>
      </section>

      <section className="cinema-section cinema-section--lifestyle">
        <SafeImage src={ASSETS.lifestyleExit} alt="Lối ra căn hộ trong ánh chiều, gợi khoảnh khắc rời ngày dài" className="cinema-section__image" />
        <div className="cinema-section__copy"><p className="overline">CÁCH BẮT ĐẦU</p><h2>Một khoảng dừng.<br /><em>Một ý định rõ.</em></h2><p>Không đưa sự vội vàng vào một buổi tối dành cho hai người. Hãy bắt đầu bằng những điều nhỏ mà bạn có thể chủ động chuẩn bị.</p><span className="micro-note">TỰ CHỌN NHỊP / TỰ ĐỌC THÔNG TIN / TỰ QUYẾT ĐỊNH</span></div>
      </section>

      <section className="story-panel story-panel--pocket">
        <div className="story-image"><SafeImage src={ASSETS.pack3mlVerified} alt="TEMPO 3ml với nhãn TEMPO rõ ràng trên thân chai và hộp" /><span className="image-index">3ML / MANG THEO MỖI NGÀY</span></div>
        <div className="story-copy"><p className="overline overline--dark">TEMPO 3ML / MANG THEO</p><h2>Nhỏ để mang theo.<br /><em>Rõ để tự chọn.</em></h2><p>TEMPO 3ml là format gọn cho người muốn bắt đầu tìm hiểu. Bạn có thể chọn mối quan tâm trong form và đợi thông tin mở bán chính thức.</p><button onClick={() => { setPreferredSku("3ml"); goToWaitlist(); }} type="button" className="text-button">Quan tâm TEMPO 3ml <ArrowUpRight size={16} /></button></div>
      </section>

      <MotionCarousel />

      <section className="ingredient-atlas" aria-labelledby="ingredient-atlas-title">
        <div className="ingredient-atlas__heading"><div><p className="overline overline--dark">THÀNH PHẦN DỄ ĐỌC</p><h2 id="ingredient-atlas-title">Thảo dược có thể xem.<br /><em>Thông tin có thể đọc.</em></h2></div><p>Chúng tôi trình bày thành phần bằng hình ảnh để dễ tiếp cận hơn, nhưng luôn giữ phần quan trọng nhất ở chữ: danh mục INCI, nhãn thành phẩm và hồ sơ chính thức.</p></div>
        <div className="ingredient-atlas__grid">{ingredientInfographics.map(item => <article key={item.step}><SafeImage src={item.image} alt={item.alt} /><div><span>{item.step} / THÀNH PHẦN</span><h3>{item.title}</h3><p>{item.copy}</p></div></article>)}</div>
        <div className="ingredient-atlas__claim"><Leaf size={20} /><p><b>Claim ghi nhãn:</b> “Giúp chăm sóc dưỡng ẩm da.” Không gán vùng trồng, nước xuất xứ hoặc công dụng riêng cho từng chiết xuất khi chưa có hồ sơ công khai xác nhận.</p></div>
      </section>

      <section className="transparency-protocol" id="nguon-goc" aria-labelledby="transparency-title">
        <div className="transparency-protocol__masthead"><div><p className="overline overline--dark">MINH BẠCH TRƯỚC KHI CHỌN</p><h2 id="transparency-title">Không cần tin vội.<br /><em>Hãy đọc cùng chúng tôi.</em></h2></div><p>TEMPO là mỹ phẩm. Mọi thông tin dưới đây được trình bày để bạn tự đối chiếu trước khi đăng ký nhận tin mở bán.</p></div>
        <div className="transparency-hero"><SafeImage src={ASSETS.botanicalLedger} alt="Sổ ghi chép thành phần và vật liệu thực vật minh hoạ nguyên tắc đối chiếu công thức" /><div className="transparency-hero__copy"><span>01 / THÀNH PHẦN</span><h3>Danh mục rõ ràng.<br /><em>Không cần đoán.</em></h3><p>INCI mở; thành phần có Alcohol (Ethanol), Butylene Glycol, chín chiết xuất thực vật, Sodium Benzoate và Panthenol.</p><a href="#inci-full" className="transparency-link">Xem INCI đầy đủ <ArrowDownRight size={16} /></a></div></div>
        <div className="transparency-steps">
          <article className="transparency-card transparency-card--origin"><SafeImage src={ASSETS.botanicalExtraction} alt="Không gian chiết xuất đương đại minh hoạ quy trình đối chiếu thông tin sản phẩm" /><div><span>02 / NƠI SẢN XUẤT</span><h3>Sản xuất tại<br /><em>Việt Nam.</em></h3><p><b>Công ty TNHH SX Công nghệ cao NANOFRANCE</b><br />KCN Đồng Văn IV, Ninh Bình.</p></div></article>
          <article className="transparency-card transparency-card--label"><SafeImage src={ASSETS.botanicalTraditional} alt="Vật liệu thực vật và giấy ghi chép minh hoạ bước đọc nhãn sản phẩm" /><div><span>03 / NHÃN SẢN PHẨM</span><h3>Đọc nhãn trước<br /><em>khi bắt đầu.</em></h3><p>Tên SKU · dung tích · INCI · số lô · NSX/HSD · hướng dẫn.</p></div></article>
          <article className="transparency-card transparency-card--proof"><SafeImage src={ASSETS.botanicalNight} alt="Tĩnh vật thảo mộc trong ánh sáng teal dịu minh hoạ nguyên tắc minh bạch hồ sơ" /><div><span>04 / HỒ SƠ CÔNG KHAI</span><h3>Hồ sơ mở bán<br /><em>được cập nhật.</em></h3><p>Nhãn thành phẩm và hồ sơ chính thức tại thời điểm mở bán là nguồn thông tin áp dụng ưu tiên.</p></div></article>
        </div>
        <div className="transparency-inci" id="inci-full"><div><span>DANH SÁCH THÀNH PHẦN / INCI</span><h3>Toàn bộ tên thành phần<br /><em>theo danh mục công bố.</em></h3></div><details><summary>Xem tên thành phần <ChevronDown size={16} /></summary><p>Purified Water, Alcohol (Ethanol), Butylene Glycol, Cnidium monnieri extract, Zanthoxylum bungeanum extract, Sophora flavescens extract, Polygonatum sibiricum extract, Eucommia ulmoides extract, Cynomorium songaricum extract, Epimedium brevicornum extract, Verbena officinalis extract, Morinda officinalis extract, Sodium Benzoate, Panthenol.</p></details></div>
        <div className="transparency-safety"><LockKeyhole size={20} /><div><b>Đọc kỹ trước khi dùng.</b><p>Chỉ dùng ngoài da. Thử lượng nhỏ ở mặt trong cổ tay trước lần đầu; ngưng dùng nếu có biểu hiện không phù hợp. Đối chiếu cảnh báo trên nhãn thành phẩm trước khi chọn.</p></div><button type="button" onClick={goToWaitlist} className="text-button">Nhận thông tin mở bán <ArrowUpRight size={16} /></button></div>
      </section>

      <section className="product-protocol" aria-labelledby="protocol-title">
        <div className="product-protocol__heading"><p className="overline">CÁCH DÙNG VÀ LƯU Ý</p><h2 id="protocol-title">Một cách chuẩn bị rõ ràng.<br /><em>Không cần nói quá.</em></h2><p>Hướng dẫn dưới đây là nội dung công bố trên nhãn. Luôn đọc nhãn thành phẩm và thực hiện theo thông tin được cập nhật chính thức.</p></div>
        <div className="product-protocol__steps">
          <article><span>01</span><h3>Vệ sinh và lắc đều</h3><p>Vệ sinh sạch vùng da cần chăm sóc, sau đó lắc đều chai.</p></article>
          <article><span>02</span><h3>Giữ khoảng cách phù hợp</h3><p>Để chai cách vùng da khoảng 3–5cm và xịt lượng vừa đủ, khoảng 2–3 lần.</p></article>
          <article><span>03</span><h3>Massage nhẹ</h3><p>Massage nhẹ khoảng 1–2 phút để sản phẩm thẩm thấu.</p></article>
          <article><span>04</span><h3>Đọc cảnh báo</h3><p>Có thể rửa lại bằng nước sạch nếu cần. Không dùng khi da đang trầy xước, viêm hoặc tổn thương.</p></article>
        </div>
        <div className="product-protocol__footer"><ShieldCheck size={20} /><p><b>TEMPO là mỹ phẩm, không phải thuốc.</b> Sản phẩm không thay thế hướng dẫn chuyên môn hoặc thuốc chữa bệnh.</p></div>
      </section>

      <section className="product-block" id="san-pham">
        <div className="product-block__top"><div><p className="overline overline--dark">CHỌN QUY CÁCH</p><h2>Chọn format<br /><em>đi cùng bối cảnh.</em></h2></div><p>Bốn lựa chọn dưới đây giúp bạn cho V2JOY biết format mình quan tâm. Đây chưa phải đơn hàng hay thông báo giá cuối cùng.</p></div>
        <div className="format-grid">{productChoices.map(item => <article className="format-card" key={item.id}><div className="format-card__image"><SafeImage src={item.image} alt={`Packshot ${item.name} có nhãn TEMPO rõ ràng`} /></div><div className="format-card__copy"><span>{item.step} / {item.name}</span><h3>{item.title}</h3><p>{item.note}</p><small>{item.useCase}</small><button type="button" onClick={() => { setPreferredSku(item.id); goToWaitlist(); }}>Quan tâm {item.name} <ArrowUpRight size={15} /></button></div></article>)}</div>
      </section>

      <section className="visual-proof" aria-label="Mạch hình ảnh Night Confident">
        <div className="visual-proof__heading"><p className="overline">6 KHOẢNH KHẮC TRONG ĐỜI SỐNG</p><h2>Không chỉ một ảnh.<br /><em>Mà là cả một buổi tối.</em></h2><p>Sáu khung hình nối nhau để kể bối cảnh; sản phẩm chỉ xuất hiện khi nó thật sự liên quan đến lựa chọn của bạn.</p></div>
        <div className="gallery-grid gallery-grid--diary">{visualDiary.map(frame => <figure key={frame.index}><SafeImage src={frame.src} alt={`${frame.index} / ${frame.kicker} — ${frame.title}`} /><div className="gallery-grid__copy"><span>{frame.index} / {frame.kicker}</span><h3>{frame.title}</h3></div></figure>)}</div>
      </section>

      <section className="waitlist-section" id="waitlist">
        <div className="waitlist-cinema"><SafeImage src={ASSETS.lifestyleTogether} alt="Không gian riêng tư, ấm áp cho một buổi tối có chủ đích" /><div className="waitlist-cinema__wash" /><div className="waitlist-cinema__copy"><p className="overline">1.000 SUẤT ĐẦU TIÊN</p><h2>Danh sách chờ<br /><em>đã mở.</em></h2><p>Chọn format bạn quan tâm. V2JOY chỉ liên hệ khi có thông tin mở bán chính thức.</p></div></div>
        <div className="waitlist-form-wrap"><div className="waitlist-topline"><span>ĐĂNG KÝ HÀNG CHỜ / 01</span><span>{claimed.toLocaleString("vi-VN")} / 1.000 đã ghi nhận</span></div><h2>Giữ một suất<br />cho nhịp của bạn.</h2><p className="form-intro">Đây là đăng ký hàng chờ, chưa phải thanh toán hay xác nhận đặt hàng. Thông tin của bạn được dùng để V2JOY liên hệ về đợt mở bán TEMPO.</p>
          <form className="waitlist-form" onSubmit={submitWaitlist}>
            <div className="sku-choice" role="radiogroup" aria-label="Chọn format TEMPO quan tâm">{productChoices.map(item => <button key={item.id} type="button" role="radio" aria-checked={preferredSku === item.id} onClick={() => setPreferredSku(item.id)} className={preferredSku === item.id ? "is-active" : ""}><img src={item.image} alt="" loading="lazy" /><span>{item.name}</span><small>{item.title}</small></button>)}</div>
            <label>Họ và tên<input name="fullName" required autoComplete="name" placeholder="Tên của bạn" /></label>
            <label>Số điện thoại<input name="phone" required inputMode="tel" autoComplete="tel" placeholder="0xxxxxxxxx" /></label>
            <label>Email <em>(không bắt buộc)</em><input name="email" type="email" autoComplete="email" placeholder="ban@email.com" /></label>
            <label>Lời nhắn <em>(không bắt buộc)</em><textarea name="note" rows={3} maxLength={500} placeholder="Ví dụ: thời gian liên hệ phù hợp" /></label>
            <label className="consent"><input name="marketingConsent" type="checkbox" required /><span>Tôi đồng ý để V2JOY lưu thông tin và liên hệ về danh sách chờ TEMPO. Tôi có thể yêu cầu xóa thông tin bất kỳ lúc nào.</span></label>
            {join.error && <p className="form-error"><X size={15} /> {join.error.message}</p>}
            {formResult && <div aria-live="polite" className={`form-result form-result--${formResult.kind}`}>{formResult.kind === "full" ? <><X size={17} /><span>Danh sách 1.000 suất hiện đã đủ. V2JOY sẽ cập nhật đợt tiếp theo.</span></> : <><Check size={17} /><span>{formResult.kind === "existing" ? "Số điện thoại này đã có trong danh sách chờ" : "Bạn đã được ghi nhận vào danh sách chờ"}{formResult.slot ? ` · Suất ${String(formResult.slot).padStart(4, "0")}` : ""}.</span></>}</div>}
            <button className="submit-button" disabled={join.isPending || remaining === 0} type="submit">{join.isPending ? "Đang giữ suất…" : remaining === 0 ? "Danh sách đã đủ" : "Giữ suất hàng chờ"}<ArrowUpRight size={18} /></button>
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
    <div className="mobile-sticky"><div><span>{remaining.toLocaleString("vi-VN")} suất đầu</span><b>TEMPO / WAITLIST</b></div><button type="button" onClick={goToWaitlist}>Giữ suất <ArrowUpRight size={16} /></button></div>
  </div>;
}
