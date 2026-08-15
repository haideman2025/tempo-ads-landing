import { FormEvent, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Clock3, LockKeyhole, Mail, X } from "lucide-react";
import { trpc } from "@/lib/trpc";

const V2JOY_LOGO = "/manus-storage/v2joylogo-official_87b7dfc4.jpg";
const VIDEO_ARRIVAL = "/manus-storage/tempo-video-01-arrival_2c34df78.mp4";

const ASSETS = {
  heroPoster: "/manus-storage/tempo-h01-night-confident-hero_05e26f4e.jpg",
  signalHero: "/manus-storage/tempo-h02-teal-signal-hero_bd3a2334.jpg",
  pack3ml: "/manus-storage/tempo-p01-3ml-front_b95aa838.jpg",
  pack5ml: "/manus-storage/tempo-pack-5ml-standalone-final_a9834962.jpg",
  packDuo: "/manus-storage/tempo-p03-duo_f9127d21.jpg",
  packCourse: "/manus-storage/tempo-pack-2x5ml-verified_194f0c5d.png",
  packScale: "/manus-storage/tempo-p05-3ml-hand-scale_2e003621.jpg",
  pocket: "/manus-storage/tempo-l01-pocket-leaving_e9a5bc11.jpg",
  desk: "/manus-storage/tempo-l02-workday-desk_34391fc6.jpg",
  travel: "/manus-storage/tempo-l03-weekend-travel_c0a929ea.jpg",
  ritual: "/manus-storage/tempo-l04-evening-ritual-5ml_07ecb94a.jpg",
  shelf: "/manus-storage/tempo-l05-bathroom-shelf-5ml_1ec02acb.jpg",
  nightstand: "/manus-storage/tempo-l06-nightstand-5ml_a4946bc6.jpg",
  homeAway: "/manus-storage/tempo-l07-duo-home-away_61475b1e.jpg",
  gift: "/manus-storage/tempo-l08-gift-ready-duo_7b7e3f5d.jpg",
  date: "/manus-storage/tempo-l09-date-table_dcf91e62.jpg",
  return: "/manus-storage/tempo-l10-return-2x5ml_67ace95c.jpg",
  info3ml: "/manus-storage/tempo-i01-3ml-trial-card_23f5ee50.jpg",
  info5ml: "/manus-storage/tempo-i02-5ml-regular-card_afc4416f.jpg",
  infoDuo: "/manus-storage/tempo-i03-duo-flex-card_1b58fe22.jpg",
  infoValue: "/manus-storage/tempo-i04-value-ladder_fb1dba8a.jpg",
  infoDiscreet: "/manus-storage/tempo-i05-discreet-delivery_eaa93635.jpg",
  infoRitual: "/manus-storage/tempo-i06-ritual-story_36a868e2.jpg",
  approvedPrimary: "/manus-storage/tempo-pack-primary-v2_0c76aa1c.png",
  approvedUnboxing: "/manus-storage/tempo-pack-unboxing-v2_b2033bfd.png",
  approvedScale: "/manus-storage/tempo-pack-scale-v2_1419d3e8.png",
  masterTabletop: "/manus-storage/tempo-commercial-master_2b9e537a.jpg",
  diaryExit: "/manus-storage/tempo-diary-rebuilt-01-exit_a13c1749.jpg",
  diaryPause: "/manus-storage/tempo-diary-final-02-pause_5f867810.jpg",
  diarySignal: "/manus-storage/tempo-diary-final-03-signal_a5aaa208.jpg",
  diaryChoose: "/manus-storage/tempo-diary-final-04-choose_7af39b22.jpg",
  diaryTogether: "/manus-storage/tempo-diary-final-05-together_fc4a7e52.jpg",
  diaryArrival: "/manus-storage/tempo-diary-final-06-arrival_f6c3c434.jpg",
  diaryEvening: "/manus-storage/tempo-diary-final-07-evening_6f754f7b.jpg",
  diaryDetail: "/manus-storage/tempo-diary-final-08-detail_e88069c6.jpg",
  diaryHomeAway: "/manus-storage/tempo-diary-final-09-home-away_4b81419e.jpg",
  diaryReturn: "/manus-storage/tempo-diary-final-10-return_eaaf682b.jpg",
  transparencyFormula: "/manus-storage/tempo-transparency-01-formula_2ad96b95.jpg",
  transparencyOrigin: "/manus-storage/tempo-transparency-02-origin_998f7423.jpg",
  transparencyLabel: "/manus-storage/tempo-transparency-03-label_5b6f90ba.jpg",
  transparencyProof: "/manus-storage/tempo-transparency-04-proof_6ba9f88f.jpg",
  botanicalStudies: "/manus-storage/tempo-provenance-01-botanical-studies_b1cbc1c5.jpg",
  formulaStudy: "/manus-storage/tempo-provenance-02-formula_4c74c193.jpg",
  vietnamMade: "/manus-storage/tempo-provenance-03-vietnam-made_a370a298.jpg",
  openFile: "/manus-storage/tempo-provenance-04-open-file_a2a8f684.jpg",
  ritualPreparation: "/manus-storage/tempo-ritual-01-quiet-preparation_606c7e0a.jpg",
  ritualCarry: "/manus-storage/tempo-ritual-02-carry-signal_4c7ab5e4.jpg",
  lifestyleExit: "/manus-storage/tempo-lifestyle-01-exit-evening_9c1f24f7.jpg",
  lifestyleWalk: "/manus-storage/tempo-lifestyle-02-night-walk_745b948a.jpg",
  lifestyleTogether: "/manus-storage/tempo-lifestyle-03-together-at-home_98385daf.jpg",
  lifestyleMorning: "/manus-storage/tempo-lifestyle-04-morning-return_bb8916d6.jpg",
  lifestyleObjects: "/manus-storage/tempo-l09-date-table_dcf91e62.jpg",
};

