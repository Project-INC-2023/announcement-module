"use client";
import { api } from "@/trpc/react";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { EditAnnouncement } from "@/app/_components/edit-announcement";

export const AdminEdit: React.FC = ({}) => {
  const { announcement_id } = useParams();
  const getSpecificAnnouncement = api.an.getSpecificAnnouncement;

  if (announcement_id == undefined || Array.isArray(announcement_id)) {
    const router = useRouter();
    router.back();
    return;
  }
  const { data: announcement_raw_data } =
    getSpecificAnnouncement.useQuery(announcement_id);

  return (
    <div className="max-w mx-auto max-h-screen text-center">
      <div className=" flex items-center justify-start bg-gray-200 py-4">
        <div className="w-1/4">
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
          {announcement_raw_data == undefined ||
          announcement_raw_data.content == undefined ||
          announcement_raw_data.title == undefined ||
          announcement_raw_data.id == undefined ? (
            <div>Loading ...</div>
          ) : (
            <EditAnnouncement
              announcement={{
                id: announcement_raw_data.id,
                title: announcement_raw_data.title,
                content: announcement_raw_data.content,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEdit;
