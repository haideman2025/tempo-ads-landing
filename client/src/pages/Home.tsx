import { FormEvent, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Clock3, LockKeyhole, Mail, X } from "lucide-react";
import { trpc } from "@/lib/trpc";

const V2JOY_LOGO = "/manus-storage/v2joylogo-official_87b7dfc4.jpg";
const VIDEO_ARRIVAL = "/manus-storage/tempo-video-01-arrival_2c34df78.mp4";

const ASSETS = {
  heroPoster: "/manus-storage/tempo-h01-night-confident-hero_05e26f4e.jpg",
  signalHero: "/manus-storage/tempo-h02-teal-signal-hero_bd3a2334.jpg",
  pack3ml: "/manus-storage/tempo-p01-3ml-front_b95aa838.jpg",
  pack5ml: "/manus-storage/tempo-p02-5ml-front_c2429f23.jpg",
  packDuo: "/manus-storage/tempo-p03-duo_f9127d21.jpg",
  packCourse: "/manus-storage/tempo-p04-course-2x5ml_68d9a5cb.jpg",
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
};

type PreferredSku = "3ml" | "5ml" | "duo" | "course-2x5ml";

const productChoices = [
  { id: "3ml" as const, step: "01", name: "TEMPO 3ml", title: "Nhịp làm quen", note: "Format gọn cho lịch hẹn đầu tiên", image: ASSETS.approvedScale },
  { id: "5ml" as const, step: "02", name: "TEMPO 5ml", title: "Nhịp đều đặn", note: "Format đầy đủ cho routine riêng tư", image: ASSETS.masterTabletop },
  { id: "duo" as const, step: "03", name: "TEMPO Duo", title: "Ở nhà, đi xa", note: "3ml mang theo + 5ml cho routine tại nhà", image: ASSETS.approvedUnboxing },
  { id: "course-2x5ml" as const, step: "04", name: "TEMPO 2×5ml", title: "Nhịp quay lại", note: "Bundle hai chai 5ml cho lựa chọn đầy đủ hơn", image: ASSETS.masterTabletop },
];

const visualDiary = [
  { src: ASSETS.diaryExit, index: "01", kicker: "THE EXIT", title: "Rời khỏi ngày dài", copy: "Một cuộc hẹn có chủ đích bắt đầu từ lúc bạn rời nhịp vội." },
  { src: ASSETS.diaryPause, index: "02", kicker: "THE PAUSE", title: "Để lại một khoảng", copy: "Chỉ một khoảng lặng đủ để bạn trở về với chính mình." },
  { src: ASSETS.diarySignal, index: "03", kicker: "THE SIGNAL", title: "Chọn điều vừa đủ", copy: "Những chi tiết nhỏ được đặt đúng lúc, không cần phô trương." },
  { src: ASSETS.diaryChoose, index: "04", kicker: "THE FORMAT", title: "Chọn nhịp riêng", copy: "3ml hay 5ml, lựa chọn bắt đầu từ bối cảnh của bạn." },
  { src: ASSETS.diaryTogether, index: "05", kicker: "READY TOGETHER", title: "Đủ cho cả hai", copy: "Một không gian gọn gàng, một lời hẹn được chuẩn bị kỹ." },
  { src: ASSETS.diaryArrival, index: "06", kicker: "THE ARRIVAL", title: "Đến với sự hiện diện", copy: "Bạn không cần vội; chỉ cần bước vào buổi tối đúng nhịp." },
  { src: ASSETS.diaryEvening, index: "07", kicker: "THE EVENING", title: "Giữ đêm ở lại", copy: "Ánh sáng dịu đi, cuộc trò chuyện có thêm chỗ để bắt đầu." },
  { src: ASSETS.diaryDetail, index: "08", kicker: "THE DETAIL", title: "Chi tiết nói thay", copy: "Kín đáo không có nghĩa là qua loa, mà là có chủ đích." },
  { src: ASSETS.diaryHomeAway, index: "09", kicker: "HOME + AWAY", title: "Ở nhà, đi xa", copy: "Mỗi format có một nơi xuất hiện tự nhiên trong nhịp sống." },
  { src: ASSETS.diaryReturn, index: "10", kicker: "THE RETURN", title: "Mang nhịp về lại", copy: "Một ritual không cần ồn ào để trở thành điều bạn muốn lặp lại." },
] as const;

