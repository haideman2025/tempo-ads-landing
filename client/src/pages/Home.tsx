import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight, Clock3, LockKeyhole, Mail, X } from "lucide-react";
import { trpc } from "@/lib/trpc";

const V2JOY_LOGO = "/manus-storage/v2joylogo-official_9302769f.webp";

const ASSETS = {
  heroPoster: "/manus-storage/tempo-h01-night-confident-hero_f68102f9.webp",
  signalHero: "/manus-storage/tempo-h02-teal-signal-hero_dc142bff.webp",
  pack3mlVerified: "/manus-storage/tempo-pack-3ml-verified_60cabc8e.png",
  pack5ml: "/manus-storage/tempo-pack-5ml-standalone-final_d1d4aa8e.webp",
  packDuoVerified: "/manus-storage/tempo-pack-duo-verified_5982e938.png",
  packCourse: "/manus-storage/tempo-pack-2x5ml-verified_bc1cb656.webp",
  pocket: "/manus-storage/tempo-l01-pocket-leaving_de403632.webp",
  desk: "/manus-storage/tempo-l02-workday-desk_7f3834b7.webp",
  travel: "/manus-storage/tempo-l03-weekend-travel_53a47eb8.webp",
  ritual: "/manus-storage/tempo-l04-evening-ritual-5ml_a38f0f69.webp",
  shelf: "/manus-storage/tempo-l05-bathroom-shelf-5ml_f0fb5e61.webp",
  nightstand: "/manus-storage/tempo-l06-nightstand-5ml_061f4358.webp",
  homeAway: "/manus-storage/tempo-l07-duo-home-away_332f6060.webp",
  gift: "/manus-storage/tempo-l08-gift-ready-duo_ad772747.webp",
  return: "/manus-storage/tempo-l10-return-2x5ml_390ac415.webp",
  info3ml: "/manus-storage/tempo-i01-3ml-trial-card_89e06759.webp",
  info5ml: "/manus-storage/tempo-i02-5ml-regular-card_8c217537.webp",
  infoDuo: "/manus-storage/tempo-i03-duo-flex-card_c7776606.webp",
  infoValue: "/manus-storage/tempo-i04-value-ladder_643a4371.webp",
  infoDiscreet: "/manus-storage/tempo-i05-discreet-delivery_dfa05618.webp",
  infoRitual: "/manus-storage/tempo-i06-ritual-story_9717b3e9.webp",
  masterTabletop: "/manus-storage/tempo-commercial-master_1dc72fe3.webp",
  diaryExit: "/manus-storage/tempo-diary-rebuilt-01-exit_0f930150.webp",
  diaryPause: "/manus-storage/tempo-diary-final-02-pause_37a3961a.webp",
  diarySignal: "/manus-storage/tempo-diary-final-03-signal_8243be41.webp",
  diaryChoose: "/manus-storage/tempo-diary-final-04-choose_44c1859e.webp",
  diaryTogether: "/manus-storage/tempo-diary-final-05-together_5f84f06d.webp",
  diaryArrival: "/manus-storage/tempo-diary-final-06-arrival_5db318f2.webp",
  diaryEvening: "/manus-storage/tempo-diary-final-07-evening_097bcf0f.webp",
  diaryDetail: "/manus-storage/tempo-diary-final-08-detail_8e1fbf7e.webp",
  diaryHomeAway: "/manus-storage/tempo-diary-final-09-home-away_d469276e.webp",
  diaryReturn: "/manus-storage/tempo-diary-final-10-return_a700cb68.webp",
  botanicalTraditional: "/manus-storage/tempo-botanical-01-traditional-herbarium_4de43fe9.jpg",
  botanicalExtraction: "/manus-storage/tempo-botanical-02-extraction-studio_16445f75.jpg",
  botanicalLedger: "/manus-storage/tempo-botanical-03-ingredient-ledger_0a16e037.jpg",
  botanicalNight: "/manus-storage/tempo-botanical-04-materials-night_67d7f994.jpg",
  ritualPreparation: "/manus-storage/tempo-ritual-01-quiet-preparation_c68f7133.webp",
  ritualCarry: "/manus-storage/tempo-ritual-02-carry-signal_4205e67a.webp",
  lifestyleExit: "/manus-storage/tempo-lifestyle-01-exit-evening_334132f2.webp",
  lifestyleWalk: "/manus-storage/tempo-lifestyle-02-night-walk_46eab24c.webp",
  lifestyleTogether: "/manus-storage/tempo-lifestyle-03-together-at-home_2ee3a59f.webp",
  lifestyleMorning: "/manus-storage/tempo-lifestyle-04-morning-return_a7805e20.webp",
  coupleKitchen: "/manus-storage/tempo-couple-01-kitchen-evening_df318ac9.webp",
  coupleWalk: "/manus-storage/tempo-couple-02-walk-home_e372d5a3.webp",
  designSignal: "/manus-storage/tempo-infographic-01-design-signal_56b6f161.webp",
  botanicalField: "/manus-storage/tempo-infographic-02-botanical-field_3dc407b6.webp",
  motionReservation: "/manus-storage/tempo-motion-01-reservation_302dc7af.mp4",
  motionCarry: "/manus-storage/tempo-motion-02-carry_121f483d.mp4",
  motionCraft: "/manus-storage/tempo-motion-03-craft_c0137201.mp4",
  motionDate: "/manus-storage/tempo-motion-04-date-table_b2232978.mp4",
  motionHero: "/manus-storage/tempo-motion-05-duo-hero_0afbb738.mp4",
};

