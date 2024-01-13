"use client";

import { api } from "@/trpc/react";
import { EditAnnouncementProps } from "@/types/announcement";

import { useState } from "react";
import { toast } from "sonner";

export const EditAnnouncement: React.FC<EditAnnouncementProps> = ({
  editAnnouncementFunc,
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

  const closeEditAnnouncement = () => {
    editAnnouncementFunc(announcement, false);
  };

  const saveEditAnnouncement = () => {
    const updatedAnnouncementBody = {
      title: anouncementTitle,
      content: anouncementContent,
      id: announcement.id,
    };

    updateAnnouncement.mutate(updatedAnnouncementBody);

    editAnnouncementFunc(announcement, false);
    reload();
  };
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="h-1/4 w-1/3 rounded-md bg-white p-6">
        <div className="flex justify-end">
          <button
            onClick={() => {
              closeEditAnnouncement();
            }}
            className="border-2 border-black px-2"
          >
            Close
          </button>
        </div>
        <div className="flex flex-col items-center">
          <input
            value={anouncementTitle}
            onChange={(e) => {
              setAnnouncementTitle(e.target.value);
            }}
          />

          <input
            value={anouncementContent}
            onChange={(e) => {
              setAnnouncementContent(e.target.value);
            }}
          />
        </div>
        <button
          onClick={() => {
            saveEditAnnouncement();
          }}
          className="mt-10 border-2 border-black px-2"
        >
          Save
        </button>
      </div>
    </div>
  );
};