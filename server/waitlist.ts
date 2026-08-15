import { z } from "zod";

export const WAITLIST_CAPACITY = 1000;

export function getRemainingSlots(claimed: number) {
  return Math.max(0, WAITLIST_CAPACITY - Math.max(0, claimed));
}

export function isWaitlistFull(claimed: number) {
  return getRemainingSlots(claimed) === 0;
}

export const waitlistInputSchema = z.object({
  fullName: z.string().trim().min(2, "Vui lòng nhập họ và tên.").max(120, "Họ tên quá dài."),
  phone: z
    .string()
    .trim()
    .regex(/^(?:0|\+84)(?:3|5|7|8|9)\d{8}$/, "Vui lòng nhập số điện thoại Việt Nam hợp lệ."),
  email: z.string().trim().email("Email chưa đúng định dạng.").max(320).optional().or(z.literal("")),
  preferredSku: z.enum(["3ml", "5ml", "duo", "course-2x5ml"]),
  note: z.string().trim().max(500, "Lời nhắn tối đa 500 ký tự.").optional().or(z.literal("")),
  marketingConsent: z.boolean().refine(value => value, "Bạn cần đồng ý để V2JOY liên hệ về danh sách chờ."),
});

export type WaitlistInput = z.infer<typeof waitlistInputSchema>;
