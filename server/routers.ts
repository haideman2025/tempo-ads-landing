import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { createTempoCodOrder, getTempoCodOrderStatus, getTempoWaitlistStatus, markTempoCodOrderDelivered, reserveTempoWaitlistSlot } from "./db";
import { readClientSignals, tempoCodOrderInputSchema } from "./orders";
import { buildPurchaseEvent, sendMetaCapiEvent } from "./metaCapi";
import { notifyTempoCodOrder, notifyTempoReservation } from "./telegram";
import { waitlistInputSchema } from "./waitlist";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  waitlist: router({
    status: publicProcedure.query(() => getTempoWaitlistStatus()),
    join: publicProcedure.input(waitlistInputSchema).mutation(async ({ input }) => {
      const result = await reserveTempoWaitlistSlot(input);
      if (result.kind === "reserved") {
        await notifyTempoReservation({
          fullName: result.entry.fullName,
          phone: result.entry.phone,
          email: result.entry.email,
          quantity: result.quantity,
          totalValue: result.totalValue,
          slotNumber: result.entry.slotNumber,
          note: result.entry.note,
        });
      }
      return result;
    }),
  }),
  orders: router({
    status: publicProcedure.query(() => getTempoCodOrderStatus()),
    create: publicProcedure.input(tempoCodOrderInputSchema).mutation(async ({ ctx, input }) => {
      const result = await createTempoCodOrder(input, readClientSignals(ctx.req.headers));
      if (result.kind === "created") {
        await notifyTempoCodOrder({
          orderNumber: result.order.orderNumber,
          fullName: result.order.fullName,
          phone: result.order.phone,
          address: result.order.address,
          quantity: result.order.quantity,
          totalValue: result.order.totalValue,
          note: result.order.note,
        });
      }
      return result;
    }),
    /**
     * Ranh giới Purchase: COD chưa thu được tiền lúc đặt, nên Purchase chỉ được báo về Meta
     * ở đây — khi đơn đã giao thành công. Gửi qua Conversions API vì thời điểm này khách
     * không còn mở trang, không có trình duyệt nào để bắn Pixel.
     */
    markDelivered: adminProcedure.input(z.object({ orderNumber: z.string().trim().min(1) })).mutation(async ({ input }) => {
      const result = await markTempoCodOrderDelivered(input.orderNumber);
      if (result.kind !== "delivered") return { ...result, purchaseReported: false };

      const report = await sendMetaCapiEvent(buildPurchaseEvent({
        orderNumber: result.order.orderNumber,
        fullName: result.order.fullName,
        phone: result.order.phone,
        quantity: result.order.quantity,
        unitPrice: result.order.unitPrice,
        totalValue: result.order.totalValue,
        sku: result.order.sku,
        fbp: result.order.fbp,
        fbc: result.order.fbc,
        clientIpAddress: result.order.clientIpAddress,
        clientUserAgent: result.order.clientUserAgent,
        deliveredAt: result.deliveredAt,
      }));
      return { kind: result.kind, purchaseReported: report.delivered, purchaseSkipped: report.skipped };
    }),
  }),
});

export type AppRouter = typeof appRouter;
