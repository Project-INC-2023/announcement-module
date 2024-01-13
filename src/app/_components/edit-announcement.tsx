"use client";

import { api } from "@/trpc/react";
import { Announcement, EditAnnouncementProps } from "@/types/announcement";
import { faFontAwesome } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const {
    data: announcements = [],
    error: allAnnouncementsError,
    refetch: reload,
  } = api.an.getAllAnnouncements.useQuery();
  const updateAnnouncement = api.an.updateAnnouncement.useMutation();
  const closeEditAnnouncement = () => {
    editAnnouncementFunc(announcement, false);
  };
  const saveEditAnnouncement = () => {
    const newAnnouncement = {
      title: anouncementTitle,
      content: anouncementContent,
      id: announcement.id,
    };

    const data = updateAnnouncement.mutate(newAnnouncement);
    console.log(data);
    if (true) {
      toast.success(`${anouncementTitle} has been edited!`);
    } else {
      toast.error(`An error has occured please try again later!`);
    }

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