function goToWaitlist() {
  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Signal({ className = "" }: { className?: string }) {
  return <svg className={`signal ${className}`} viewBox="0 0 560 80" fill="none" aria-hidden="true"><path d="M0 43H58c30 0 29-23 56-23 29 0 25 43 56 43 33 0 25-35 56-35 35 0 23 30 58 30 29 0 27-20 57-20 27 0 30 13 56 13h56" /></svg>;
}

function SafeImage({ src, alt, className = "", fallback = ASSETS.masterTabletop }: { src: string; alt: string; className?: string; fallback?: string }) {
  return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" onError={({ currentTarget }) => {
    if (currentTarget.dataset.fallbackApplied) return;
    currentTarget.dataset.fallbackApplied = "true";
    currentTarget.src = fallback;
  }} />;
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
        <a href="#top" className="brand" aria-label="TEMPO by V2JOY"><img src={V2JOY_LOGO} alt="V2JOY" /><span className="tempo-wordmark">TEMPO</span><small>PRE-ORDER / 01</small></a>
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
            <p className="hero-lead">Một ritual kín đáo, bắt đầu trước cuộc hẹn — để bạn bước vào buổi tối với sự hiện diện trọn vẹn hơn.</p>
            <div className="hero-actions"><button onClick={goToWaitlist} type="button" className="teal-button">Vào danh sách chờ <ArrowDownRight size={18} /></button><a href="#story" className="ghost-link">Xem câu chuyện <span>↓</span></a></div>
          </div>
          <div className="hero-counter"><b>{remaining.toLocaleString("vi-VN")}</b><span>lời mời đầu tiên<br />còn mở</span></div>
          <div className="hero-footer"><span>TEMPO 3ml · 5ml</span><Signal /><span>KÍN ĐÁO / CÓ CHỦ ĐÍCH</span></div>
        </section>

        <section className="opening" id="story">
          <div className="chapter">WHY / 01 · THE EXIT</div>
          <div className="opening-title"><p>Rời khỏi ngày dài.</p><h2>Để buổi tối<br /><em>thuộc về cả hai.</em></h2></div>
          <p className="opening-copy">Night Confident không bắt đầu khi bạn gặp nhau. Nó bắt đầu từ khoảnh khắc bạn chủ động rời khỏi nhịp vội vã, chuẩn bị vừa đủ, và dành không gian cho một cuộc hẹn có chủ đích.</p>
        </section>

        <section className="cinema-section">
          <EditorialVideo />
          <div className="cinema-section__copy"><p className="overline">02 / SET THE TONE</p><h2>Bật một ánh đèn.<br /><em>Đổi một nhịp.</em></h2><p>Một điểm dừng dành cho bạn trước khi đi. Không phô trương, chỉ có chi tiết được chọn đúng lúc.</p><span className="micro-note">VIDEO DÙNG ĐỂ GỢI NHỊP · ÂM THANH MẶC ĐỊNH TẮT</span></div>
        </section>

        <section className="story-panel story-panel--pocket">
          <div className="story-image story-image--contain"><img src={ASSETS.approvedScale} alt="TEMPO 3ml đặt cạnh điện thoại để minh hoạ quy cách" loading="lazy" /><span className="image-index">3ML / TRUE SCALE</span></div>
          <div className="story-copy"><p className="overline overline--dark">HOW / 01 · CARRY THE SIGNAL</p><h2>Nhỏ để đi cùng<br /><em>lịch hẹn của bạn.</em></h2><p>TEMPO được thiết kế như một vật dụng chăm sóc cá nhân kín đáo: quy cách gọn, nhận diện rõ ràng và thông tin cần thiết được đặt trên nhãn, không được che bằng lời hứa phóng đại.</p><button onClick={() => { setPreferredSku("3ml"); goToWaitlist(); }} type="button" className="text-button">Chọn nhịp 3ml <ArrowUpRight size={16} /></button></div>
        </section>

        <section className="signal-break"><div><p className="overline">TEMPO IS A RITUAL OBJECT</p><h2>Không cần vội.<br /><em>Chỉ cần có mặt.</em></h2><p>Một hệ hình ảnh lấy graphite, ivory và Signal Teal làm nhịp dẫn. Các visual là concept phục vụ đánh giá trước khi sản xuất.</p></div><SafeImage src={ASSETS.diarySignal} alt="TEMPO trong khoảnh khắc chuẩn bị với Signal Teal" /><Signal className="signal-break-line" /></section>

        <section className="story-panel story-panel--ritual">
          <div className="story-copy"><p className="overline">HOW / 02 · BEFORE YOU GO</p><h2>Chuẩn bị một chút.<br /><em>Khác biệt rất nhiều.</em></h2><p>Giải pháp của TEMPO bắt đầu từ sự rõ ràng: thiết kế kín đáo, lựa chọn quy cách theo bối cảnh và hướng dẫn sử dụng cần được đối chiếu trên nhãn chính thức trước khi dùng.</p><ul><li><Clock3 size={16} /> Theo hướng dẫn công bố trên nhãn</li><li><LockKeyhole size={16} /> Một routine riêng tư, tôn trọng cả hai</li></ul></div>
          <div className="story-image"><SafeImage src={ASSETS.diaryEvening} alt="TEMPO 5ml trong không gian ritual riêng tư" /><span className="image-index">5ML / RITUAL FORMAT</span></div>
        </section>

        <section className="ingredient-origin" id="nguon-goc">
          <div className="ingredient-origin__heading"><p className="overline overline--dark">HOW / 03 · MINH BẠCH TRƯỚC LỜI HỨA</p><h2>Một công thức<br /><em>cần được nói rõ.</em></h2><p>TEMPO chọn cách nói ít hơn nhưng rõ hơn: thông tin công thức, nguồn gốc và giấy tờ cần thiết sẽ được công bố để bạn có thể đọc, đối chiếu và quyết định — không phải dựa trên claim điều trị hay lời hứa về thời lượng.</p></div>
          <div className="ingredient-origin__grid">
            <article><span>01 / FORMULA</span><h3>Đọc INCI<br />đầy đủ</h3><p>Danh mục thành phần sẽ được công bố trên nhãn cuối cùng và trong trang thông tin mở bán, để bạn không phải đoán về những gì đang chọn.</p></article>
            <article><span>02 / ORIGIN</span><h3>Truy xuất<br />rõ ràng</h3><p>Thông tin nhà sản xuất, tổ chức chịu trách nhiệm và xuất xứ sẽ được đối chiếu theo hồ sơ công bố và bao bì chính thức khi TEMPO mở bán.</p></article>
            <article><span>03 / PROOF</span><h3>Đọc nhãn<br />trước khi dùng</h3><p>Số lô, NSX/HSD, hướng dẫn sử dụng và các thông tin bắt buộc sẽ được trình bày để bạn kiểm tra ngay trên sản phẩm thực tế.</p></article>
          </div>
          <div className="ingredient-origin__note"><LockKeyhole size={16} /><span>Trang này chưa thay thế nhãn hoặc hồ sơ công bố. Chỉ thông tin trùng khớp bao bì và hồ sơ chính thức tại thời điểm mở bán mới là thông tin áp dụng cho sản phẩm.</span></div>
        </section>

        <section className="product-block" id="san-pham">
          <div className="product-block__top"><div><p className="overline overline--dark">WHAT / THE FIRST EDITION</p><h2>Chọn nhịp<br /><em>đi cùng bạn.</em></h2></div><p>Bốn lựa chọn cho bốn bối cảnh: 3ml làm quen, 5ml cho routine, Duo ở nhà/đi xa và 2×5ml cho lựa chọn đầy đủ hơn. Visual pack sử dụng mockup quy cách đã phê duyệt; ảnh sản phẩm thật sẽ thay thế khi có mẫu.</p></div>
          <div className="format-grid">
            {productChoices.map(item => <article className="format-card" key={item.id}><div className="format-card__image"><SafeImage src={item.image} alt={`Mockup ${item.name}`} /></div><div className="format-card__copy"><span>{item.step} / {item.name}</span><h3>{item.title}</h3><p>{item.note}</p><button type="button" onClick={() => { setPreferredSku(item.id); goToWaitlist(); }}>Chọn {item.name} <ArrowUpRight size={15} /></button></div></article>)}
          </div>
        </section>

        <section className="info-ribbon" aria-label="Thông tin chọn dung tích TEMPO">
          <div className="info-ribbon__intro"><p className="overline">WHAT / FIND YOUR FORMAT</p><h2>Bắt đầu<br /><em>đúng chỗ.</em></h2><p>Khung giá và thông tin thương mại chỉ được công bố sau khi chốt giá vốn, quy định nhãn và điều kiện mở bán. Bạn vẫn có thể giữ suất cho đúng lựa chọn mình quan tâm.</p><button className="teal-button" type="button" onClick={goToWaitlist}>Chọn pack trong form <ArrowDownRight size={17} /></button></div>
          <div className="info-ribbon__cards"><SafeImage src={ASSETS.infoValue} alt="Khung lựa chọn TEMPO 3ml, 5ml, Duo và 2 chai 5ml" /></div>
        </section>

        <section className="gallery-section" aria-label="Nhật ký visual TEMPO">
          <div className="gallery-heading"><p className="overline">THE VISUAL DIARY / 10 CHAPTERS</p><h2>Không chỉ một ảnh.<br /><em>Mà là cả một buổi tối.</em></h2><p>Một chuỗi cảnh liên tục đi từ nhịp tan làm đến khoảnh khắc chuẩn bị, gặp gỡ và mang nhịp ấy về lại không gian riêng.</p></div>
          <div className="gallery-grid gallery-grid--diary">{visualDiary.map(frame => <figure key={frame.index}><SafeImage src={frame.src} alt={`${frame.index} / ${frame.kicker} — ${frame.title}`} /><div className="gallery-grid__copy"><span>{frame.index} / {frame.kicker}</span><h3>{frame.title}</h3><p>{frame.copy}</p></div></figure>)}</div>
        </section>

        <section className="design-proof">
          <div className="design-proof__copy"><p className="overline">DESIGN STUDIES / TRUE SCALE</p><h2>Quy cách được<br /><em>nhìn từ nhiều phía.</em></h2><p>Mockup phê duyệt giúp đánh giá tỷ lệ 3ml cạnh điện thoại, ngôn ngữ hộp, màu ivory soft-touch và trải nghiệm mở hộp. Chúng không thay thế ảnh sản phẩm thật.</p><div className="design-proof__marks"><span>3ML / 5ML</span><span>IVORY SOFT-TOUCH</span><span>SIGNAL TEAL</span></div></div>
          <div className="design-proof__images"><img src={ASSETS.approvedScale} alt="TEMPO 3ml đặt cạnh điện thoại để đánh giá kích thước" loading="lazy" /><img src={ASSETS.approvedPrimary} alt="Mockup bao bì TEMPO đã phê duyệt" loading="lazy" /><img src={ASSETS.approvedUnboxing} alt="Mockup trải nghiệm mở hộp TEMPO" loading="lazy" /></div>
        </section>

        <section className="discreet-section">
          <div className="discreet-section__image"><img src={ASSETS.infoDiscreet} alt="Thông điệp trải nghiệm kín đáo TEMPO" loading="lazy" /></div>
          <div className="discreet-section__copy"><p className="overline">05 / KEEP IT YOURS</p><h2>Kín đáo<br /><em>là một lựa chọn.</em></h2><p>Từ cách thiết kế đến cách tiếp cận danh sách chờ, mọi điểm chạm đều hướng đến trải nghiệm riêng tư và có chủ đích.</p><img src={ASSETS.infoRitual} alt="Nhịp ritual TEMPO" loading="lazy" /></div>
        </section>

        <section className="waitlist-section" id="waitlist">
          <div className="waitlist-cinema"><img src={ASSETS.masterTabletop} alt="TEMPO 3ml và 5ml với bao bì ivory đã phê duyệt" loading="lazy" /><div className="waitlist-cinema__wash" /><div className="waitlist-cinema__copy"><p className="overline">THE FIRST 1,000</p><h2>Danh sách chờ<br /><em>đã mở.</em></h2><p>Đăng ký để nhận quyền ưu tiên khi TEMPO hoàn thiện phiên bản đầu tiên.</p></div></div>
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

      <footer><div className="footer-brand"><img src={V2JOY_LOGO} alt="V2JOY" /><span>TEMPO</span></div><p>Concept visual và landing pre-order · Night Confident</p><p>Sản phẩm là mỹ phẩm, không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.</p></footer>
      <div className="mobile-sticky"><div><span>{remaining.toLocaleString("vi-VN")} suất đầu</span><b>TEMPO / WAITLIST</b></div><button type="button" onClick={goToWaitlist}>Giữ suất <ArrowUpRight size={16} /></button></div>
    </div>
  );
}
