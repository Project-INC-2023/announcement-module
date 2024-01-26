// import type { Announcement } from "@prisma/client";  
import { api } from "@/trpc/server";

// changed page to run on server side only, using trpc/server instead of trpc/react 

const ViewAnnouncements: React.FC = async () => {
  const announcements = await api.an.getAllAnnouncements.query();

  return (
    <div className="mx-auto max-w-md pt-12 text-center">
      <h2 className="text-2xl font-bold">User View Announcements</h2>
      <ul className="mt-4">
        {announcements.map((announcement) => (
          <li key={announcement.id} className="mb-4 rounded-lg bg-gray-200 p-3">
            <h3 className="text-lg font-bold">{announcement.title}</h3>
            <p className="text-sm">{announcement.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAnnouncements;