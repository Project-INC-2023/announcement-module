// import type { Announcement } from "@prisma/client";  
import { api } from "@/trpc/server";

// changed page to run on server side only, using trpc/server instead of trpc/react 

const ViewAnnouncements: React.FC = async () => {
  const announcements = await api.an.getAllAnnouncements.query();

  return (
    <div className="mx-auto max-w-md pt-12 text-center">
      <h2 className="text-2xl font-bold">User View Announcements</h2>
      {announcements.length === 0 ? (
        <p data-testid="no-announcements" className="text-xl mt-4 text-gray-500">There is no announcements yet</p>
      ) : (
        <ul data-testid="all-announcements" className="mt-4">
          {announcements.map((announcement) => (
            <li data-testid="first-announcement" key={announcement.id} className="mb-4 rounded-lg bg-gray-200 p-3">
              <h3 className="text-lg font-bold">{announcement.title}</h3>
              <p className="text-sm">{announcement.content}</p>
              <p className="text-xs text-gray-500">
                Created at: {new Date(announcement.createdAt).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                Updated at: {new Date(announcement.updatedAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewAnnouncements;