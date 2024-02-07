"use client";

import type { Announcement } from "@prisma/client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import { api } from "@/trpc/react";
import { Button } from "@/_components/ui/button";
import { Textarea } from "@/_components/ui/textarea";

const announcementSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(50, {
      message: "Title has to be lesser than 50 characters.",
    }),
  content: z.string().min(4, {
    message: "Content must be at least 4 characters.",
  }),
});

const EditAnnouncement: React.FC<Announcement> = ({ title, id, content }) => {
  const form = useForm<z.infer<typeof announcementSchema>>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title,
      content,
    },
  });

  const { refetch: reload } = api.an.getAllAnnouncements.useQuery();

  const updateAnnouncement = api.an.updateAnnouncement.useMutation({
    onSuccess: (editedAnnouncement) => {
      toast.success(`${editedAnnouncement.title} has been edited!`);
    },
    onError: (error) => {
      toast.error(`Error: Update unsuccessful due to ${error.data?.code}`);
    },
  });

  function onSubmit(values: z.infer<typeof announcementSchema>) {
    const updatedAnnouncementBody = {
      title: values.title,
      content: values.content,
      id,
    };

    updateAnnouncement.mutate(updatedAnnouncementBody);

    void reload();
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-gray-100 p-6">
          <h1 className="mb-4 text-center text-2xl font-bold">
            Edit Announcement
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your Announcement Title.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="Content" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your Announcement Content.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Edit Announcement</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditAnnouncement;
