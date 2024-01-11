"use client";

import { api } from "@/trpc/react";
import { Announcement, EditAnnouncementProps } from "@/types/announcement";
import { faFontAwesome } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EditAnnouncement: React.FC<EditAnnouncementProps> = ({
  editAnnouncement,
}) => {
  const { data: announcements = [], error: allAnnouncementsError } =
    api.an.getAllAnnouncements.useQuery();
  const updateAnnouncement = api.an.updateAnnouncement.useMutation();
  const closeEditAnnouncement = () => {
    editAnnouncement("lol", false);
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
        <h2 className=" text-2xl font-semibold">Edit Announcement</h2>
        <p>hello</p>
      </div>

      <ul className=""></ul>
    </div>
  );
};
