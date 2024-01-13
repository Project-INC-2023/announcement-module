"use client";

import { api } from "@/trpc/react";
import { Announcement } from "@/types/announcement";

export const ViewAnnouncements: React.FC = () => {
  const { data: announcements = [], error: allAnnouncementsError } =
    api.an.getAllAnnouncements.useQuery();

  return (
    <div className="mx-auto max-w-md text-center">
      <h2 className="text-lg">View Announcements</h2>
      <ul className="mt-4">
        {announcements.map((announcement: Announcement) => (
          <li key={announcement.id} className="mb-4 rounded-lg bg-gray-200 p-3">
            <h3 className="text-lg font-bold">{announcement.title}</h3>
            <p className="text-sm">{announcement.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
