// prob dont need use client here
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminViewAnnouncements from "@/app/_components/admin-view-announcements";
import { getServerAuthSession } from "@/server/auth";
import SignOutButton from "@/app/_components/signOutButton";
// find out whether React.FC should be used since its prob discouraged now

// eslint-disable-next-line @next/next/no-async-client-component
const AdminPage: React.FC = async () => {
  const session = (await getServerAuthSession())!;
  if (!session?.user) return redirect("/");

  return (
    <div className="max-w mx-auto max-h-screen text-center">
      <div className="flex items-center justify-start bg-gray-200 py-4">
        <div data-testid="admin-back-link" className="w-1/4">
          <Link
            href="/"
            className="h-9 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Back to the labs
          </Link>
        </div>

        <h2 className="w-1/2 text-xl font-semibold">Admin page</h2>

        <div data-testid="admin-create-link" className="flex w-1/4 justify-end gap-3 pr-10">
          <Link
            href="create"
            className="rounded border-2 border-green-500 px-4 py-2 font-bold text-green-500 hover:bg-green-700"
          >
            Create
          </Link>
        </div>
      </div>

      <div className="flex">
        <div className="w-full">
          {session?.user ? (
            <>
              <p>{`Logged in as: ${session.user.name}`}</p>
              <SignOutButton/>
              <AdminViewAnnouncements />
            </>
          ) : (
            <p>No user logged in</p>  
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
