"use client";

import { useState } from "react";
import { Announcement } from "@/types/announcement";
import Link from "next/link";
import { AdminViewAnnouncements } from "../_components/admin-view-announcements";
import { EditAnnouncement } from "../_components/edit-announcement";

export const AdminPage: React.FC = () => {
  const [openEdit, setOpenEdit] = useState<Boolean>(false);
  const [editAnnouncement, setEditAnnouncement] = useState<Announcement>();

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

        <div className="w-1/4 ">
          <Link 
            href="/admin-create"
            className=" h-9  rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            To admin-create announcement
          </Link>
        </div>
      </div>

      <div className="flex">
        <div className="w-full">
          <AdminViewAnnouncements
            editAnnouncementFunc={handleEditAnnouncement}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
