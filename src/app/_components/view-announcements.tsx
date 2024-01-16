"use client";

import { api } from "@/trpc/react";
import { Announcement } from "@/types/announcement";

export const ViewAnnouncements: React.FC = () => {
  const { data: announcements = [] } = api.an.getAllAnnouncements.useQuery();

  return (
    <div className="mx-auto max-w-md pt-12 text-center">
      <h2 className="text-2xl font-bold">User View Announcements</h2>
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
