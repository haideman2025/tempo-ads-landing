import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
const styles = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");
const documentHtml = readFileSync(resolve(process.cwd(), "client/index.html"), "utf8");

describe("TEMPO sales landing visual system", () => {
  it("orders the five supplied motion assets as story 01 through 05", () => {
    const assets = [
      "tempo-motion-01-reservation_302dc7af.mp4",
      "tempo-motion-02-carry_121f483d.mp4",
      "tempo-motion-03-craft_c0137201.mp4",
      "tempo-motion-04-date-table_b2232978.mp4",
      "tempo-motion-05-duo-hero_0afbb738.mp4",
    ];
    let previousIndex = -1;
    for (const asset of assets) {
      const nextIndex = source.indexOf(asset);
      expect(nextIndex).toBeGreaterThan(previousIndex);
      previousIndex = nextIndex;
    }
    expect(source).toContain("CÁCH TEMPO ĐI CÙNG BẠN");
    expect(source).toContain("CHƯƠNG {active.step} / 05");
  });

  it("keeps hero playback resilient and the motion timeline touch-accessible", () => {
    expect(source).toContain("const videoRef = useRef<HTMLVideoElement>(null)");
    expect(source).toContain("const playAttempt = video.play()");
    expect(source).toContain("autoPlay muted loop playsInline preload=\"auto\"");
    expect(source).toContain("data-playback-state={playbackState}");
    expect(source).toContain("video-frame__fallback");
    expect(source).toContain("function MotionCarousel");
    expect(source).toContain("aria-roledescription=\"carousel\"");
    expect(source).toContain("role=\"tablist\"");
    expect(source).toContain("onTouchStart={handleTouchStart}");
    expect(source).toContain("onTouchEnd={handleTouchEnd}");
    expect(source).toContain("Math.abs(endX - startX) < 44");
    expect(source).toContain("onEnded={() => { if (autoAdvance) changeSlide(1); }}");
    expect(source).toContain("Dừng tự phát");
  });

  it("uses a full sales flow with Golden Circle narrative and one launch format", () => {
    expect(source).toContain("VÌ SAO BẮT ĐẦU");
    expect(source).toContain("ĐỌC TRƯỚC KHI CHỌN");
    expect(source).toContain("TEMPO 3ML / LÔ RA MẮT");
    expect(source).toContain('id: "3ml" as const');
    expect(source).not.toContain('id: "5ml" as const');
    expect(source).not.toContain('id: "duo" as const');
    expect(source).not.toContain('id: "course-2x5ml" as const');
    expect(source).toContain("349.000đ/chai");
    expect(source).toContain("khoảng 12–15 lần dùng");
    expect(source).toContain("Nhận thông tin mua 3ml");
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
  });
});
