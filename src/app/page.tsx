"use client"
  import React, { useState } from "react";
  import { api } from "@/trpc/server";
  import { CreateAnnouncement } from "@/app/_components/create-announcement"; 
  import { ViewAnnouncements } from "./_components/view-announcements";


  interface Announcement {
    id: string;
    title: string;
    content: string;
  }

  export default function Home() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    
    // const fetchAnnouncements = async () => {
    //   try {
    //     const allAnnouncements = await api.an.getAllAnnouncements.query();
    //     setAnnouncements(allAnnouncements);
    //   } catch (error) {
    //     console.error('Error fetching announcements:', error);
    //   }
    // };

    const handleAnnouncementCreated = (newAnnouncement: Announcement) => {
      setAnnouncements((prevAnnouncements) => [newAnnouncement, ...prevAnnouncements]);
    };


    return (
      <div>
        <h1>Create Announcement</h1>
        <CreateAnnouncement announcementCreated={handleAnnouncementCreated} />
        <hr />
        
        <ViewAnnouncements />
      </div>
    );
  }
