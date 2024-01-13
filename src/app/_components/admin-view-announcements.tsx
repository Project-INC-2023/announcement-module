"use client";

import { api } from "@/trpc/react";
import {
  Announcement,
  EditAnnouncementFromAdminPageProps,
  EditAnnouncementProps,
} from "@/types/announcement";
import { faFontAwesome } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { toast } from "sonner";

export const AdminViewAnnouncements: React.FC<
  EditAnnouncementFromAdminPageProps
> = ({ editAnnouncementFunc }) => {
  const {
    data: announcements = [],
    error: allAnnouncementsError,
    refetch: reload,
  } = api.an.getAllAnnouncements.useQuery();

  const deleteFunction = api.an.deleteAnnouncement.useMutation();

  return (
    <div className="mx-auto max-w-md">
      <h2 className="py-10 text-2xl font-semibold">Admin Dashboard</h2>
      <ul className="">
        {announcements.map((announcement: Announcement) => (
          <li key={announcement.id} className="mb-4 rounded-lg bg-gray-200 p-3">
            <div className="flex justify-center gap-10">
              <div className="w-1/2 text-red-500">
                <button
                  className=" border-2 border-red-500 px-2"
                  onClick={() => {
                    toast.promise(deleteFunction.mutateAsync(announcement.id), {
                      loading: "Deleting...",
                      success: () => {
                        reload();
                        return "Deleted!";
                      },
                      error: "Something went wrong!",
                    });
                  }}
                >
                  Delete
                </button>
              </div>
              <div className="w-1/2">
                <button
                  onClick={() => {
                    editAnnouncementFunc(announcement, true);
                  }}
                  className=" border-2 border-black px-2"
                >
                  Edit
                </button>
              </div>
            </div>
            <h3 className="text-lg font-bold">{announcement.title}</h3>
            <p className="text-sm">{announcement.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
