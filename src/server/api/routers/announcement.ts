import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { initTRPC, TRPCError } from '@trpc/server';
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// eslint-disable-next-line import/prefer-default-export
export const announcementRouter = createTRPCRouter({
  getAllAnnouncements: publicProcedure.query(async ({ ctx }) => {
    try {
      const announcements = await ctx.db.announcement.findMany();
      return announcements;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch announcements',
        cause: error,
      });
    }
  }),

  createAnnouncement: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const createdAnnouncement = await ctx.db.announcement.create({
          data: {
            title: input.title,
            content: input.content,
          },
        });
        return createdAnnouncement;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create announcement',
          cause: error,
        });
      }
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
      try {
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

        if (!updatedAnnouncement) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Announcement not found for update',
          });
        }

        return updatedAnnouncement;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update announcement',
          cause: error,
        });
      }
    }),

    getLatest: publicProcedure.query(async ({ ctx }) => {
      try {
        const latestAnnouncement = await ctx.db.announcement.findFirst({
          orderBy: { createdAt: 'desc' },
        });
    
        if (!latestAnnouncement) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'No announcements found',
          });
        }
    
        return latestAnnouncement;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch latest announcement',
          cause: error,
        });
      }
    }),

    deleteAnnouncement: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        const deletedAnnouncement = await ctx.db.announcement.delete({
          where: {
            id: input,
          },
        });

        if (!deletedAnnouncement) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Announcement not found for deletion',
          });
        }

        return deletedAnnouncement;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete announcement',
          cause: error,
        });
      }
    }),
    
    getSpecificAnnouncement: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      try {
        const specificAnnouncement = await ctx.db.announcement.findUnique({
          where: {
            id: input,
          },
        });

        if (!specificAnnouncement) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Announcement not found',
          });
        }

        return specificAnnouncement;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch specific announcement',
          cause: error,
        });
      }
    }),
});