type PreferredSku = "3ml" | "5ml" | "duo" | "course-2x5ml";

const productChoices = [
  { id: "3ml" as const, step: "01", name: "TEMPO 3ml", title: "Nhịp làm quen", note: "Format gọn cho lịch hẹn đầu tiên", image: ASSETS.approvedScale },
  { id: "5ml" as const, step: "02", name: "TEMPO 5ml", title: "Nhịp đều đặn", note: "Format đầy đủ cho routine riêng tư", image: ASSETS.pack5ml },
  { id: "duo" as const, step: "03", name: "TEMPO Duo", title: "Ở nhà, đi xa", note: "3ml mang theo + 5ml cho routine tại nhà", image: ASSETS.approvedUnboxing },
  { id: "course-2x5ml" as const, step: "04", name: "TEMPO 2×5ml", title: "Nhịp quay lại", note: "Bundle hai chai 5ml cho lựa chọn đầy đủ hơn", image: ASSETS.packCourse },
];

const visualDiary = [
  { src: ASSETS.lifestyleExit, index: "01", kicker: "THE EXIT", title: "Rời ngày dài" },
  { src: ASSETS.lifestyleWalk, index: "02", kicker: "THE WALK", title: "Để lại khoảng vội" },
  { src: ASSETS.lifestyleObjects, index: "03", kicker: "THE SIGNAL", title: "Mang điều vừa đủ" },
  { src: ASSETS.lifestyleTogether, index: "04", kicker: "THE MOMENT", title: "Có mặt cho nhau" },
  { src: ASSETS.ritualPreparation, index: "05", kicker: "THE PAUSE", title: "Giữ khoảng riêng" },
  { src: ASSETS.lifestyleMorning, index: "06", kicker: "THE RETURN", title: "Mang nhịp về lại" },
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

function EditorialVideo() {
  return <div className="video-frame">
    <video autoPlay muted loop playsInline preload="metadata" poster={ASSETS.heroPoster} aria-label="TEMPO trong không gian chuẩn bị buổi tối">
      <source src={VIDEO_ARRIVAL} type="video/mp4" />
    </video>
    <div className="video-frame__wash" />
    <div className="video-frame__label"><span>MOTION / 01</span><span>THE ARRIVAL</span></div>
  </div>;
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
          <div className="story-image"><SafeImage src={ASSETS.ritualCarry} alt="TEMPO 3ml bên điện thoại và vật dụng chuẩn bị trước khi đi" /><span className="image-index">3ML / CARRY THE SIGNAL</span></div>
          <div className="story-copy"><p className="overline overline--dark">HOW / 01 · CARRY THE SIGNAL</p><h2>Nhỏ để đi cùng<br /><em>lịch hẹn của bạn.</em></h2><p>3ml. Gọn trong nhịp riêng.</p><button onClick={() => { setPreferredSku("3ml"); goToWaitlist(); }} type="button" className="text-button">Chọn nhịp 3ml <ArrowUpRight size={16} /></button></div>
        </section>

        <section className="signal-break"><div><p className="overline">A QUIET SIGNAL</p><h2>Không cần vội.<br /><em>Chỉ cần có mặt.</em></h2><p>Một cuộc hẹn bắt đầu từ cách bạn dành thời gian cho nhau.</p></div><SafeImage src={ASSETS.lifestyleWalk} alt="Hai người đi cạnh nhau trên phố tối trong một buổi hẹn yên tĩnh" /><Signal className="signal-break-line" /></section>

        <section className="ingredient-origin" aria-labelledby="ingredient-origin-title">
          <div className="ingredient-origin__heading"><p className="overline overline--dark">HOW / BOTANICAL STUDIES + MADE IN VIETNAM</p><h2 id="ingredient-origin-title">Nhìn vào điều<br /><em>có thể kiểm tra.</em></h2><p>Chín dịch chiết thực vật trong danh mục INCI. <strong>TEMPO được sản xuất tại Việt Nam</strong> bởi NANOFRANCE, Ninh Bình.</p><a href="#inci-full" className="text-button">Mở danh mục INCI <ArrowDownRight size={16} /></a></div>
          <div className="ingredient-origin__grid">
            <article><SafeImage src={ASSETS.botanicalStudies} alt="Nghiên cứu hình ảnh diễn giải các chiết xuất thực vật trong danh mục INCI TEMPO" /><div><span>01 / BOTANICAL STUDIES</span><h3>Chiết xuất<br /><em>thực vật.</em></h3><p>Danh mục để bạn tự đối chiếu.</p></div></article>
            <article><SafeImage src={ASSETS.formulaStudy} alt="TEMPO trong tĩnh vật công thức và danh mục thành phần" /><div><span>02 / FORMULA</span><h3>Đọc trước<br /><em>khi tin.</em></h3><p>Claim ghi nhãn: chăm sóc dưỡng ẩm da.</p></div></article>
            <article><SafeImage src={ASSETS.vietnamMade} alt="TEMPO trong visual chất liệu Việt Nam đương đại minh hoạ nơi sản xuất" /><div><span>03 / MADE IN VIETNAM</span><h3>NANOFRANCE<br /><em>Ninh Bình.</em></h3><p>Nơi sản xuất có thể kiểm tra.</p></div></article>
            <p className="ingredient-origin__note"><LockKeyhole size={16} /><span>Hình ảnh thảo mộc là diễn giải danh mục chiết xuất thực vật; hồ sơ hiện có không xác nhận vùng trồng hoặc nước xuất xứ của từng nguyên liệu.</span></p>
          </div>
        </section>

        <section className="story-panel story-panel--ritual">
          <div className="story-copy"><p className="overline">HOW / 02 · BEFORE YOU GO</p><h2>Chuẩn bị một chút.<br /><em>Giữ lại khoảng riêng.</em></h2><p>Đọc nhãn. Chọn format. Đi theo nhịp của bạn.</p><ul><li><Clock3 size={16} /> Theo hướng dẫn công bố trên nhãn</li><li><LockKeyhole size={16} /> Một routine riêng tư</li></ul></div>
          <div className="story-image"><SafeImage src={ASSETS.lifestyleTogether} alt="Hai người chuẩn bị đồ uống trong căn bếp ấm áp trước buổi tối" /><span className="image-index">A MOMENT / NOT A RUSH</span></div>
        </section>

        <section className="transparency-protocol" id="nguon-goc" aria-labelledby="transparency-title">
          <div className="transparency-protocol__masthead">
            <div><p className="overline overline--dark">HOW / 03 · MINH BẠCH TRƯỚC LỜI HỨA</p><h2 id="transparency-title">Không cần tin vội.<br /><em>Hãy đọc cùng chúng tôi.</em></h2></div>
            <p>Thông tin cần thiết được để mở. Bạn có quyền đối chiếu trước khi chọn.</p>
          </div>

          <div className="transparency-hero">
            <SafeImage src={ASSETS.transparencyFormula} alt="TEMPO 5ml trong visual công thức và thành phần công bố" />
            <div className="transparency-hero__copy"><span>01 / FORMULA</span><h3>Danh mục rõ ràng.<br /><em>Không cần đoán.</em></h3><p>INCI mở. Công dụng ghi nhãn: <strong>“Giúp chăm sóc dưỡng ẩm da.”</strong></p><a href="#inci-full" className="transparency-link">Xem INCI đầy đủ <ArrowDownRight size={16} /></a></div>
          </div>

          <div className="transparency-steps">
            <article className="transparency-card transparency-card--origin"><SafeImage src={ASSETS.transparencyOrigin} alt="Visual truy xuất nguồn gốc TEMPO" /><div><span>02 / ORIGIN</span><h3>Sản xuất tại<br /><em>Việt Nam.</em></h3><p><b>Công ty TNHH SX Công nghệ cao NANOFRANCE</b><br />KCN Đồng Văn IV, Ninh Bình.</p></div></article>
            <article className="transparency-card transparency-card--label"><SafeImage src={ASSETS.transparencyLabel} alt="Visual kiểm tra nhãn TEMPO" /><div><span>03 / LABEL</span><h3>Đọc nhãn trước<br /><em>khi bắt đầu.</em></h3><p>Tên SKU · dung tích · số lô · NSX/HSD · hướng dẫn.</p></div></article>
            <article className="transparency-card transparency-card--proof"><SafeImage src={ASSETS.openFile} alt="Hồ sơ mở bán TEMPO được đặt cạnh sản phẩm" /><div><span>04 / OPEN FILE</span><h3>Hồ sơ mở bán<br /><em>được cập nhật.</em></h3><p>Xem, đối chiếu, rồi mới chọn.</p></div></article>
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
          <div className="info-ribbon__cards"><SafeImage src={ASSETS.lifestyleObjects} alt="Vật dụng chuẩn bị cho một buổi hẹn với TEMPO 3ml là chi tiết phụ" /><SafeImage src={ASSETS.ritualCarry} alt="TEMPO 3ml trong bối cảnh mang theo trước cuộc hẹn" /></div>
        </section>

        <section className="gallery-section" aria-label="Nhật ký visual TEMPO">
          <div className="gallery-heading"><p className="overline">THE VISUAL DIARY / 06 CHAPTERS</p><h2>Không chỉ một ảnh.<br /><em>Mà là cả một buổi tối.</em></h2><p>Sáu khung hình. Một nhịp liền mạch.</p></div>
          <div className="gallery-grid gallery-grid--diary">{visualDiary.map(frame => <figure key={frame.index}><SafeImage src={frame.src} alt={`${frame.index} / ${frame.kicker} — ${frame.title}`} /><div className="gallery-grid__copy"><span>{frame.index} / {frame.kicker}</span><h3>{frame.title}</h3></div></figure>)}</div>
        </section>

        <section className="design-proof">
          <div className="design-proof__copy"><p className="overline">DESIGN STUDIES / TRUE SCALE</p><h2>Chỉ giữ lại<br /><em>điều cần xem.</em></h2><p>Quy cách, tỷ lệ và trải nghiệm mở hộp — đủ để bạn đối chiếu trước khi chọn.</p><div className="design-proof__marks"><span>3ML / 5ML</span><span>TRUE SCALE</span><span>OPEN TO CHECK</span></div></div>
          <div className="design-proof__images"><img src={ASSETS.approvedScale} alt="TEMPO 3ml đặt cạnh điện thoại để đánh giá kích thước" loading="lazy" /><img src={ASSETS.approvedUnboxing} alt="Mockup trải nghiệm mở hộp TEMPO" loading="lazy" /></div>
        </section>

        <section className="discreet-section">
          <div className="discreet-section__image"><SafeImage src={ASSETS.lifestyleMorning} alt="Buổi sáng yên tĩnh với tách cà phê và ánh sáng cửa sổ" /></div>
          <div className="discreet-section__copy"><p className="overline">05 / KEEP IT YOURS</p><h2>Kín đáo<br /><em>là một lựa chọn.</em></h2><p>Không phải mọi điều có ý nghĩa đều cần được nói lớn.</p><div className="discreet-section__badge"><V2JoyBadge /><span>V2JOY / NIGHT CONFIDENT</span></div></div>
        </section>

        <section className="waitlist-section" id="waitlist">
          <div className="waitlist-cinema"><SafeImage src={ASSETS.lifestyleObjects} alt="Đồ vật chuẩn bị cho một buổi hẹn với TEMPO là chi tiết phụ" /><div className="waitlist-cinema__wash" /><div className="waitlist-cinema__copy"><p className="overline">THE FIRST 1,000</p><h2>Danh sách chờ<br /><em>đã mở.</em></h2><p>Giữ suất. Chờ thông tin mở bán chính thức.</p></div></div>
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
