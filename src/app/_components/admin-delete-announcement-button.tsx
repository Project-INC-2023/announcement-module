"use client"

import React from 'react';
import type { Announcement } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/trpc/react';

const DeleteButton: React.FC<Pick<Announcement, "id">> = ({id }) => {
  const deleteFunction = api.an.deleteAnnouncement.useMutation();
  
  const router = useRouter();

  return (
    <button
      type="button"
      className="border-2 border-red-500 px-2"
      onClick={() => {
        toast.promise(deleteFunction.mutateAsync(id), {
          loading: 'Deleting...',
          success: () => {
            router.refresh()
            return 'Deleted!';
          },
          error: 'Something went wrong!',
        });
      }}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