type PreferredSku = "3ml" | "5ml" | "duo" | "course-2x5ml";

const productChoices = [
  { id: "3ml" as const, step: "01", name: "TEMPO 3ml", title: "Nhịp làm quen", note: "Format gọn cho lịch hẹn đầu tiên", image: ASSETS.pack3mlVerified },
  { id: "5ml" as const, step: "02", name: "TEMPO 5ml", title: "Nhịp đều đặn", note: "Format đầy đủ cho routine riêng tư", image: ASSETS.pack5ml },
  { id: "duo" as const, step: "03", name: "TEMPO Duo", title: "Ở nhà, đi xa", note: "3ml mang theo + 5ml cho routine tại nhà", image: ASSETS.packDuoVerified },
  { id: "course-2x5ml" as const, step: "04", name: "TEMPO 2×5ml", title: "Nhịp quay lại", note: "Bundle hai chai 5ml cho lựa chọn đầy đủ hơn", image: ASSETS.packCourse },
];

const visualDiary = [
  { src: ASSETS.lifestyleExit, index: "01", kicker: "THE EXIT", title: "Rời ngày dài" },
  { src: ASSETS.coupleWalk, index: "02", kicker: "THE WALK", title: "Để lại khoảng vội" },
  { src: ASSETS.lifestyleTogether, index: "03", kicker: "THE SIGNAL", title: "Mang điều vừa đủ" },
  { src: ASSETS.coupleKitchen, index: "04", kicker: "THE MOMENT", title: "Có mặt cho nhau" },
  { src: ASSETS.ritualPreparation, index: "05", kicker: "THE PAUSE", title: "Giữ khoảng riêng" },
  { src: ASSETS.lifestyleMorning, index: "06", kicker: "THE RETURN", title: "Mang nhịp về lại" },
] as const;

const motionNotes = [
  { step: "01", title: "Đặt nhịp", caption: "Một dấu hiệu nhỏ trước khi ra ngoài.", video: ASSETS.motionReservation, poster: ASSETS.designSignal, alt: "Tĩnh vật buổi tối với TEMPO và dấu hiệu thị giác teal" },
  { step: "02", title: "Mang theo", caption: "Gọn cùng những vật dụng cần thiết.", video: ASSETS.motionCarry, poster: ASSETS.pack3mlVerified, alt: "Packshot TEMPO 3ml có nhãn rõ ràng" },
  { step: "03", title: "Chạm chất liệu", caption: "Nhìn gần hơn vào vật dụng được thiết kế để cầm nắm.", video: ASSETS.motionCraft, poster: ASSETS.packDuoVerified, alt: "Packshot TEMPO Duo có nhãn rõ ràng" },
  { step: "04", title: "Đến bàn hẹn", caption: "Một bối cảnh nhẹ nhàng cho buổi tối có chủ đích.", video: ASSETS.motionDate, poster: ASSETS.lifestyleTogether, alt: "Khoảnh khắc buổi tối trong không gian riêng tư" },
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
    <video ref={videoRef} autoPlay muted loop playsInline preload="auto" poster={ASSETS.heroPoster} data-motion-preference={reducedMotion ? "reduced" : "play"} aria-label="TEMPO trong không gian chuẩn bị buổi tối" onPlaying={() => { setHasPlaybackError(false); setPlaybackState("playing"); }} onError={() => { setHasPlaybackError(true); setPlaybackState("error"); }}>
      <source src={ASSETS.motionHero} type="video/mp4" />
    </video>
    {hasPlaybackError && <span className="sr-only">Video không thể phát; ảnh thay thế đang hiển thị.</span>}
    <div className="video-frame__wash" />
    <div className="video-frame__label"><span>MOTION / 05</span><span>THE FIRST SIGNAL</span></div>
  </div>;
}

