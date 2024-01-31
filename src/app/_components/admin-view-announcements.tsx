"use client";

import Link from "next/link";

import { toast } from "sonner";

import type { Announcement } from "@prisma/client"; // changed all types to prisma types

import { api } from "@/trpc/react";
// import { Announcement } from "@/types/announcement";

const AdminViewAnnouncements: React.FC = () => {
  const { data: announcements = [], refetch: reload } = api.an.getAllAnnouncements.useQuery();

  const deleteFunction = api.an.deleteAnnouncement.useMutation();

  return (
    <div className="mx-auto max-w-md">
      <h2 className="py-10 text-2xl font-semibold">Admin Dashboard</h2>
      {announcements.length === 0 ? (
        <p data-testid="admin-no-announcements" className="text-xl mt-4 text-gray-500">There is no announcements in the admin view yet</p>
      ) : (
        <ul data-testid="admin-all-announcements">
        {announcements.map((announcement: Announcement) => (
          <li key={announcement.id} className="mb-4 rounded-lg bg-gray-200 p-3">
            <div className="flex justify-center gap-10">
              <div className="w-1/2 text-red-500">
                <button
                  type="button"
                  className=" border-2 border-red-500 px-2"
                  onClick={() => {
                    toast.promise(deleteFunction.mutateAsync(announcement.id), {
                      loading: "Deleting...",
                      success: () => {
                        void reload(); // need check if this is the correct way of resolving eslint@typescript-eslint/no-floating-promises
                        return "Deleted!";
                      },
                      error: "Something went wrong!",
                    });
                  }}
                >
                  Delete
                </button>
              </div>
              <div className="w-1/2">
                <Link
                  className="border-2 border-black px-2"
                  href={`edit/${announcement.id}`}
                >
                  Edit
                </Link>
              </div>
            </div>
            <h3 className="text-lg font-bold">{announcement.title}</h3>
            <p className="text-sm">{announcement.content}</p>
            <p className="text-xs text-gray-500">
                Created at: {new Date(announcement.createdAt).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                Updated at: {new Date(announcement.updatedAt).toLocaleString()}
              </p>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default AdminViewAnnouncements;