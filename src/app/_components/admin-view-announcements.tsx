"use client";

import Link from "next/link";

import { toast } from "sonner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faEdit } from "@fortawesome/free-regular-svg-icons";
import type { Announcement } from "@prisma/client"; // changed all types to prisma types

import { api } from "@/trpc/react";
import { Button } from "@/_components/ui/button";
import { Textarea } from "@/_components/ui/textarea";

const AdminViewAnnouncements = () => {
  const { data: announcements = [], refetch: reload } =
    api.an.getAllAnnouncements.useQuery();

  const deleteFunction = api.an.deleteAnnouncement.useMutation();
  dayjs.extend(relativeTime);
  return (
    <div className="mx-auto w-2/3">
      <h2 className="py-10 text-2xl font-semibold">Admin Dashboard</h2>
      {announcements.length === 0 ? (
        <p
          data-testid="admin-no-announcements"
          className="mt-4 text-xl text-gray-500"
        >
          There is no announcements in the admin view yet
        </p>
      ) : (
        <ul data-testid="admin-all-announcements">
          {announcements.map((announcement: Announcement) => (
            <li
              key={announcement.id}
              className="mb-4 rounded-lg bg-gray-200 px-5 py-3 shadow-lg"
            >
              <div className="flex justify-center gap-10">
                <div className="flex w-4/5 flex-col items-start">
                  <h3 className=" text-xl font-bold">{announcement.title}</h3>
                </div>
                <div className="flex w-1/5 justify-end">
                  <Button variant="ghost">
                    <Link className="" href={`admin/edit/${announcement.id}`}>
                      <FontAwesomeIcon className="h-5" icon={faEdit} />
                    </Link>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className=""
                    onClick={() => {
                      toast.promise(
                        deleteFunction.mutateAsync(announcement.id),
                        {
                          loading: "Deleting...",
                          success: () => {
                            void reload(); // need check if this is the correct way of resolving eslint@typescript-eslint/no-floating-promises
                            return "Deleted!";
                          },
                          error: "Something went wrong!",
                        },
                      );
                    }}
                  >
                    <FontAwesomeIcon
                      className="h-5 text-red-500"
                      icon={faTrashCan}
                    />
                  </Button>
                </div>
              </div>
              <div>
                <p className="my-5 overflow-scroll text-start text-sm">
                  <Textarea contentEditable={false}>
                    {announcement.content}
                  </Textarea>
                </p>
              </div>
              <div className="flex justify-end text-sm opacity-50">
                <p>{dayjs(announcement.updatedAt).fromNow()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminViewAnnouncements;
