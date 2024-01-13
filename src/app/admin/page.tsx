"use client";

import { useState } from "react";
import { Announcement } from "@/types/announcement";
import Link from "next/link";
import { CreateAnnouncement } from "@/app/_components/create-announcement";
import { AdminViewAnnouncements } from "../_components/admin-view-announcements";
import { EditAnnouncement } from "../_components/edit-announcement";

export const AdminPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [openEdit, setOpenEdit] = useState<Boolean>(false);
  const [editAnnouncement, setEditAnnouncement] = useState<Announcement>();

  const handleAnnouncementCreated = (newAnnouncement: Announcement) => {
    setAnnouncements((prevAnnouncements) => [
      newAnnouncement,
      ...prevAnnouncements,
    ]);
  };

  const handleEditAnnouncement = (
    announcement: Announcement,
    open: boolean,
  ) => {
    setEditAnnouncement(announcement);
    setOpenEdit(open);
  };

  return (
    <div className="max-w mx-auto max-h-screen text-center">
      {openEdit ? (
        <EditAnnouncement
          announcement={editAnnouncement!}
          editAnnouncementFunc={handleEditAnnouncement}
        />
      ) : (
        <div></div>
      )}
      <div className=" flex items-center justify-start bg-gray-200 py-4">
        <div className="w-1/4">
          <Link
            href="/"
            className=" h-9  rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Back to the labs
          </Link>
        </div>

        <h2 className="w-1/2 text-xl font-semibold">Admin page</h2>
      </div>

      <div className="flex">
        <div className="w-1/2 items-start ">
          <CreateAnnouncement announcementCreated={handleAnnouncementCreated} />
        </div>
        <div className="w-1/2">
          <AdminViewAnnouncements
            editAnnouncementFunc={handleEditAnnouncement}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
