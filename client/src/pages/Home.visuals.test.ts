import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
const styles = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");
const documentHtml = readFileSync(resolve(process.cwd(), "client/index.html"), "utf8");

describe("TEMPO sales landing visual system", () => {
  it("orders the five supplied motion assets as story 01 through 05", () => {
    const assets = [
      "1-3_488cdaeb.mp4",
      "2-2_1c24d56b.mp4",
      "3-2_1be35ced.mp4",
      "4-2_5b3104ee.mp4",
      "5-2_104c988a.mp4",
    ];
    let previousIndex = -1;
    for (const asset of assets) {
      const nextIndex = source.indexOf(asset);
      expect(nextIndex).toBeGreaterThan(previousIndex);
      previousIndex = nextIndex;
    }
    expect(source).toContain("CÁCH TEMPO ĐI CÙNG BẠN");
    expect(source).toContain("CHƯƠNG {active.step} / 05");
    const landingSequence = [
      '<source src={ASSETS.motionReservation} type="video/mp4" />',
      '<VideoStoryScene step="02"',
      '<VideoStoryScene step="03"',
      '<VideoStoryScene step="04"',
      '<VideoStoryScene step="05"',
    ];
    let previousLandingIndex = -1;
    for (const marker of landingSequence) {
      const nextLandingIndex = source.indexOf(marker);
      expect(nextLandingIndex).toBeGreaterThan(previousLandingIndex);
      previousLandingIndex = nextLandingIndex;
    }
  });

  it("keeps hero playback resilient and the motion timeline touch-accessible", () => {
    expect(source).toContain("const videoRef = useRef<HTMLVideoElement>(null)");
    expect(source).toContain("const playAttempt = video.play()");
    expect(source).toContain("autoPlay muted loop playsInline preload=\"auto\"");
    expect(source).toContain('data-playback-state={playbackState}');
    expect(source).toContain('video-frame__fallback');
    expect(source).toContain('VIDEO ĐANG PHÁT');
    expect(source).toContain("function MotionCarousel");
    expect(source).toContain("aria-roledescription=\"carousel\"");
    expect(source).toContain("role=\"tablist\"");
    expect(source).toContain("onTouchStart={handleTouchStart}");
    expect(source).toContain("onTouchEnd={handleTouchEnd}");
    expect(source).toContain("Math.abs(endX - startX) < 44");
    expect(source).toContain("onEnded={() => { if (autoAdvance) changeSlide(1); }}");
    expect(source).toContain("Dừng tự phát");
  });

  it("uses the shared video frame contract and playback retry for every chapter backdrop", () => {
    expect(source).toContain('className="video-frame section-video-backdrop"');
    expect(source).toContain('autoPlay muted loop playsInline preload="auto"');
    expect(source).toContain('element.addEventListener("loadedmetadata", startPlayback)');
    expect(source).toContain('element.addEventListener("loadeddata", startPlayback)');
    expect(source).toContain('const eagerTimers = [0, 320, 1100, 2400]');
    expect(source).toContain('if (retryCount >= 4)');
    expect(source).not.toContain('observer.observe(frame)');
    expect(source).toContain('data-playback-state={playbackState}');
    expect(source).toContain('(reducedMotion || hasPlaybackError) && <img className="video-frame__fallback"');
    expect(source).toContain('function VideoStoryScene');
    expect(source).toContain('video={ASSETS.motionFinal}');
    expect(source).toContain('className={`video-story-scene video-story-scene--${step}`}');
  });

  it("uses a full sales flow with Golden Circle narrative, one launch format and a 1–2 bottle selector", () => {
    expect(source).toContain("VÌ SAO BẮT ĐẦU");
    expect(source).toContain("ĐỌC TRƯỚC KHI CHỌN");
    expect(source).toContain("TEMPO 3ML / LÔ RA MẮT");
    expect(source).toContain('id: "3ml" as const');
    expect(source).not.toContain('id: "5ml" as const');
    expect(source).not.toContain('id: "duo" as const');
    expect(source).not.toContain('id: "course-2x5ml" as const');
    expect(source).toContain("349.000đ/chai");
    expect(source).toContain("khoảng 12–15 lần dùng");
    expect(source).toContain('const [quantity, setQuantity] = useState<1 | 2>(1)');
    expect(source).toContain('aria-label="Chọn số lượng TEMPO 3ml"');
    expect(source).toContain("Tổng dự kiến:");
    expect(source).toContain("Mỗi lượt có thể giữ tối đa 2 chai");
  });

  it("adds readable generated botanical and label infographics without unsupported ingredient claims", () => {
    expect(source).toContain("tempo-infographic-03-botanical-index_5d3af3b9.png");
    expect(source).toContain("tempo-infographic-04-inci-order_d4080563.png");
    expect(source).toContain("tempo-infographic-05-label-check_365134ff.png");
    expect(source).toContain("Biết mình đang chọn gì.");
    expect(source).toContain("Chín chiết xuất thực vật");
    expect(source).toContain("Giúp chăm sóc dưỡng ẩm da.");
    expect(source).toContain("Purified Water, Alcohol (Ethanol)");
    expect(source).toContain("Không gán vùng trồng, nước xuất xứ hoặc công dụng riêng");
    expect(source).not.toContain("Nguyên liệu Việt Nam");
    expect(source).not.toContain("trồng tại Việt Nam");
  });

  it("keeps manufacturer information and consumer safety guidance factual", () => {
    expect(source).toContain("Công ty TNHH SX Công nghệ cao NANOFRANCE");
    expect(source).toContain("KCN Đồng Văn IV, Ninh Bình.");
    expect(source).toContain("Chỉ dùng ngoài da.");
    expect(source).toContain("TEMPO là mỹ phẩm, không phải thuốc.");
    expect(source).toContain("Nhãn thành phẩm, màu sắc và thông tin chính thức cần được đối chiếu");
  });

  it("uses only the verified TEMPO 3ml packshot for the launch SKU", () => {
    expect(source).toContain('pack3mlVerified: "/manus-storage/tempo-pack-3ml-verified_60cabc8e.png"');
    expect(source).toContain('realSizePhone: "/manus-storage/tempo-launch-3ml-real-size-phone_0fcb73c1.jpg"');
    expect(source).toContain('fineMist: "/manus-storage/tempo-launch-3ml-fine-mist_d0499407.jpg"');
    expect(source).not.toContain("tempo-pack-primary-v2_475160d1.webp");
    expect(source).not.toContain("tempo-pack-scale-v2_04ee12e5.webp");
    expect(source).not.toContain("tempo-pack-unboxing-v2_797eacb4.webp");
    expect(source).not.toContain("tempo-p01-3ml-front_137a0b85.webp");
    expect(source).not.toContain("tempo-p03-duo_3224bc18.webp");
  });

  it("keeps product and lifestyle assets distinct while retaining a six-frame visual diary", () => {
    expect(source).toContain("const visualDiary = [");
    expect(source).toContain("6 KHOẢNH KHẮC TRONG ĐỜI SỐNG");
    expect(source).toContain("Không chỉ một ảnh.");
    expect(source).toContain("tempo-lifestyle-01-exit-evening_334132f2.webp");
    expect(source).toContain("tempo-couple-04-walk-home-woman-man_8da9bbe8.png");
    expect(source).toContain("tempo-couple-03-kitchen-evening-woman-man_9c71be8e.png");
    expect(source).not.toContain("tempo-couple-01-kitchen-evening_df318ac9.webp");
    expect(source).not.toContain("tempo-couple-02-walk-home_e372d5a3.webp");
    expect(source).not.toContain("tempo-lifestyle-03-together-at-home_2ee3a59f.webp");
    expect(source).toContain("tempo-lifestyle-04-morning-return_a7805e20.webp");
    expect(source).toContain('{ src: ASSETS.signalHero, index: "05", kicker: "BUỔI TỐI"');
    expect(source).not.toContain('{ src: ASSETS.lifestyleTogether, index: "05"');
    expect(source).toContain("gallery-grid--diary");
    expect(source).toContain("function SafeImage");
  });

  it("uses Vietnamese typography and CSS modules for the mobile carousel and infographic cards", () => {
    expect(documentHtml).toContain("Be+Vietnam+Pro");
    expect(documentHtml).toContain("family=Lora");
    expect(styles).toContain('font-family:"Be Vietnam Pro"');
    expect(styles).toContain(".motion-carousel__timeline");
    expect(styles).toContain(".ingredient-atlas__grid");
    expect(styles).toContain(".product-protocol__steps");
    expect(styles).toContain("touch-action:pan-y");
    expect(styles).toContain("@media (prefers-reduced-motion: reduce)");
    expect(styles).toContain('.video-frame[data-playback-state="error"] video');
    expect(styles).toContain(".video-frame__motion-status");
    expect(styles).toContain(".video-story-scene");
    expect(styles).toContain(".video-story-scene__wash");
    expect(styles).toContain(".quantity-choice");
  });

  it("loads the configured Meta Pixel and fires purchase only after a reservation", () => {
    expect(documentHtml).toContain("connect.facebook.net/en_US/fbevents.js");
    expect(documentHtml).toContain("%VITE_META_PIXEL_ID%");
    expect(documentHtml).toContain("fbq('track', 'PageView')");
    expect(source).toContain('if (result.kind === "reserved")');
    expect(source).toContain('window.fbq?.("track", "Purchase"');
    expect(source).toContain("currency: \"VND\"");
    expect(source).toContain('content_ids: ["tempo-3ml"]');
  });

  it("normalizes phone formatting before submit and never exposes raw validation JSON", () => {
    expect(source).toContain('function normalizePhoneForSubmit(phone: string)');
    expect(source).toContain('phone: normalizePhoneForSubmit(String(data.get("phone") ?? ""))');
    expect(source).toContain('getWaitlistErrorMessage(join.error)');
    expect(source).not.toContain('{join.error.message}');
  });
});
