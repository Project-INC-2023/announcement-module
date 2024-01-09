"use client"
import { useEffect, useState } from 'react';
import { api } from '@/trpc/react';

interface Announcement {
  id: string;
  title: string;
  content: string;
}

export const ViewAnnouncements: React.FC = () => {
  const { data: announcements = [], error: allAnnouncementsError } = api.an.getAllAnnouncements.useQuery();

  return (
    <div>
      <h2>View Announcements</h2>
      <ul>
        {announcements.map((announcement: Announcement) => (
          <li key={announcement.id}>
            <div>
              <strong>{announcement.title}</strong>
              <p>{announcement.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
