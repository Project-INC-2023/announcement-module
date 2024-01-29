"use client";

import type { Announcement } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/trpc/react";

const EditAnnouncement: React.FC<Announcement> = ({ title, id, content }) => {
  const [announcementTitle, setAnnouncementTitle] = useState<string>(title);
  const [announcementContent, setAnnouncementContent] = useState<string>(content);
  const [announcementId] = useState<string>(id);
  const [textMessage, setTextMessage] = useState<string | null>(null);

  const { refetch: reload } = api.an.getAllAnnouncements.useQuery();
  const updateAnnouncement = api.an.updateAnnouncement.useMutation({
    onSuccess: () => {
      setTextMessage(`${announcementTitle} has been edited!`);
    },
    onError: (error) => {
      setTextMessage(`Error: Update unsuccessful due to ${error.data?.code}`);
    },
  });

  const saveEditAnnouncement = () => {
    const updatedAnnouncementBody = {
      title: announcementTitle,
      content: announcementContent,
      id: announcementId,
    };

    updateAnnouncement.mutate(updatedAnnouncementBody);

    void reload();
  };
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-gray-100 p-6">
          <h1 className="mb-4 text-center text-2xl font-bold">
            Edit Announcement
          </h1>

          {textMessage && (
            <div className={`mb-4 ${textMessage.startsWith("Error") ? 'text-red-500' : 'text-green-500'}`}>
              {textMessage}
            </div>
          )}

          <input
            type="text"
            placeholder="Title"
            value={announcementTitle}
            onChange={(e) => setAnnouncementTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
          <textarea
            placeholder="Content"
            value={announcementContent}
            onChange={(e) => setAnnouncementContent(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
            rows={4}
          />
          <button
            type="button"
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

export default EditAnnouncement;
