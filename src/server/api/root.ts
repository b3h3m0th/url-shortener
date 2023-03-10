import { createTRPCRouter } from "~/server/api/trpc";
import { shortenRouter } from "~/server/api/routers/shorten";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  shorten: shortenRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
