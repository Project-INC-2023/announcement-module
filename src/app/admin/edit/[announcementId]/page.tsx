"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import EditAnnouncement from "@/app/_components/edit-announcement";

const AdminEdit: React.FC = () => {
  const router = useRouter();
  const { announcementId } = useParams<{ announcementId: string }>();
  const { getSpecificAnnouncement } = api.an;

  if (announcementId === undefined) {
    router.back();
    return null;
  }
  const { data: announcementRawData } =
    getSpecificAnnouncement.useQuery(announcementId);

  return (
    <div className="max-w mx-auto max-h-screen text-center">
      <div className=" flex items-center justify-start bg-gray-200 py-4">
        <div data-testid="admin-edit-back-link" className="w-1/4">
          <Link
            href="/admin/view"
            className=" h-9  rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Back to the admin dashboard
          </Link>
        </div>

        <h2 className="w-1/2 text-xl font-semibold">Admin Edit Page</h2>
      </div>

      <div className="flex">
        <div className="w-full items-center pt-40">
          {announcementRawData?.content === undefined ||
          announcementRawData.title === undefined ||
          announcementRawData.id === undefined ? (
            <div>Loading ...</div>
          ) : (
            <EditAnnouncement
              id={announcementRawData.id}
              title={announcementRawData.title}
              content={announcementRawData.content}
              createdAt={announcementRawData.createdAt}
              updatedAt={announcementRawData.updatedAt}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEdit;
