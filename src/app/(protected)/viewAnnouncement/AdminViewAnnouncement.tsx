// AdminPage.tsx

import Link from "next/link";
import AdminViewAnnouncements from "@/app/_components/admin-view-announcements";
import { getServerAuthSession } from "@/server/auth";
import { Button } from "@/_components/ui/button";
import ProfileDropDownMenu from "../../_components/profileDropDownMenu";

const AdminPage: React.FC = async () => {
  const session = (await getServerAuthSession())!;

  return (
    <div className="max-w mx-auto max-h-screen text-center">
      <div className="flex items-center justify-between bg-gray-200 px-10 py-2">
        <div className="flex w-1/4 justify-start">
          <ProfileDropDownMenu image={session.user.image} />
        </div>
        <h2 className="w-1/2 flex-grow text-xl font-semibold">Admin page</h2>

        <div className="flex w-1/4 justify-end">
          <Button className="p-0">
            <Link href="admin/create" className="px-3">
              Create
            </Link>
          </Button>
        </div>
      </div>

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
