"use client";

import { api } from "@/trpc/react";
import { Announcement, EditAnnouncementProps } from "@/types/announcement";
import { faFontAwesome } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EditAnnouncement: React.FC<EditAnnouncementProps> = ({
  editAnnouncement,
  announcementId,
}) => {
  const { data: specifcAnnouncementData, isLoading: loading } =
    api.an.getSpecificAnnouncement.useQuery(announcementId);

  const updateAnnouncement = api.an.updateAnnouncement.useMutation();
  const closeEditAnnouncement = () => {
    editAnnouncement(announcementId, false);
  };
  const saveEditAnnouncement = () => {};
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
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <input />
            <h2 className=" text-2xl font-semibold">
              {specifcAnnouncementData?.title}
            </h2>
            <p>{specifcAnnouncementData?.content}</p>
            <button
              onClick={() => {
                saveEditAnnouncement();
              }}
              className="mt-10 border-2 border-black px-2"
            >
              Save
            </button>
          </div>
        )}
      </div>

      <ul className=""></ul>
    </div>
  );
};
