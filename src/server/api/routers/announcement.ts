import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const announcementRouter = createTRPCRouter({
  getAllAnnouncements: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.announcement.findMany();
  }),

  createAnnouncement: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.announcement.create({
        data: {
          title: input.title,
          content: input.content,
        },
      });
    }),

  updateAnnouncement: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, title, content } = input;

      const updatedAnnouncement = await ctx.db.announcement.update({
        where: {
          id,
        },
        data: {
          title,
          content,
        },
      });

      return updatedAnnouncement;
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.announcement.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  deleteAnnouncement: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const deletedAnnouncement = await ctx.db.announcement.delete({
        where: {
          id: input,
        },
      });

      return deletedAnnouncement;
    }),

  getSpecificAnnouncement: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const specificAnnouncement = await ctx.db.announcement.findUnique({
        where: {
          id: input,
        },
      });
      return specificAnnouncement;
    }),
});
