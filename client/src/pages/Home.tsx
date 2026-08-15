import { FormEvent, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Clock3, LockKeyhole, Mail, Phone, Sparkles, X } from "lucide-react";
import { trpc } from "@/lib/trpc";

const V2JOY_LOGO = "/manus-storage/v2joylogo-official_87b7dfc4.jpg";
const APPROVED_PACK = {
  primary: "/manus-storage/tempo-pack-primary-v2_0c76aa1c.png",
  unboxing: "/manus-storage/tempo-pack-unboxing-v2_b2033bfd.png",
  scale: "/manus-storage/tempo-pack-scale-v2_1419d3e8.png",
};
const IMAGES = {
  hero: APPROVED_PACK.primary,
  pocket: APPROVED_PACK.scale,
  scale: APPROVED_PACK.scale,
  ritual: APPROVED_PACK.unboxing,
  pair: APPROVED_PACK.primary,
  signal: APPROVED_PACK.primary,
  unboxing: APPROVED_PACK.unboxing,
  travel: APPROVED_PACK.scale,
  macro: APPROVED_PACK.primary,
  daylight: APPROVED_PACK.unboxing,
  evening: APPROVED_PACK.primary,
  nightstand: APPROVED_PACK.unboxing,
  jacket: APPROVED_PACK.scale,
};

const productChoices = [
  { id: "3ml" as const, name: "TEMPO 3ml", note: "Pocket format · mang theo nhịp hẹn" },
  { id: "5ml" as const, name: "TEMPO 5ml", note: "Ritual format · nhịp chuẩn bị đầy đủ" },
];

const gallery = [APPROVED_PACK.primary, APPROVED_PACK.unboxing, APPROVED_PACK.scale];

