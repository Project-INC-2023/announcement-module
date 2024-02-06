"use client";

import { useState } from "react";
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

const announcementCreateSchema = z.object({
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

const CreateAnnouncement: React.FC = () => {
  const form = useForm<z.infer<typeof announcementCreateSchema>>({
    resolver: zodResolver(announcementCreateSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const [textMessage, setTextMessage] = useState<string | null>(null);

  const createAnnouncement = api.an.createAnnouncement.useMutation({
    onSuccess: (newAnnouncement) => {
      toast.success(`${newAnnouncement.title} announcement has been added`);
    },
    onError: (error) => {
      toast.error(`Error creating announcement: ${error.message}`);
    },
  });

  function onSubmit(values: z.infer<typeof announcementCreateSchema>) {
    try {
      createAnnouncement.mutate({
        title: values.title,
        content: values.content,
      });
      setTextMessage(null);
    } catch (error) {
      setTextMessage(
        `Error creating announcement: ${(error as Error).message}`,
      );
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-gray-100 p-6">
          <h1 className="mb-4 text-center text-2xl font-bold">
            Create Announcement
          </h1>

          {textMessage && (
            <div
              className={`mb-4 ${textMessage.startsWith("Error") ? "text-red-500" : "text-green-500"}`}
            >
              {textMessage}
            </div>
          )}
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
          {/* <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              data-testid="admin-create-title-input"
              type="text"
              name="title"
              placeholder="Title"
              value={announcementData.title}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
            <textarea
              data-testid="admin-create-content-input"
              name="content"
              placeholder="Content"
              value={announcementData.content}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
              rows={4}
            />
            <button
              data-testid="admin-create-announcement-button"
              type="submit"
              className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
              disabled={createAnnouncement.isLoading}
            >
              {createAnnouncement.isLoading ? "Submitting..." : "Submit"}
            </button> */}
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncement;
