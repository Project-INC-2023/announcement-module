"use client";

import { api } from "@/trpc/react";
import { EditAnnouncementProps } from "@/types/announcement";

import { useState } from "react";
import { toast } from "sonner";

export const EditAnnouncement: React.FC<EditAnnouncementProps> = ({
  announcement,
}) => {
  const [anouncementTitle, setAnnouncementTitle] = useState<string>(
    announcement.title,
  );
  const [anouncementContent, setAnnouncementContent] = useState<string>(
    announcement.content,
  );
  const { refetch: reload } = api.an.getAllAnnouncements.useQuery();
  const updateAnnouncement = api.an.updateAnnouncement.useMutation({
    onSuccess: () => {
      toast.success(`${anouncementTitle} has been edited!`);
    },
    onError: (error) => {
      toast.error(`Update unsuccessful due to ${error.data?.code}`);
    },
  });

  const saveEditAnnouncement = () => {
    const updatedAnnouncementBody = {
      title: anouncementTitle,
      content: anouncementContent,
      id: announcement.id,
    };

    updateAnnouncement.mutate(updatedAnnouncementBody);

    reload();
  };
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-gray-100 p-6">
          <h1 className="mb-4 text-center text-2xl font-bold">
            Edit Announcement
          </h1>

          <input
            type="text"
            placeholder="Title"
            value={anouncementTitle}
            onChange={(e) => setAnnouncementTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
          <textarea
            placeholder="Content"
            value={anouncementContent}
            onChange={(e) => setAnnouncementContent(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
            rows={4}
          ></textarea>
          <button
            className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
            onClick={() => {
              saveEditAnnouncement();
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