function goToWaitlist() {
  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Signal({ className = "" }: { className?: string }) {
  return <svg className={`signal ${className}`} viewBox="0 0 560 80" fill="none" aria-hidden="true"><path d="M0 43H58c30 0 29-23 56-23 29 0 25 43 56 43 33 0 25-35 56-35 35 0 23 30 58 30 29 0 27-20 57-20 27 0 30 13 56 13h56" /></svg>;
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
          <img className="hero-media" src={IMAGES.hero} alt="TEMPO 3ml và 5ml trong không gian graphite" />
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

        <section className="story-panel story-panel--pocket">
          <div className="story-image"><img src={IMAGES.pocket} alt="TEMPO 3ml nhỏ gọn trong túi áo khoác" /><span className="image-index">3ML / POCKET SIGNAL</span></div>
          <div className="story-copy"><p className="overline overline--dark">02 / CARRY THE SIGNAL</p><h2>Nhỏ để đi cùng<br /><em>lịch hẹn của bạn.</em></h2><p>TEMPO 3ml được hình dung như một vật dụng cá nhân, không cần phô trương. Một điểm chạm nhỏ trong nhịp chuẩn bị của riêng bạn.</p><button onClick={goToWaitlist} type="button" className="text-button">Khám phá 3ml <ArrowUpRight size={16} /></button></div>
        </section>

        <section className="signal-break"><div><p className="overline">TEMPO IS A RITUAL OBJECT</p><h2>Không cần vội.<br /><em>Chỉ cần có mặt.</em></h2></div><img src={IMAGES.signal} alt="TEMPO 5ml trên nền đồ họa Signal Teal" /><Signal className="signal-break-line" /></section>

        <section className="story-panel story-panel--ritual">
          <div className="story-copy"><p className="overline">03 / BEFORE YOU GO</p><h2>Chuẩn bị một chút.<br /><em>Khác biệt rất nhiều.</em></h2><p>TEMPO 5ml là nhịp chuẩn bị đầy đủ hơn, dành cho những buổi tối bạn muốn tiến chậm lại. Luôn đối chiếu hướng dẫn sử dụng cuối cùng trên nhãn trước khi dùng.</p><ul><li><Clock3 size={16} /> Thực hiện theo đúng hướng dẫn</li><li><LockKeyhole size={16} /> Một ritual riêng tư, tôn trọng cả hai</li></ul></div>
          <div className="story-image"><img src={IMAGES.ritual} alt="TEMPO 5ml trong không gian ritual riêng tư" /><span className="image-index">5ML / RITUAL FORMAT</span></div>
        </section>

        <section className="product-block" id="san-pham">
          <div className="product-block__top"><div><p className="overline overline--dark">THE FIRST EDITION</p><h2>Chọn nhịp<br /><em>đi cùng bạn.</em></h2></div><p>Một hệ sản phẩm mini 3ml và 5ml được tạo cho trải nghiệm kín đáo. Hình ảnh dưới đây là concept visual để đánh giá trước khi sản xuất thực tế.</p></div>
          <div className="product-pair"><img src={IMAGES.pair} alt="TEMPO 3ml và 5ml phiên bản concept" /><div className="pair-note"><span>FORM / 01</span><strong>3ml cho nhịp di chuyển.<br />5ml cho nhịp chuẩn bị.</strong></div></div>
          <div className="product-tiles"><article><img src={IMAGES.scale} alt="TEMPO 3ml đặt cạnh điện thoại để thể hiện kích thước" /><div><span>03ML</span><p>Pocket-size, đặt cạnh điện thoại để hình dung tỷ lệ.</p></div></article><article><img src={IMAGES.unboxing} alt="Trải nghiệm mở hộp TEMPO phiên bản concept" /><div><span>05ML</span><p>Ritual format với trải nghiệm mở hộp kín đáo.</p></div></article></div>
        </section>

        <section className="gallery-section" aria-label="Bộ visual concept TEMPO">
          <div className="gallery-heading"><p className="overline">PACKAGING STUDIES / CORE</p><h2>Nhìn đúng<br /><em>quy cách trước.</em></h2><p>Ba góc mockup cốt lõi cố định quy cách 3ml/5ml, tỷ lệ 3ml cạnh điện thoại và trải nghiệm mở hộp. Không dùng thay cho ảnh sản phẩm thực tế.</p></div>
          <div className="gallery-grid">{gallery.map((src, index) => <figure key={src}><img src={src} alt={`Visual concept TEMPO ${String(index + 1).padStart(2, "0")}`} loading="lazy" /><figcaption>{String(index + 1).padStart(2, "0")} / TEMPO STUDY</figcaption></figure>)}</div>
        </section>

        <section className="waitlist-section" id="waitlist">
          <div className="waitlist-cinema"><img src={IMAGES.evening} alt="TEMPO trong bối cảnh chuẩn bị buổi tối" /><div className="waitlist-cinema__wash" /><div className="waitlist-cinema__copy"><p className="overline">THE FIRST 1,000</p><h2>Danh sách chờ<br /><em>đã mở.</em></h2><p>Đăng ký để nhận quyền ưu tiên khi TEMPO hoàn thiện phiên bản đầu tiên.</p></div></div>
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
          ["Hình ảnh trên trang đã là sản phẩm thật chưa?", "Chưa. Đây là bộ concept visual cho giai đoạn đánh giá thiết kế trước sản xuất. Màu sắc, bao bì và thông tin cuối cùng cần được chốt lại trên mẫu thật."],
          ["TEMPO có phải là thuốc không?", "Không. TEMPO được định hướng là mỹ phẩm. Không dùng trang này thay cho hướng dẫn, nhãn và hồ sơ công bố chính thức."],
        ].map(([question, answer], index) => <article key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>0{index + 1}</span><b>{question}</b><ChevronDown size={18} /></button>{openFaq === index && <p>{answer}</p>}</article>)}</div></section>
      </main>

      <footer><div className="footer-brand"><img src={V2JOY_LOGO} alt="V2JOY" /><span>TEMPO</span></div><p>Concept visual và landing pre-order · Night Confident</p><p>Sản phẩm là mỹ phẩm, không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.</p></footer>
      <div className="mobile-sticky"><div><span>{remaining.toLocaleString("vi-VN")} suất đầu</span><b>TEMPO / WAITLIST</b></div><button type="button" onClick={goToWaitlist}>Giữ suất <ArrowUpRight size={16} /></button></div>
    </div>
  );
}
