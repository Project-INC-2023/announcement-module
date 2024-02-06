import Link from "next/link";
import { api } from "@/trpc/server";
import DeleteButton from "./admin-delete-announcement-button";

const AdminViewAnnouncements: React.FC = async () => {
  const announcements = await api.an.getAllAnnouncements.query();

  return (
    <div className="mx-auto max-w-md">
      <h2 className="py-10 text-2xl font-semibold">Admin Dashboard</h2>
      {announcements.length === 0 ? (
        <p data-testid="admin-no-announcements" className="text-xl mt-4 text-gray-500">There is no announcements in the admin view yet</p>
      ) : (
        <ul data-testid="admin-all-announcements">
        {announcements.map((announcement) => (
          <li key={announcement.id} className="mb-4 rounded-lg bg-gray-200 p-3">
            <div className="flex justify-center gap-10">
              <DeleteButton id={announcement.id}/>
              <div className="w-1/2">
                <Link
                  className="border-2 border-black px-2"
                  href={`admin/edit/${announcement.id}`}
                >
                  Edit
                </Link>
              </div>
            </div>
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

export default AdminViewAnnouncements;