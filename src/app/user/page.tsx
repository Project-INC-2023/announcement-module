import Link from "next/link";
import ViewAnnouncements from "../_components/view-announcements";
import { getServerAuthSession } from "@/server/auth";
import SignOutButton from "../_components/signOutButton";

const HomePage = async () => {
  const session = (await getServerAuthSession())!;

  //   if (session?.user) {return redirect("/")};
  return (
    <div className="relative">
      <div
        data-testid="user-admin-link"
        className="absolute right-0 top-0 mr-4 mt-4 flex justify-end"
      >
        <Link
          href="/admin/view"
          className="inline-block rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        >
          Admin
        </Link>
      </div>
      <div className="flex">
        <div className="w-full">
          <p>{`current user role is ${session.user.userSystem}`}</p>
          <p>{`Logged in as: ${session.user.name}`}</p>
          <SignOutButton />
          <ViewAnnouncements />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
