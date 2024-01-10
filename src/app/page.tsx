  "use client"

    import Link from "next/link";
    import { ViewAnnouncements } from "./_components/view-announcements";

    export default function Home() {
      // const [announcements, setAnnouncements] = useState<Announcement[]>([]);
      
      // const fetchAnnouncements = async () => {
      //   try {
      //     const allAnnouncements = await api.an.getAllAnnouncements.query();
      //     setAnnouncements(allAnnouncements);
      //   } catch (error) {
      //     console.error('Error fetching announcements:', error);
      //   }
      // };

      // const handleAnnouncementCreated = (newAnnouncement: Announcement) => {
      //   setAnnouncements((prevAnnouncements) => [newAnnouncement, ...prevAnnouncements]);
      // };


      return (
        <div className="relative">
          <div className="flex justify-end mt-4 mr-4 absolute top-0 right-0">
            <Link href="/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">
      
                Create Announcement
              
            </Link>
          </div>
    
          <ViewAnnouncements />
        </div>
      );
    }