function MotionCarousel() {
  const [activeMotion, setActiveMotion] = useState(0);
  const [playbackState, setPlaybackState] = useState<"loading" | "playing" | "paused" | "error">("loading");
  const [hasPlaybackError, setHasPlaybackError] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const active = motionNotes[activeMotion];
  useEffect(() => {
    const video = videoRef.current;
    setHasPlaybackError(false);
    if (reducedMotion) {
      setPlaybackState("paused");
      return;
    }
    if (!video) return;
    const syncPlaybackState = () => {
      const nextState = video.error ? "error" : !video.paused && video.currentTime > 0 ? "playing" : "loading";
      setPlaybackState(current => current === nextState ? current : nextState);
      if (nextState === "playing" || nextState === "error") window.clearInterval(stateMonitor);
    };
    const initialSync = window.setTimeout(syncPlaybackState, 180);
    const stateMonitor = window.setInterval(syncPlaybackState, 260);
    video.addEventListener("playing", syncPlaybackState);
    video.addEventListener("error", syncPlaybackState);
    return () => {
      window.clearTimeout(initialSync);
      window.clearInterval(stateMonitor);
      video.removeEventListener("playing", syncPlaybackState);
      video.removeEventListener("error", syncPlaybackState);
    };
  }, [active.video, reducedMotion]);
  const changeSlide = (direction: -1 | 1) => {
    setPlaybackState("loading");
    setHasPlaybackError(false);
    setActiveMotion(current => (current + direction + motionNotes.length) % motionNotes.length);
  };
  const chooseSlide = (index: number) => {
    setPlaybackState("loading");
    setHasPlaybackError(false);
    setActiveMotion(index);
  };
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

  return <section className="motion-carousel" aria-label="Bốn khoảnh khắc motion TEMPO" aria-roledescription="carousel">
    <div className="motion-carousel__masthead"><p className="overline">MOTION NOTES / 04 SCENES</p><h2>Một nhịp chuyển.<br /><em>Bốn khoảnh khắc.</em></h2><p>Chạm để đi qua câu chuyện. Mỗi cảnh là một bối cảnh, không phải một lời hứa.</p></div>
    <div className="motion-carousel__stage" data-playback-state={reducedMotion ? "reduced-motion" : playbackState} data-swipe="enabled" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {(reducedMotion || hasPlaybackError) && <SafeImage src={active.poster} alt={active.alt} className="motion-carousel__fallback" />}
      <video ref={videoRef} key={active.video} autoPlay={!reducedMotion} muted loop playsInline preload="metadata" poster={active.poster} aria-label={`Video ${active.step}: ${active.title}`} onPlaying={() => setPlaybackState("playing")} onTimeUpdate={({ currentTarget }) => { if (!currentTarget.paused && currentTarget.currentTime > 0) setPlaybackState("playing"); }} onPause={() => setPlaybackState("paused")} onError={() => { setPlaybackState("error"); setHasPlaybackError(true); }}><source src={active.video} type="video/mp4" /></video>
      <div className="motion-carousel__wash" />
      <div className="motion-carousel__copy"><span>{active.step} / 04</span><h3>{active.title}</h3><p>{active.caption}</p></div>
      <div className="motion-carousel__controls"><button type="button" aria-label="Xem cảnh trước" onClick={() => changeSlide(-1)}><ChevronLeft size={20} /></button><button type="button" aria-label="Xem cảnh tiếp theo" onClick={() => changeSlide(1)}><ChevronRight size={20} /></button></div>
      <div className="motion-carousel__dots" role="tablist" aria-label="Chọn cảnh motion">{motionNotes.map((note, index) => <button key={note.step} type="button" role="tab" aria-selected={activeMotion === index} aria-label={`Cảnh ${note.step}: ${note.title}`} onClick={() => chooseSlide(index)}><span /></button>)}</div>
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
    join.mutate({
      fullName: String(data.get("fullName") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      preferredSku,
      note: String(data.get("note") ?? ""),
      marketingConsent: data.get("marketingConsent") === "on",
    }, {
      onSuccess: result => {
        setFormResult({ kind: result.kind, slot: result.entry?.slotNumber });
        if (result.kind === "reserved") form.reset();
        void status.refetch();
      },
    });
  }

  return (
    <div className="night-site">
      <header className="night-header">
        <a href="#top" className="brand" aria-label="TEMPO by V2JOY"><V2JoyBadge /><span className="tempo-wordmark">TEMPO</span><small>PRE-ORDER / 01</small></a>
        <div className="header-center"><span>Night Confident</span><i /> <span>Danh sách chờ 01.000</span></div>
        <button type="button" onClick={goToWaitlist} className="header-cta">Giữ suất <ArrowUpRight size={15} /></button>
      </header>

      <main id="top">
        <section className="hero-night">
          <EditorialVideo />
          <div className="hero-wash" />
          <div className="hero-noise" />
          <div className="hero-copy">
            <p className="overline">V2JOY / NIGHT CONFIDENT / 2026</p>
            <h1>Đêm nay,<br /><em>bạn chọn một nhịp khác.</em></h1>
            <p className="hero-lead">Một ritual kín đáo trước cuộc hẹn.</p>
            <div className="hero-actions"><button onClick={goToWaitlist} type="button" className="teal-button">Vào danh sách chờ <ArrowDownRight size={18} /></button><a href="#story" className="ghost-link">Đi theo câu chuyện <span>↓</span></a></div>
          </div>
          <div className="hero-counter"><b>{remaining.toLocaleString("vi-VN")}</b><span>lời mời đầu tiên<br />còn mở</span></div>
          <div className="hero-footer"><span>TEMPO 3ml · 5ml</span><Signal /><span>KÍN ĐÁO / CÓ CHỦ ĐÍCH</span></div>
        </section>

        <section className="opening" id="story">
          <div className="chapter">WHY / 01 · THE EXIT</div>
          <div className="opening-title"><p>Rời khỏi ngày dài.</p><h2>Để buổi tối<br /><em>thuộc về cả hai.</em></h2></div>
          <p className="opening-copy">Để lại nhịp vội. Mang theo sự hiện diện.</p>
        </section>

        <section className="cinema-section cinema-section--lifestyle">
          <SafeImage src={ASSETS.lifestyleExit} alt="Lối ra căn hộ trong ánh chiều, gợi khoảnh khắc rời ngày dài" className="cinema-section__image" />
          <div className="cinema-section__copy"><p className="overline">02 / SET THE TONE</p><h2>Bật một ánh đèn.<br /><em>Đổi một nhịp.</em></h2><p>Một điểm dừng trước khi đi.</p><span className="micro-note">MỘT BUỔI TỐI, KHÔNG PHẢI MỘT CATALOGUE</span></div>
        </section>

        <section className="story-panel story-panel--pocket">
          <div className="story-image"><SafeImage src={ASSETS.pack3mlVerified} alt="Packshot TEMPO 3ml với nhãn TEMPO rõ ràng" /><span className="image-index">3ML / CARRY THE SIGNAL</span></div>
          <div className="story-copy"><p className="overline overline--dark">HOW / 01 · CARRY THE SIGNAL</p><h2>Nhỏ để đi cùng<br /><em>lịch hẹn của bạn.</em></h2><p>3ml. Gọn trong nhịp riêng.</p><button onClick={() => { setPreferredSku("3ml"); goToWaitlist(); }} type="button" className="text-button">Chọn nhịp 3ml <ArrowUpRight size={16} /></button></div>
        </section>

        <section className="signal-break"><div><p className="overline">A QUIET SIGNAL</p><h2>Không cần vội.<br /><em>Chỉ cần có mặt.</em></h2><p>Một cuộc hẹn bắt đầu từ cách bạn dành thời gian cho nhau.</p></div><SafeImage src={ASSETS.coupleWalk} alt="Một người nam và một người nữ trưởng thành đi cạnh nhau trên phố tối trong một buổi hẹn yên tĩnh" /><Signal className="signal-break-line" /></section>

        <MotionCarousel />

        <section className="botanical-chapter" aria-labelledby="botanical-chapter-title">
          <div className="botanical-chapter__heading"><p className="overline overline--dark">HOW / BOTANICAL NOTES</p><h2 id="botanical-chapter-title">Chất liệu quen.<br /><em>Cách đọc mới.</em></h2><p>Một nhịp hình ảnh đi từ vật liệu gợi nhớ thủ công, qua không gian chiết xuất đương đại, đến danh mục để bạn tự đối chiếu.</p><a href="#inci-full" className="text-button">Mở danh mục INCI <ArrowDownRight size={16} /></a></div>
          <div className="botanical-chapter__grid">
            <article className="botanical-card botanical-card--lead"><SafeImage src={ASSETS.botanicalTraditional} alt="Tĩnh vật lá, rễ và vật liệu thủ công Việt Nam được diễn giải theo phong cách đương đại" /><div><span>01 / THE MATERIAL</span><h3>Ngắm chất liệu.<br /><em>Không gán lời hứa.</em></h3><p>Hình ảnh là diễn giải cảm quan về các chiết xuất thực vật trong danh mục INCI.</p></div></article>
            <article className="botanical-card"><SafeImage src={ASSETS.botanicalExtraction} alt="Không gian diễn giải chiết xuất đương đại với dụng cụ thủy tinh và vật liệu thực vật" /><div><span>02 / THE STUDIO</span><h3>Từ chất liệu<br /><em>đến công thức.</em></h3><p>Chín dịch chiết thực vật được liệt kê để đối chiếu.</p></div></article>
            <article className="botanical-card"><SafeImage src={ASSETS.botanicalLedger} alt="Sổ ghi chép thành phần và vật liệu thực vật biểu đạt nguyên tắc minh bạch" /><div><span>03 / THE LEDGER</span><h3>Đọc trước<br /><em>khi tin.</em></h3><p>Nhãn, INCI và hồ sơ chính thức là nơi cần đọc kỹ.</p></div></article>
            <article className="botanical-card botanical-card--night"><SafeImage src={ASSETS.botanicalNight} alt="Tĩnh vật thảo mộc và chất liệu sơn mài trong ánh sáng teal dịu" /><div><span>04 / THE SIGNAL</span><h3>Giữ lại điều<br /><em>có thể kiểm tra.</em></h3><p>TEMPO được sản xuất tại Việt Nam bởi NANOFRANCE, Ninh Bình.</p></div></article>
          </div>
          <p className="botanical-chapter__note"><LockKeyhole size={16} /><span>Không gán vùng trồng, nước xuất xứ hay công dụng riêng cho từng nguyên liệu khi chưa có hồ sơ công khai xác nhận. Claim ghi nhãn: “Giúp chăm sóc dưỡng ẩm da.”</span></p>
        </section>

        <section className="story-panel story-panel--ritual">
          <div className="story-copy"><p className="overline">HOW / 02 · BEFORE YOU GO</p><h2>Chuẩn bị một chút.<br /><em>Giữ lại khoảng riêng.</em></h2><p>Đọc nhãn. Chọn format. Đi theo nhịp của bạn.</p><ul><li><Clock3 size={16} /> Theo hướng dẫn công bố trên nhãn</li><li><LockKeyhole size={16} /> Một routine riêng tư</li></ul></div>
          <div className="story-image"><SafeImage src={ASSETS.coupleKitchen} alt="Một người nam và một người nữ trưởng thành chuẩn bị đồ uống trong căn bếp ấm áp trước buổi tối" /><span className="image-index">A MOMENT / NOT A RUSH</span></div>
        </section>

        <section className="transparency-protocol" id="nguon-goc" aria-labelledby="transparency-title">
          <div className="transparency-protocol__masthead">
            <div><p className="overline overline--dark">HOW / 03 · MINH BẠCH TRƯỚC LỜI HỨA</p><h2 id="transparency-title">Không cần tin vội.<br /><em>Hãy đọc cùng chúng tôi.</em></h2></div>
            <p>Thông tin cần thiết được để mở. Bạn có quyền đối chiếu trước khi chọn.</p>
          </div>

          <div className="transparency-hero">
            <SafeImage src={ASSETS.botanicalLedger} alt="Sổ ghi chép thành phần minh hoạ việc đối chiếu công thức" />
            <div className="transparency-hero__copy"><span>01 / FORMULA</span><h3>Danh mục rõ ràng.<br /><em>Không cần đoán.</em></h3><p>INCI mở. Công dụng ghi nhãn: <strong>“Giúp chăm sóc dưỡng ẩm da.”</strong></p><a href="#inci-full" className="transparency-link">Xem INCI đầy đủ <ArrowDownRight size={16} /></a></div>
          </div>

          <div className="transparency-steps">
            <article className="transparency-card transparency-card--origin"><SafeImage src={ASSETS.botanicalExtraction} alt="Không gian chiết xuất đương đại minh hoạ nơi đối chiếu thông tin" /><div><span>02 / ORIGIN</span><h3>Sản xuất tại<br /><em>Việt Nam.</em></h3><p><b>Công ty TNHH SX Công nghệ cao NANOFRANCE</b><br />KCN Đồng Văn IV, Ninh Bình.</p></div></article>
            <article className="transparency-card transparency-card--label"><SafeImage src={ASSETS.botanicalTraditional} alt="Chất liệu thực vật và giấy ghi chép minh hoạ bước đọc nhãn" /><div><span>03 / LABEL</span><h3>Đọc nhãn trước<br /><em>khi bắt đầu.</em></h3><p>Tên SKU · dung tích · số lô · NSX/HSD · hướng dẫn.</p></div></article>
            <article className="transparency-card transparency-card--proof"><SafeImage src={ASSETS.botanicalNight} alt="Tĩnh vật vật liệu thực vật trong ánh sáng dịu minh hoạ việc mở hồ sơ" /><div><span>04 / OPEN FILE</span><h3>Hồ sơ mở bán<br /><em>được cập nhật.</em></h3><p>Xem, đối chiếu, rồi mới chọn.</p></div></article>
          </div>

          <div className="transparency-inci" id="inci-full">
            <div><span>INCI / REFERENCE LIST</span><h3>Toàn bộ tên thành phần<br /><em>theo danh mục công bố.</em></h3></div>
            <details><summary>Hiện danh sách INCI <ChevronDown size={16} /></summary><p>Purified Water, Alcohol (Ethanol), Butylene Glycol, Cnidium monnieri extract, Zanthoxylum bungeanum extract, Sophora flavescens extract, Polygonatum sibiricum extract, Eucommia ulmoides extract, Cynomorium songaricum extract, Epimedium brevicornum extract, Verbena officinalis extract, Morinda officinalis extract, Sodium Benzoate, Panthenol.</p></details>
          </div>

          <div className="transparency-safety"><LockKeyhole size={20} /><div><b>Đọc kỹ trước khi dùng.</b><p>Chỉ dùng ngoài da. Đối chiếu cảnh báo trên nhãn; ngưng dùng nếu có biểu hiện không phù hợp.</p></div><button type="button" onClick={goToWaitlist} className="text-button">Nhận thông tin mở bán <ArrowUpRight size={16} /></button></div>
          <p className="transparency-disclaimer">Thông tin tại đây được biên soạn từ hồ sơ sản phẩm hiện có. Nhãn thành phẩm, số công bố và hồ sơ chính thức tại thời điểm mở bán luôn là nguồn thông tin áp dụng ưu tiên.</p>
        </section>

        <section className="product-block" id="san-pham">
          <div className="product-block__top"><div><p className="overline overline--dark">WHAT / THE FIRST EDITION</p><h2>Chọn nhịp<br /><em>đi cùng bạn.</em></h2></div><p>Bốn format, để chọn đúng hoàn cảnh thay vì mua thêm một món đồ.</p></div>
          <div className="format-grid">
            {productChoices.map(item => <article className="format-card" key={item.id}><div className="format-card__image"><SafeImage src={item.image} alt={`Mockup ${item.name}`} /></div><div className="format-card__copy"><span>{item.step} / {item.name}</span><h3>{item.title}</h3><p>{item.note}</p><button type="button" onClick={() => { setPreferredSku(item.id); goToWaitlist(); }}>Chọn {item.name} <ArrowUpRight size={15} /></button></div></article>)}
          </div>
        </section>

        <section className="info-ribbon info-ribbon--lifestyle" aria-label="Khoảnh khắc TEMPO xuất hiện trong ngày">
          <div className="info-ribbon__intro"><p className="overline">WHAT / FIND YOUR FORMAT</p><h2>Một vật nhỏ.<br /><em>Một ý định rõ.</em></h2><p>Format chỉ nên xuất hiện khi nó hợp với nhịp sống của bạn.</p><button className="teal-button" type="button" onClick={goToWaitlist}>Chọn pack trong form <ArrowDownRight size={17} /></button></div>
          <div className="info-ribbon__cards"><SafeImage src={ASSETS.lifestyleTogether} alt="Không gian yên tĩnh trước một buổi hẹn" /><SafeImage src={ASSETS.lifestyleMorning} alt="Buổi sáng yên tĩnh với tách cà phê và ánh sáng cửa sổ" /></div>
        </section>

        <section className="gallery-section" aria-label="Nhật ký visual TEMPO">
          <div className="gallery-heading"><p className="overline">THE VISUAL DIARY / 06 CHAPTERS</p><h2>Không chỉ một ảnh.<br /><em>Mà là cả một buổi tối.</em></h2><p>Sáu khung hình. Một nhịp liền mạch.</p></div>
          <div className="gallery-grid gallery-grid--diary">{visualDiary.map(frame => <figure key={frame.index}><SafeImage src={frame.src} alt={`${frame.index} / ${frame.kicker} — ${frame.title}`} /><div className="gallery-grid__copy"><span>{frame.index} / {frame.kicker}</span><h3>{frame.title}</h3></div></figure>)}</div>
        </section>

        <section className="design-proof">
          <div className="design-proof__copy"><p className="overline">DESIGN STUDIES / TRUE SCALE</p><h2>Chỉ giữ lại<br /><em>điều cần xem.</em></h2><p>Quy cách, tỷ lệ và trải nghiệm mở hộp — đủ để bạn đối chiếu trước khi chọn.</p><div className="design-proof__marks"><span>3ML / 5ML</span><span>TRUE SCALE</span><span>OPEN TO CHECK</span></div></div>
          <div className="design-proof__images"><img src={ASSETS.pack3mlVerified} alt="TEMPO 3ml với chữ TEMPO rõ ràng trên chai và hộp" loading="lazy" /><img src={ASSETS.packDuoVerified} alt="TEMPO Duo có một chai 3ml và một chai 5ml với nhãn rõ ràng" loading="lazy" /></div>
        </section>

        <section className="discreet-section">
          <div className="discreet-section__image"><SafeImage src={ASSETS.lifestyleMorning} alt="Buổi sáng yên tĩnh với tách cà phê và ánh sáng cửa sổ" /></div>
          <div className="discreet-section__copy"><p className="overline">05 / KEEP IT YOURS</p><h2>Kín đáo<br /><em>là một lựa chọn.</em></h2><p>Không phải mọi điều có ý nghĩa đều cần được nói lớn.</p><div className="discreet-section__badge"><V2JoyBadge /><span>V2JOY / NIGHT CONFIDENT</span></div></div>
        </section>

        <section className="waitlist-section" id="waitlist">
          <div className="waitlist-cinema"><SafeImage src={ASSETS.lifestyleTogether} alt="Không gian riêng tư cho một buổi tối có chủ đích" /><div className="waitlist-cinema__wash" /><div className="waitlist-cinema__copy"><p className="overline">THE FIRST 1,000</p><h2>Danh sách chờ<br /><em>đã mở.</em></h2><p>Giữ suất. Chờ thông tin mở bán chính thức.</p></div></div>
          <div className="waitlist-form-wrap">
            <div className="waitlist-topline"><span>PRIVATE ACCESS / 01</span><span>{claimed.toLocaleString("vi-VN")} / 1.000 đã ghi nhận</span></div>
            <h2>Giữ một suất<br />cho nhịp của bạn.</h2>
            <p className="form-intro">Đây là đăng ký hàng chờ, chưa phải thanh toán hay xác nhận đặt hàng. V2JOY sẽ liên hệ khi có thông tin mở bán chính thức.</p>
            <form className="waitlist-form" onSubmit={submitWaitlist}>
              <div className="sku-choice" role="radiogroup" aria-label="Chọn pack TEMPO quan tâm">{productChoices.map(item => <button key={item.id} type="button" role="radio" aria-checked={preferredSku === item.id} onClick={() => setPreferredSku(item.id)} className={preferredSku === item.id ? "is-active" : ""}><img src={item.image} alt="" loading="lazy" /><span>{item.name}</span><small>{item.note}</small></button>)}</div>
              <label>Họ và tên<input name="fullName" required autoComplete="name" placeholder="Tên của bạn" /></label>
              <label>Số điện thoại<input name="phone" required inputMode="tel" autoComplete="tel" placeholder="0xxxxxxxxx" /></label>
              <label>Email <em>(không bắt buộc)</em><input name="email" type="email" autoComplete="email" placeholder="ban@email.com" /></label>
              <label>Lời nhắn <em>(không bắt buộc)</em><textarea name="note" rows={3} maxLength={500} placeholder="Ví dụ: thời gian liên hệ phù hợp" /></label>
              <label className="consent"><input name="marketingConsent" type="checkbox" required /><span>Tôi đồng ý để V2JOY lưu thông tin và liên hệ về danh sách chờ TEMPO. Tôi có thể yêu cầu xóa thông tin bất kỳ lúc nào.</span></label>
              {join.error && <p className="form-error"><X size={15} /> {join.error.message}</p>}
              {formResult && <div className={`form-result form-result--${formResult.kind}`}>{formResult.kind === "full" ? <><X size={17} /><span>Danh sách 1.000 suất hiện đã đủ. V2JOY sẽ cập nhật đợt tiếp theo.</span></> : <><Check size={17} /><span>{formResult.kind === "existing" ? "Số điện thoại này đã có trong danh sách chờ" : "Bạn đã được ghi nhận vào danh sách chờ"}{formResult.slot ? ` · Suất ${String(formResult.slot).padStart(4, "0")}` : ""}.</span></>}</div>}
              <button className="submit-button" disabled={join.isPending || remaining === 0} type="submit">{join.isPending ? "Đang giữ suất…" : remaining === 0 ? "Danh sách đã đủ" : "Giữ suất hàng chờ"}<ArrowUpRight size={18} /></button>
            </form>
            <p className="data-note"><Mail size={14} /> Thông tin chỉ dùng để liên hệ về TEMPO. Không yêu cầu địa chỉ hay thanh toán ở bước này.</p>
          </div>
        </section>

        <section className="faq-section"><div><p className="overline overline--dark">BEFORE THE NIGHT</p><h2>Biết trước,<br /><em>chọn kỹ hơn.</em></h2></div><div className="faq-list">{[
          ["Đây có phải đơn đặt hàng đã xác nhận không?", "Chưa. Đây là danh sách chờ để V2JOY liên hệ khi có thông tin mở bán và điều kiện đặt hàng chính thức."],
          ["Hình ảnh và video trên trang đã là sản phẩm thật chưa?", "Chưa. Đây là bộ concept visual và video cho giai đoạn đánh giá trước sản xuất. Màu sắc, bao bì và thông tin cuối cùng cần được chốt lại trên mẫu thật."],
          ["TEMPO có phải là thuốc không?", "Không. TEMPO được định hướng là mỹ phẩm. Không dùng trang này thay cho hướng dẫn, nhãn và hồ sơ công bố chính thức."],
        ].map(([question, answer], index) => <article key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>0{index + 1}</span><b>{question}</b><ChevronDown size={18} /></button>{openFaq === index && <p>{answer}</p>}</article>)}</div></section>
      </main>

      <footer><div className="footer-brand"><V2JoyBadge /><span>TEMPO</span></div><p>Concept visual và landing pre-order · Night Confident</p><p>Sản phẩm là mỹ phẩm, không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.</p></footer>
      <div className="mobile-sticky"><div><span>{remaining.toLocaleString("vi-VN")} suất đầu</span><b>TEMPO / WAITLIST</b></div><button type="button" onClick={goToWaitlist}>Giữ suất <ArrowUpRight size={16} /></button></div>
    </div>
  );
}
