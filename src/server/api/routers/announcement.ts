import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const announcementRouter = createTRPCRouter({

  getAllAnnouncements: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.announcement.findMany();
  }),
  
  createAnnouncement: publicProcedure
    .input(z.object({ title: z.string().min(1), content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.announcement.create({
        data: {
          title: input.title,
          content: input.content
        }
      })
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.announcement.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
