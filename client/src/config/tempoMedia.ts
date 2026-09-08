/** Ảnh landing TEMPO đã tối ưu sẵn — sinh từ bản PNG gốc, phục vụ trực tiếp từ client/public/media.
 * Mỗi ảnh có ba biến thể WebP (480w / 960w / gốc) để <picture> chọn theo bề rộng thật của khung.
 * Chạy lại bằng scripts/optimize-media.py khi thay ảnh nguồn. */
export type ResponsiveAsset = {
  webp480: string;
  webp960: string;
  webp: string;
  /** Ảnh cho thuộc tính src của <img>, dùng khi trình duyệt không đọc được <source>. */
  fallback: string;
  width: number;
  height: number;
};

export const TEMPO_MEDIA = {
  "feedback-02-wait": { webp480: "/media/feedback-02-wait-480.webp", webp960: "/media/feedback-02-wait-960.webp", webp: "/media/feedback-02-wait.webp", fallback: "/media/feedback-02-wait.webp", width: 1254, height: 1254 },
  "feedback-03-clean": { webp480: "/media/feedback-03-clean-480.webp", webp960: "/media/feedback-03-clean-960.webp", webp: "/media/feedback-03-clean.webp", fallback: "/media/feedback-03-clean.webp", width: 1254, height: 1254 },
  "feedback-04-intention": { webp480: "/media/feedback-04-intention-480.webp", webp960: "/media/feedback-04-intention-960.webp", webp: "/media/feedback-04-intention.webp", fallback: "/media/feedback-04-intention.webp", width: 1254, height: 1254 },
  "feedback-05-care": { webp480: "/media/feedback-05-care-480.webp", webp960: "/media/feedback-05-care-960.webp", webp: "/media/feedback-05-care.webp", fallback: "/media/feedback-05-care.webp", width: 1254, height: 1254 },
  "feedback-06-unboxing": { webp480: "/media/feedback-06-unboxing-480.webp", webp960: "/media/feedback-06-unboxing-960.webp", webp: "/media/feedback-06-unboxing.webp", fallback: "/media/feedback-06-unboxing.webp", width: 1254, height: 1254 },
  "feedback-07-guidance": { webp480: "/media/feedback-07-guidance-480.webp", webp960: "/media/feedback-07-guidance-960.webp", webp: "/media/feedback-07-guidance.webp", fallback: "/media/feedback-07-guidance.webp", width: 1254, height: 1254 },
  "feedback-08-flow": { webp480: "/media/feedback-08-flow-480.webp", webp960: "/media/feedback-08-flow-960.webp", webp: "/media/feedback-08-flow.webp", fallback: "/media/feedback-08-flow.webp", width: 1254, height: 1254 },
  "feedback-09-design": { webp480: "/media/feedback-09-design-480.webp", webp960: "/media/feedback-09-design-960.webp", webp: "/media/feedback-09-design.webp", fallback: "/media/feedback-09-design.webp", width: 1254, height: 1254 },
  "feedback-10-compact": { webp480: "/media/feedback-10-compact-480.webp", webp960: "/media/feedback-10-compact-960.webp", webp: "/media/feedback-10-compact.webp", fallback: "/media/feedback-10-compact.webp", width: 1254, height: 1254 },
  "tempo-benefits": { webp480: "/media/tempo-benefits-480.webp", webp960: "/media/tempo-benefits-960.webp", webp: "/media/tempo-benefits.webp", fallback: "/media/tempo-benefits.webp", width: 1254, height: 1254 },
  "tempo-brand-hero": { webp480: "/media/tempo-brand-hero-480.webp", webp960: "/media/tempo-brand-hero-960.webp", webp: "/media/tempo-brand-hero.webp", fallback: "/media/tempo-brand-hero.webp", width: 1254, height: 1254 },
  "tempo-carry": { webp480: "/media/tempo-carry-480.webp", webp960: "/media/tempo-carry-960.webp", webp: "/media/tempo-carry.webp", fallback: "/media/tempo-carry.webp", width: 1254, height: 1254 },
  "tempo-claim-label": { webp480: "/media/tempo-claim-label-480.webp", webp960: "/media/tempo-claim-label-960.webp", webp: "/media/tempo-claim-label.webp", fallback: "/media/tempo-claim-label.webp", width: 1254, height: 1254 },
  "tempo-couple-03-kitchen-evening-woman-man": { webp480: "/media/tempo-couple-03-kitchen-evening-woman-man-480.webp", webp960: "/media/tempo-couple-03-kitchen-evening-woman-man-960.webp", webp: "/media/tempo-couple-03-kitchen-evening-woman-man.webp", fallback: "/media/tempo-couple-03-kitchen-evening-woman-man.webp", width: 1536, height: 1920 },
  "tempo-couple-04-walk-home-woman-man": { webp480: "/media/tempo-couple-04-walk-home-woman-man-480.webp", webp960: "/media/tempo-couple-04-walk-home-woman-man-960.webp", webp: "/media/tempo-couple-04-walk-home-woman-man.webp", fallback: "/media/tempo-couple-04-walk-home-woman-man.webp", width: 1536, height: 1920 },
  "tempo-couple-hands": { webp480: "/media/tempo-couple-hands-480.webp", webp960: "/media/tempo-couple-hands-960.webp", webp: "/media/tempo-couple-hands.webp", fallback: "/media/tempo-couple-hands.webp", width: 1254, height: 1254 },
  "tempo-design-graphite": { webp480: "/media/tempo-design-graphite-480.webp", webp960: "/media/tempo-design-graphite-960.webp", webp: "/media/tempo-design-graphite.webp", fallback: "/media/tempo-design-graphite.webp", width: 1254, height: 1254 },
  "tempo-feedback-spray-graphite": { webp480: "/media/tempo-feedback-spray-graphite-480.webp", webp960: "/media/tempo-feedback-spray-graphite-960.webp", webp: "/media/tempo-feedback-spray-graphite.webp", fallback: "/media/tempo-feedback-spray-graphite.webp", width: 1254, height: 1254 },
  "tempo-pack-back": { webp480: "/media/tempo-pack-back-480.webp", webp960: "/media/tempo-pack-back-960.webp", webp: "/media/tempo-pack-back.webp", fallback: "/media/tempo-pack-back.webp", width: 1023, height: 1537 },
  "tempo-pack-front": { webp480: "/media/tempo-pack-front-480.webp", webp960: "/media/tempo-pack-front-960.webp", webp: "/media/tempo-pack-front.webp", fallback: "/media/tempo-pack-front.webp", width: 1023, height: 1537 },
  "tempo-pack-sides": { webp480: "/media/tempo-pack-sides-480.webp", webp960: "/media/tempo-pack-sides-960.webp", webp: "/media/tempo-pack-sides.webp", fallback: "/media/tempo-pack-sides.webp", width: 1023, height: 1537 },
  "tempo-story": { webp480: "/media/tempo-story-480.webp", webp960: "/media/tempo-story-960.webp", webp: "/media/tempo-story.webp", fallback: "/media/tempo-story.webp", width: 1254, height: 1254 },
  "tempo-unbox": { webp480: "/media/tempo-unbox-480.webp", webp960: "/media/tempo-unbox-960.webp", webp: "/media/tempo-unbox.webp", fallback: "/media/tempo-unbox.webp", width: 1254, height: 1254 },
  "tempo-use-steps": { webp480: "/media/tempo-use-steps-480.webp", webp960: "/media/tempo-use-steps-960.webp", webp: "/media/tempo-use-steps.webp", fallback: "/media/tempo-use-steps.webp", width: 1254, height: 1254 },
  "tempo-wait-ritual": { webp480: "/media/tempo-wait-ritual-480.webp", webp960: "/media/tempo-wait-ritual-960.webp", webp: "/media/tempo-wait-ritual.webp", fallback: "/media/tempo-wait-ritual.webp", width: 1254, height: 1254 },
} as const satisfies Record<string, ResponsiveAsset>;
