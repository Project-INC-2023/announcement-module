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
    <div className='text-center max-w-md mx-auto'>
      <h2 className='text-lg'>View Announcements</h2>
      <ul className="mt-4">
        {announcements.map((announcement: Announcement) => (
          <li key={announcement.id} className="bg-gray-200 rounded-lg mb-4 p-3">
            <h3 className="font-bold text-lg">{announcement.title}</h3>
            <p className="text-sm">{announcement.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
