  "use client"

  import Link from "next/link";
  import { ViewAnnouncements } from "./_components/view-announcements";
  import { LoginPage } from "./_components/login";

  export default function Home() {

    return (
      <div className="relative">
        <div className="flex justify-end mt-4 mr-4 absolute top-0 right-0">
          {/* <Link href="/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">      
              Create Announcement              
          </Link> */}
          <Link href="/admin" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-block">
            Admin
          </Link>
        </div>
        {/* <LoginPage /> */}
      
        <ViewAnnouncements />
      </div>
    );
  }
