import Link from "next/link";
import ViewAnnouncements from "./_components/view-announcements";

// removed "use client" here as it is a server component now
const Home = () => (
  <div className="relative">
    <div className="absolute right-0 top-0 mr-4 mt-4 flex justify-end">
      <Link
        href="/admin/view"
        className="inline-block rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
      >
        Admin
      </Link>
    </div>
    <ViewAnnouncements />
  </div>
);

export default Home;
