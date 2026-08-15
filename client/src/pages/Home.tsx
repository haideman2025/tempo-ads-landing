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
};

const productChoices = [
  { id: "3ml" as const, name: "TEMPO 3ml", note: "Pocket format · mang theo nhịp hẹn" },
  { id: "5ml" as const, name: "TEMPO 5ml", note: "Ritual format · nhịp chuẩn bị đầy đủ" },
];

const visualDiary = [
  [ASSETS.pocket, "01 / POCKET SIGNAL"],
  [ASSETS.desk, "02 / WORKDAY TO NIGHT"],
  [ASSETS.travel, "03 / WEEKEND READY"],
  [ASSETS.shelf, "04 / PRIVATE SHELF"],
  [ASSETS.nightstand, "05 / NIGHTSTAND"],
  [ASSETS.homeAway, "06 / HOME + AWAY"],
  [ASSETS.gift, "07 / GIFT READY"],
  [ASSETS.date, "08 / THE TABLE"],
  [ASSETS.return, "09 / RETURN RITUAL"],
  [ASSETS.packScale, "10 / TRUE SCALE"],
] as const;

function goToWaitlist() {
  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Signal({ className = "" }: { className?: string }) {
  return <svg className={`signal ${className}`} viewBox="0 0 560 80" fill="none" aria-hidden="true"><path d="M0 43H58c30 0 29-23 56-23 29 0 25 43 56 43 33 0 25-35 56-35 35 0 23 30 58 30 29 0 27-20 57-20 27 0 30 13 56 13h56" /></svg>;
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
  const [preferredSku, setPreferredSku] = useState<"3ml" | "5ml">("5ml");
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
          <div className="chapter">01 / THE EXIT</div>
          <div className="opening-title"><p>Rời khỏi ngày dài.</p><h2>Để buổi tối<br /><em>thuộc về cả hai.</em></h2></div>
          <p className="opening-copy">Night Confident không bắt đầu khi bạn gặp nhau. Nó bắt đầu từ khoảnh khắc bạn chủ động rời khỏi nhịp vội vã, chuẩn bị vừa đủ, và dành không gian cho một cuộc hẹn có chủ đích.</p>
        </section>

        <section className="cinema-section">
          <EditorialVideo />
          <div className="cinema-section__copy"><p className="overline">02 / SET THE TONE</p><h2>Bật một ánh đèn.<br /><em>Đổi một nhịp.</em></h2><p>Một điểm dừng dành cho bạn trước khi đi. Không phô trương, chỉ có chi tiết được chọn đúng lúc.</p><span className="micro-note">VIDEO DÙNG ĐỂ GỢI NHỊP · ÂM THANH MẶC ĐỊNH TẮT</span></div>
        </section>

        <section className="story-panel story-panel--pocket">
          <div className="story-image"><img src={ASSETS.pocket} alt="TEMPO 3ml trong túi áo khoác" loading="lazy" /><span className="image-index">3ML / POCKET SIGNAL</span></div>
          <div className="story-copy"><p className="overline overline--dark">03 / CARRY THE SIGNAL</p><h2>Nhỏ để đi cùng<br /><em>lịch hẹn của bạn.</em></h2><p>TEMPO 3ml được hình dung như một vật dụng cá nhân, không cần phô trương. Một điểm chạm nhỏ trong nhịp chuẩn bị của riêng bạn.</p><button onClick={goToWaitlist} type="button" className="text-button">Khám phá 3ml <ArrowUpRight size={16} /></button></div>
        </section>

        <section className="signal-break"><div><p className="overline">TEMPO IS A RITUAL OBJECT</p><h2>Không cần vội.<br /><em>Chỉ cần có mặt.</em></h2><p>Một hệ hình ảnh lấy graphite, ivory và Signal Teal làm nhịp dẫn. Các visual là concept phục vụ đánh giá trước khi sản xuất.</p></div><img src={ASSETS.signalHero} alt="TEMPO trên nền teal signal" loading="lazy" /><Signal className="signal-break-line" /></section>

        <section className="story-panel story-panel--ritual">
          <div className="story-copy"><p className="overline">04 / BEFORE YOU GO</p><h2>Chuẩn bị một chút.<br /><em>Khác biệt rất nhiều.</em></h2><p>TEMPO 5ml là nhịp chuẩn bị đầy đủ hơn, dành cho những buổi tối bạn muốn tiến chậm lại. Luôn đối chiếu hướng dẫn sử dụng cuối cùng trên nhãn trước khi dùng.</p><ul><li><Clock3 size={16} /> Thực hiện theo đúng hướng dẫn</li><li><LockKeyhole size={16} /> Một ritual riêng tư, tôn trọng cả hai</li></ul></div>
          <div className="story-image"><img src={ASSETS.ritual} alt="TEMPO 5ml trong không gian ritual riêng tư" loading="lazy" /><span className="image-index">5ML / RITUAL FORMAT</span></div>
        </section>

        <section className="product-block" id="san-pham">
          <div className="product-block__top"><div><p className="overline overline--dark">THE FIRST EDITION</p><h2>Chọn nhịp<br /><em>đi cùng bạn.</em></h2></div><p>Hệ sản phẩm gồm 3ml dùng thử, 5ml dùng thường xuyên, Duo linh hoạt và bundle 2×5ml. Hình ảnh là concept visual để đánh giá trước khi sản xuất thực tế.</p></div>
          <div className="format-grid">
            <article className="format-card format-card--feature"><img src={ASSETS.pack3ml} alt="Packshot TEMPO 3ml" loading="lazy" /><div><span>01 / 3ML</span><h3>Nhịp mang theo</h3><p>Dành cho lần làm quen đầu tiên và lịch hẹn cần sự gọn nhẹ.</p></div></article>
            <article className="format-card"><img src={ASSETS.pack5ml} alt="Packshot TEMPO 5ml" loading="lazy" /><div><span>02 / 5ML</span><h3>Nhịp đều đặn</h3><p>Một format đầy đủ hơn cho ritual riêng tư thường xuyên.</p></div></article>
            <article className="format-card"><img src={ASSETS.packDuo} alt="Packshot TEMPO Duo 3ml và 5ml" loading="lazy" /><div><span>03 / DUO</span><h3>Ở nhà, đi xa</h3><p>Hai dung tích cho hai bối cảnh, cùng một ngôn ngữ thiết kế.</p></div></article>
            <article className="format-card"><img src={ASSETS.packCourse} alt="Packshot TEMPO liệu trình 2 chai 5ml" loading="lazy" /><div><span>04 / 2×5ML</span><h3>Nhịp quay lại</h3><p>Bundle dành cho người đã quen với một trải nghiệm đều đặn hơn.</p></div></article>
          </div>
        </section>

        <section className="info-ribbon" aria-label="Thông tin chọn dung tích TEMPO">
          <div className="info-ribbon__intro"><p className="overline">FIND YOUR FORMAT</p><h2>Bắt đầu<br /><em>đúng chỗ.</em></h2><p>Khung giá và thông tin thương mại sẽ chỉ được công bố sau khi chốt giá vốn, quy định nhãn và điều kiện mở bán.</p></div>
          <div className="info-ribbon__cards"><img src={ASSETS.info3ml} alt="Thông tin TEMPO 3ml" loading="lazy" /><img src={ASSETS.info5ml} alt="Thông tin TEMPO 5ml" loading="lazy" /><img src={ASSETS.infoDuo} alt="Thông tin TEMPO Duo" loading="lazy" /></div>
        </section>

        <section className="gallery-section" aria-label="Nhật ký visual TEMPO">
          <div className="gallery-heading"><p className="overline">THE VISUAL DIARY / 10 FRAMES</p><h2>Không chỉ một ảnh.<br /><em>Mà là cả một buổi tối.</em></h2><p>Chuỗi hình đi qua bàn làm việc, túi áo, chuyến đi và khoảnh khắc chuẩn bị — để mỗi format có bối cảnh xuất hiện riêng.</p></div>
          <div className="gallery-grid">{visualDiary.map(([src, label]) => <figure key={src}><img src={src} alt={label} loading="lazy" /><figcaption>{label}</figcaption></figure>)}</div>
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
          <div className="waitlist-cinema"><img src={ASSETS.date} alt="TEMPO trong bối cảnh chuẩn bị cho cuộc hẹn" loading="lazy" /><div className="waitlist-cinema__wash" /><div className="waitlist-cinema__copy"><p className="overline">THE FIRST 1,000</p><h2>Danh sách chờ<br /><em>đã mở.</em></h2><p>Đăng ký để nhận quyền ưu tiên khi TEMPO hoàn thiện phiên bản đầu tiên.</p></div></div>
          <div className="waitlist-form-wrap">
            <div className="waitlist-topline"><span>PRIVATE ACCESS / 01</span><span>{claimed.toLocaleString("vi-VN")} / 1.000 đã ghi nhận</span></div>
            <h2>Giữ một suất<br />cho nhịp của bạn.</h2>
            <p className="form-intro">Đây là đăng ký hàng chờ, chưa phải thanh toán hay xác nhận đặt hàng. V2JOY sẽ liên hệ khi có thông tin mở bán chính thức.</p>
            <form className="waitlist-form" onSubmit={submitWaitlist}>
              <div className="sku-choice" role="radiogroup" aria-label="Chọn dung tích quan tâm">{productChoices.map(item => <button key={item.id} type="button" role="radio" aria-checked={preferredSku === item.id} onClick={() => setPreferredSku(item.id)} className={preferredSku === item.id ? "is-active" : ""}><span>{item.name}</span><small>{item.note}</small></button>)}</div>
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
