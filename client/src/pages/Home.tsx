/**
 * TEMPO landing page — The Scheduled Evening.
 * Design cues: graphite privacy, ivory editorial surfaces, Signal Teal rhythm, asymmetric ritual storytelling.
 */
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Leaf,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Waves,
} from "lucide-react";

const HERO_IMAGE = "/manus-storage/tempo-hero_2d201066.jpg";
const RITUAL_IMAGE = "/manus-storage/tempo-pack-unboxing-v2_a23d674c.png";
const BOTANICALS_IMAGE = "/manus-storage/tempo-pack-primary-v2_c0b44398.png";
const DELIVERY_IMAGE = "/manus-storage/tempo-pack-scale-v2_08a79076.png";
const SIGNAL_MARK = "/manus-storage/tempo-signal-mark_669db09e.png";

const packages = [
  {
    id: "3ml",
    name: "TEMPO 3ml",
    price: "349.000đ",
    caption: "12–15 lần dùng",
    detail: "Phiên bản nhỏ gọn để bắt đầu nghi thức.",
  },
  {
    id: "5ml",
    name: "TEMPO 5ml",
    price: "499.000đ",
    caption: "20–25 lần dùng",
    detail: "Lựa chọn cân bằng cho nhịp chuẩn bị đều đặn.",
    featured: true,
  },
  {
    id: "2x5ml",
    name: "Liệu trình 2 × 5ml",
    price: "899.000đ",
    caption: "40–50 lần dùng",
    detail: "Đủ thời gian để làm quen với nghi thức của hai người.",
  },
];

const ritualSteps = [
  {
    time: "18:30",
    title: "Bắt đầu sạch sẽ",
    body: "Vệ sinh sạch và lau khô — khởi đầu mọi nghi thức tử tế.",
  },
  {
    time: "18:35",
    title: "3–4 nhát, thoa đều",
    body: "Chờ 2–3 phút cho khô hẳn trước khi mặc quần để sản phẩm không thấm vào vải.",
  },
  {
    time: "19:00",
    title: "Đi ăn tối. Đi dạo.",
    body: "Khoảng một giờ này không phải thời gian chờ — đó là buổi hẹn mà cả hai vốn nên có.",
  },
  {
    time: "20:00",
    title: "Rửa lại bằng nước sạch",
    body: "Hoàn tất nghi thức theo hướng dẫn, rồi dành trọn sự hiện diện cho nhau.",
  },
];

const faqs = [
  {
    q: "TEMPO có phải là thuốc không?",
    a: "Không. TEMPO được định vị là mỹ phẩm. Sản phẩm không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.",
  },
  {
    q: "Một chai dùng được bao lâu?",
    a: "Theo quy cách trong brief hiện hành, TEMPO 3ml dùng khoảng 12–15 lần và TEMPO 5ml dùng khoảng 20–25 lần. Số lần có thể thay đổi tùy lượng sử dụng thực tế.",
  },
  {
    q: "“Một giờ” ở đây nghĩa là gì?",
    a: "Đó là cách TEMPO kể về thời gian dành cho buổi hẹn: sau khi thực hiện bước chuẩn bị theo hướng dẫn, bạn có thể đi ăn tối hoặc đi dạo. Không nên hiểu đây là lời hứa về một mốc thời gian tác dụng.",
  },
  {
    q: "Đơn hàng có kín đáo không?",
    a: "Concept vận hành đề xuất carton ngoài trung tính, không logo sản phẩm, và tên đơn hàng trung tính. Cần xác nhận lại với đơn vị vận hành trước khi chạy quảng cáo thật.",
  },
];

