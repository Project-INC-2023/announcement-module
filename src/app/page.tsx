import Link from "next/link";
import LoginPage from "./auth/login/page";
import ViewAnnouncements from "./_components/view-announcements";
import { getServerAuthSession } from "@/server/auth";

const Home = async () => {
  const session = (await getServerAuthSession())!;

  return(
  <div className="relative">
    <div data-testid="user-admin-link" className="absolute right-0 top-0 mr-4 mt-4 flex justify-end">
      <Link
        href="/admin/view"
        className="inline-block rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
      >
        Admin
      </Link>
    </div>
    <div className="flex">
        <div className="w-full">
          {session?.user ? (
            <>
              <p>{`Logged in as: ${session.user.name}`}</p>
              <ViewAnnouncements />
            </>
          ) : (
            <LoginPage />
          )}
        </div>
      </div>
  </div>
  );
};

export default Home;
