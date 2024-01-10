"use client"
  
import { CreateAnnouncement } from '@/app/_components/create-announcement';
import { useState } from "react";

interface Announcement {
    id: string;
    title: string;
    content: string;
  }


const CreateAnnouncementPage = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    const handleAnnouncementCreated = (newAnnouncement: Announcement) => {
        setAnnouncements((prevAnnouncements) => [newAnnouncement, ...prevAnnouncements]);
      };
  

  return (
    <div>
        <CreateAnnouncement announcementCreated={handleAnnouncementCreated} />
    </div>
  );
};

export default CreateAnnouncementPage;
