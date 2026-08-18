import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getTempoWaitlistStatus, reserveTempoWaitlistSlot } from "./db";
import { notifyTempoReservation } from "./telegram";
import { waitlistInputSchema } from "./waitlist";

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
});

export type AppRouter = typeof appRouter;