function scrollToOrder() {
  document.getElementById("dat-lich")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SignalLine({ className = "" }: { className?: string }) {
  return (
    <svg className={`signal-line ${className}`} viewBox="0 0 680 70" fill="none" aria-hidden="true">
      <path d="M0 36C42 36 48 36 79 36C121 36 118 14 151 14C182 14 184 55 217 55C250 55 252 22 286 22C320 22 322 44 355 44C390 44 393 30 426 30C460 30 469 51 504 51C538 51 540 35 575 35C610 35 626 36 680 36" />
      <path d="M0 42C45 42 51 42 82 42C122 42 126 20 155 20C184 20 189 61 220 61C252 61 254 28 288 28C321 28 325 50 359 50C394 50 396 36 430 36C466 36 473 57 507 57C542 57 545 41 577 41C615 41 632 42 680 42" />
    </svg>
  );
}

function SectionEyebrow({ children, dark = false }: { children: string; dark?: boolean }) {
  return <div className={`eyebrow ${dark ? "eyebrow--dark" : ""}`}>{children}</div>;
}

export default function Home() {
  const [selectedId, setSelectedId] = useState("5ml");
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const selectedPackage = packages.find((item) => item.id === selectedId) ?? packages[1];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="tempo-site">
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="TEMPO by V2JOY">
          <img src={SIGNAL_MARK} alt="" className="brand-mark" />
          <span className="brand-tempo">TEMPO</span>
          <span className="brand-by">BY V2JOY</span>
        </a>
        <nav className="desktop-nav" aria-label="Điều hướng chính">
          <a href="#nghi-thuc">Nghi thức</a>
          <a href="#cong-thuc">Công thức</a>
          <a href="#cau-hoi">Giải đáp</a>
        </nav>
        <button className="nav-order" type="button" onClick={scrollToOrder}>
          Chọn gói <ArrowRight size={16} />
        </button>
      </header>
      <aside className="global-signal-rail" aria-hidden="true">
        <span>18:30</span><i /><span>19:00</span><i /><span>20:00</span><i /><b>TEMPO</b>
      </aside>

      <main id="top">
        <section className="hero-section" aria-label="Giới thiệu TEMPO">
          <div className="hero-image" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
          <div className="hero-vignette" />
          <div className="hero-content">
            <SectionEyebrow dark>V2JOY PRESENTS · RITUAL COSMETIC</SectionEyebrow>
            <h1>
              Không phải đợi.<br />
              <em>Là dành một giờ</em><br />
              cho cả hai.
            </h1>
            <p className="hero-copy">
              TEMPO là một nghi thức chuẩn bị kín đáo — để một buổi hẹn bắt đầu từ trước khi hai người ở cạnh nhau.
            </p>
            <div className="hero-actions">
              <button className="button button--teal" type="button" onClick={scrollToOrder}>
                Chọn nhịp chuẩn bị <ArrowRight size={18} />
              </button>
              <a className="text-link text-link--light" href="#nghi-thuc">
                Xem nghi thức 4 bước <span>↘</span>
              </a>
            </div>
            <div className="hero-meta">
              <span>3ml · 12–15 lần dùng</span>
              <span className="meta-dot" />
              <span>5ml · 20–25 lần dùng</span>
            </div>
          </div>
          <div className="hero-note">
            <span className="hero-note__line" />
            <p>Khoảng một giờ đó không phải thời gian chờ. Đó là buổi hẹn.</p>
          </div>
          <SignalLine className="hero-signal" />
        </section>

        <section className="intro-section" aria-label="Tinh thần của TEMPO">
          <div className="intro-stamp">01<br /><span>THE EVENING</span></div>
          <div className="intro-main">
            <SectionEyebrow>CHO MỘT BUỔI HẸN CÓ CHỦ ĐÍCH</SectionEyebrow>
            <p className="intro-display">Chuẩn bị không làm mất tự nhiên. Chuẩn bị là cách bạn <em>có mặt trọn vẹn hơn.</em></p>
          </div>
          <div className="intro-side">
            <p>TEMPO không cổ vũ sự vội vàng hay lời hứa tức thì. Chúng tôi tạo một khoảng riêng để cả hai có thể chậm lại, trò chuyện và bắt nhịp cùng nhau.</p>
            <button className="inline-cta" type="button" onClick={scrollToOrder}>Tôi muốn bắt đầu <ArrowRight size={17} /></button>
          </div>
        </section>

        <section className="ritual-section" id="nghi-thuc">
          <div className="ritual-intro">
            <div>
              <SectionEyebrow dark>NGHI THỨC BỐN BƯỚC</SectionEyebrow>
              <h2>Một nhịp chậm<br /><em>cho một buổi tối đẹp.</em></h2>
            </div>
            <p>Đây là một hướng dẫn trải nghiệm theo brief sản phẩm. Luôn đọc kỹ nhãn và hướng dẫn sử dụng cuối cùng trước khi dùng.</p>
          </div>
          <div className="ritual-layout">
            <div className="ritual-image-wrap">
              <img src={RITUAL_IMAGE} alt="TEMPO trong không gian chuẩn bị buổi tối kín đáo" className="ritual-image" />
              <div className="ritual-image-caption"><Clock3 size={16} /> Nhịp của buổi tối</div>
              <div className="object-label object-label--ritual"><span>TEMPO / 01</span><strong>Một bộ nhỏ,<br />một buổi tối có chủ đích.</strong></div>
            </div>
            <div className="ritual-list">
              {ritualSteps.map((step, index) => (
                <article className="ritual-step" key={step.time}>
                  <div className="ritual-index">0{index + 1}</div>
                  <div className="ritual-time">{step.time}</div>
                  <div className="ritual-content">
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <SignalLine className="ritual-signal" />
        </section>

        <section className="formula-section" id="cong-thuc">
          <div className="formula-copy">
            <SectionEyebrow>MỘT CÔNG THỨC CÓ CHỦ ĐÍCH</SectionEyebrow>
            <h2>Ít ồn ào.<br /><em>Nhiều lưu tâm.</em></h2>
            <p>TEMPO được phát triển theo định hướng mỹ phẩm với 9 thảo dược Đông y trong brief hiện hành và không chứa chất gây tê. Mọi thông tin thành phần, hướng dẫn và cảnh báo cuối cùng cần đối chiếu hồ sơ công bố trước khi phát hành.</p>
            <div className="formula-points">
              <div><Leaf size={19} /><span><strong>9 thảo dược</strong><br />Theo brief sản phẩm hiện hành</span></div>
              <div><Waves size={19} /><span><strong>Không chứa chất gây tê</strong><br />Thông tin cần xác minh cùng hồ sơ công bố</span></div>
              <div><ShieldCheck size={19} /><span><strong>Ưu tiên trải nghiệm của cả hai</strong><br />Thực hiện đủ hướng dẫn trước khi sử dụng</span></div>
            </div>
            <div className="quiet-assurance"><span>NHẮC NHỞ NHỎ</span><p>Đọc kỹ nhãn, làm đúng từng bước, và dành sự tôn trọng như nhau cho trải nghiệm của cả hai.</p></div>
          </div>
          <div className="formula-image-wrap"><img src={BOTANICALS_IMAGE} alt="Mockup hộp và chai TEMPO ivory trong không gian riêng tư" className="formula-image" /><div className="object-label object-label--formula"><span>THE SIGNAL / 03</span><strong>Ivory. Graphite.<br />Một đường teal.</strong></div></div>
        </section>

        <section className="contrast-section">
          <div className="contrast-count">02</div>
          <div className="contrast-text">
            <p className="contrast-label">MỘT GÓC NHÌN KHÁC</p>
            <blockquote>“Thuốc tê cho anh kết quả ngay lần đầu — bằng cách lấy đi cảm giác của anh. TEMPO cần ba bốn lần, vì nó không lấy đi gì cả.”</blockquote>
            <p className="contrast-note">Đây là định hướng thương hiệu trong brief, không phải claim điều trị hoặc cam kết kết quả. Hiệu quả trải nghiệm có thể khác nhau giữa các cá nhân.</p>
          </div>
        </section>

        <section className="discreet-section">
          <div className="discreet-image-wrap"><img src={DELIVERY_IMAGE} alt="TEMPO 3ml đặt cạnh điện thoại để minh họa kích thước nhỏ gọn" className="discreet-image" /><div className="object-label object-label--carry"><span>3ML / POCKET SCALE</span><strong>Nhỏ để đi cùng<br />lịch hẹn của bạn.</strong></div></div>
          <div className="discreet-copy">
            <SectionEyebrow>NHỎ GỌN, NHƯNG CÓ CHỦ ĐÍCH</SectionEyebrow>
            <h2>Đi cùng buổi hẹn,<br /><em>không chen vào buổi hẹn.</em></h2>
            <p>TEMPO 3ml được hình dung là một vật dụng nhỏ gọn, đủ tinh tế để ở cùng những đồ cá nhân quen thuộc. Giao nhận cũng nên giữ đúng tinh thần ấy: kín đáo, gọn gàng, không phô trương.</p>
            <div className="discreet-list">
              <span><LockKeyhole size={16} /> Carton ngoài trung tính</span>
              <span><PackageCheck size={16} /> Gói gọn, không phô trương</span>
              <span><Sparkles size={16} /> Một món chăm sóc có chủ đích</span>
            </div>
          </div>
        </section>

        <section className="selection-section" id="dat-lich">
          <div className="selection-header">
            <div>
              <SectionEyebrow dark>CHỌN NHỊP CỦA BẠN</SectionEyebrow>
              <h2>Một bộ nhỏ.<br /><em>Một sự chuẩn bị lớn.</em></h2>
            </div>
            <p>Chọn gói phù hợp với nhịp sinh hoạt của hai người. Giá hiển thị là thông tin theo brief hiện hành, cần xác nhận lại trước khi chạy ads.</p>
          </div>
          <div className="selection-rail"><span>18:30</span><SignalLine /><span>CHỌN NHỊP</span></div>
          <div className="selection-grid">
            <div className="package-options" role="radiogroup" aria-label="Chọn gói TEMPO">
              {packages.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={selectedId === item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`package-option ${selectedId === item.id ? "is-selected" : ""}`}
                >
                  <span className="package-radio"><span /></span>
                  <span className="package-main">
                    <span className="package-name">{item.name} {item.featured && <small>Chọn nhiều nhất</small>}</span>
                    <span className="package-caption">{item.caption} · {item.detail}</span>
                  </span>
                  <strong>{item.price}</strong>
                </button>
              ))}
            </div>
            <form className="lead-form" onSubmit={handleSubmit}>
              <div className="form-topline"><span>GÓI ĐANG CHỌN</span><strong>{selectedPackage.name} · {selectedPackage.price}</strong></div>
              <h3>Để lại thông tin, đội ngũ sẽ liên hệ kín đáo.</h3>
              <p className="form-disclaimer">Phiên bản landing page này đang ở chế độ demo; dữ liệu chưa được gửi sang CRM hoặc đơn vị vận hành.</p>
              <label>Họ và tên<input required name="name" autoComplete="name" placeholder="Tên của bạn" /></label>
              <label>Số điện thoại<input required name="phone" inputMode="tel" pattern="^0[3-9][0-9]{8}$" autoComplete="tel" placeholder="0xxxxxxxxx" /></label>
              <label>Địa chỉ nhận hàng<textarea required name="address" autoComplete="street-address" placeholder="Số nhà, phường/xã, quận/huyện, tỉnh/thành" rows={3} /></label>
              <button className="button button--teal button--full" type="submit">Tôi cần tư vấn kín đáo <ArrowRight size={18} /></button>
              {submitted && <p className="demo-notice"><Check size={17} /> Đã kiểm tra form ở giao diện. Hãy nối form với CRM/Google Sheet trước khi chạy quảng cáo.</p>}
            </form>
          </div>
        </section>

        <section className="faq-section" id="cau-hoi">
          <div className="faq-intro">
            <SectionEyebrow>GIẢI ĐÁP THẲNG THẮN</SectionEyebrow>
            <h2>Điều bạn cần biết,<br /><em>trước khi bắt đầu.</em></h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <article className={`faq-item ${isOpen ? "is-open" : ""}`} key={faq.q}>
                  <button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)} aria-expanded={isOpen}>
                    <span>0{index + 1}</span><strong>{faq.q}</strong><ChevronDown size={20} />
                  </button>
                  {isOpen && <p>{faq.a}</p>}
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><img src={SIGNAL_MARK} alt="" /><span>TEMPO</span><small>BY V2JOY</small></div>
        <div className="footer-legal">
          <p>Sản phẩm là mỹ phẩm, không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.</p>
          <p>Thương hiệu V2JOY · Sản xuất: Công ty TNHH SX Công nghệ cao NanoFrance · Số công bố: <strong>Điền khi có</strong></p>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} V2JOY. A slower signal, shared.</p>
      </footer>

      <div className="sticky-cta" role="region" aria-label="Chọn gói TEMPO">
        <div><span>Từ 349.000đ</span><strong>TEMPO</strong></div>
        <button type="button" onClick={scrollToOrder}>Chọn gói <ArrowRight size={17} /></button>
      </div>
    </div>
  );
}
