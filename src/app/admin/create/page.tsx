"use client";

import { useState } from "react";
import { Announcement } from "@/types/announcement";
import Link from "next/link";
import { CreateAnnouncement } from "@/app/_components/create-announcement";

export const AdminCreatePage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [openEdit, setOpenEdit] = useState<Boolean>(false);
  const [editAnnouncement, setEditAnnouncement] = useState<Announcement>();

  const handleAnnouncementCreated = (newAnnouncement: Announcement) => {
    setAnnouncements((prevAnnouncements) => [
      newAnnouncement,
      ...prevAnnouncements,
    ]);
  };

  return (
    <div className="max-w mx-auto max-h-screen text-center">
      <div className=" flex items-center justify-start bg-gray-200 py-4">
        <div className="w-1/4">
          <Link
            href="view"
            className=" h-9  rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Back to the admin dashboard
          </Link>
        </div>

        <h2 className="w-1/2 text-xl font-semibold">Admin Create Page</h2>
      </div>

      <div className="flex">
        <div className="w-full items-center pt-40">
          <CreateAnnouncement announcementCreated={handleAnnouncementCreated} />
        </div>
      </div>
    </div>
  );
};

export default AdminCreatePage;
