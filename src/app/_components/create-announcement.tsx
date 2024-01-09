"use client"

// import { useRouter } from 'next/router';
import { useState } from 'react';
import { api } from '@/trpc/react';

interface Announcement {
  id: string;
  title: string;
  content: string;
}

interface CreateAnnouncementProps {
  announcementCreated: (newAnnouncement: Announcement) => void;
}

export const CreateAnnouncement: React.FC<CreateAnnouncementProps> = ({ announcementCreated }) => {
 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createAnnouncement = api.an.createAnnouncement.useMutation({
    onSuccess: (newAnnouncement) => {
      announcementCreated(newAnnouncement);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !content) {
      alert('Please fill in both title and content.');
      return;
    }

    createAnnouncement.mutate({
      title,
      content,
    });

    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
    <input
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full rounded-full px-4 py-2 text-black"
    />
    <textarea
      placeholder="Content"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="w-full rounded-md px-4 py-2 text-black"
    ></textarea>
    <button
      type="submit"
      className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
      disabled={createAnnouncement.isLoading}
    >
      {createAnnouncement.isLoading ? "Submitting..." : "Submit"}
    </button>
  </form>
  );
};
