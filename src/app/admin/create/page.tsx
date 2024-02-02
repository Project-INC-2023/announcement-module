"use client";

import Link from "next/link";
import CreateAnnouncement from "@/app/_components/create-announcement";

export const AdminCreatePage: React.FC = () => {
  
// removed announcement state and handleAnnouncementCreated func
  return (
    <div className="max-w mx-auto max-h-screen text-center">
      <div className=" flex items-center justify-start bg-gray-200 py-4">
        <div data-testid="admin-create-back-link" className="w-1/4">
          <Link
            href="view"
            className=" h-9  rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Back to the admin dashboard
          </Link>
        </div>



        <h2 className="w-1/2 text-xl font-semibold">Admin Create Page</h2>
      </div>

      <div className="flex">
        <div className="w-full items-center pt-40">
          <CreateAnnouncement />
        </div>
      </div>
    </div>
  );
};

export default AdminCreatePage;
