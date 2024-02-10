"use client";

import { z } from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/_components/ui/form";
import { api } from "@/trpc/react";
import { Input } from "@/_components/ui/input";
import { Button } from "@/_components/ui/button";

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

const CreateAnnouncement = () => {
  const form = useForm<z.infer<typeof announcementSchema>>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const createAnnouncement = api.an.createAnnouncement.useMutation({
    onSuccess: (newAnnouncement) => {
      toast.success(`${newAnnouncement.title} announcement has been added`);
    },
    onError: (error) => {
      toast.error(`Error creating announcement: ${error.message}`);
    },
  });

  function onSubmit(values: z.infer<typeof announcementSchema>) {
    try {
      createAnnouncement.mutate({
        title: values.title,
        content: values.content,
      });
    } catch (error) {
      toast.error(`Error creating announcement`);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-gray-100 p-6">
          <h1 className="mb-4 text-center text-2xl font-bold">
            Create Announcement
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
                      <Input placeholder="Content" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your Announcement Content.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create Announcement</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncement;
