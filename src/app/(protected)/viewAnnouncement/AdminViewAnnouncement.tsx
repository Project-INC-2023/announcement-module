import AdminViewAnnouncements from "@/app/_components/admin-view-announcements";
import { getServerAuthSession } from "@/server/auth";

const AdminPage: React.FC = async () => {
  const session = (await getServerAuthSession())!;

  return (
    <div className="max-w mx-auto max-h-screen text-center">
      <div className="flex">
        <div className="w-full">
          {session?.user ? (
            <AdminViewAnnouncements />
          ) : (
            <p>No user logged in</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
