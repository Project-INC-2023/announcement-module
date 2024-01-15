"use client";

import Link from "next/link";
import { ViewAnnouncements } from "./_components/view-announcements";
import { LoginPage } from "./_components/login";

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute right-0 top-0 mr-4 mt-4 flex justify-end">
        {/* <Link href="/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">      
              Create Announcement              
          </Link> */}
        <Link
          href="/admin/view"
          className="inline-block rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        >
          Admin
        </Link>
      </div>
      {/* <LoginPage /> */}

      <ViewAnnouncements />
    </div>
  );
}
