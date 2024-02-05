// AdminPage.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import AdminViewAnnouncements from "@/app/_components/admin-view-announcements";
import { getServerAuthSession } from "@/server/auth";
import SignOutButton from "@/app/_components/signOutButton";

const AdminPage: React.FC = async () => {
  const session = (await getServerAuthSession())!;
  if (!session?.user) return redirect("/");

  return (
    <div className="max-w mx-auto max-h-screen text-center">
     <div className="flex items-center justify-between bg-gray-200 py-4">
       

        <h2 className="flex-grow ml-44 text-xl font-semibold">Admin page</h2>

        <div className="flex items-center">
          <SignOutButton />
          <Link
            href="admin/create"
            className="rounded border-2 border-green-500 px-4 py-2 font-bold text-green-500 hover:bg-green-700 ml-2"
          >
            Create
          </Link>
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
