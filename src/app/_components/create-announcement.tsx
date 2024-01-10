"use client";

import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "@/trpc/react";

import { toast } from "sonner";

interface Announcement {
  id: string;
  title: string;
  content: string;
}

interface CreateAnnouncementProps {
  announcementCreated: (newAnnouncement: Announcement) => void;
}

export const CreateAnnouncement: React.FC<CreateAnnouncementProps> = ({
  announcementCreated,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createAnnouncement = api.an.createAnnouncement.useMutation({
    onSuccess: (newAnnouncement) => {
      announcementCreated(newAnnouncement);
      toast.success(`${newAnnouncement.title} announcement has been added`);
    },
    onError: (error) => {
      toast.error(`Error creating announcement: ${error.message}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Please fill in both title and content.");
      return;
    }

    try {
      createAnnouncement.mutate({
        title,
        content,
      });
      setTitle("");
      setContent("");
    } catch (error) {
      toast.error(`Error creating announcement: ${(error as Error).message}`);
    }
  };

  const handleGoBack = () => {
    window.history.back(); // try to use Link or router to navigate, currently doesnt work
  };

  return (
    <div className="flex h-screen flex-col">
      <button
        onClick={handleGoBack}
        className="ml-4 mt-4 self-start text-blue-500 hover:text-blue-700"
      >
        &lt; Back
      </button>

      <div className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-gray-100 p-6">
          <h1 className="mb-4 text-center text-2xl font-bold">
            Create Announcement
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
              rows={4}
            ></textarea>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
              disabled={createAnnouncement.isLoading}
            >
              {createAnnouncement.isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
