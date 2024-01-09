import { createTRPCRouter } from "@/server/api/trpc";
import { announcementRouter } from "@/server/api/routers/announcement";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  an: announcementRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
