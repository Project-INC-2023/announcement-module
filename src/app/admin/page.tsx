"use client"

import { useEffect, useState } from 'react';
import { api } from '@/trpc/react';
import { Announcement } from "@/types/announcement";
import Link from 'next/link';
import { CreateAnnouncement } from '@/app/_components/create-announcement';



export const AdminPage: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    const handleAnnouncementCreated = (newAnnouncement: Announcement) => {
        setAnnouncements((prevAnnouncements) => [newAnnouncement, ...prevAnnouncements]);
      };
  
      return (
        <div className='text-center max-w mx-auto'>
            
            <h2 className='text-lg'>Admin page</h2>
            <div>
                <CreateAnnouncement announcementCreated={handleAnnouncementCreated} />
            </div>
        </div>
    );
};

export default AdminPage;