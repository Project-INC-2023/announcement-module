"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
// import { CreateAnnouncementProps } from "@/types/announcement";

// removed prop CreateAnnouncementProps as its not needed
// changed to using objects to manage all states
// could take out React.FC
// changed success/error messages to a normal div instead of a toast
const CreateAnnouncement: React.FC = () => {
  const [announcementData, setAnnouncementData] = useState({
    title: "",
    content: ""
  })

  const [textMessage, setTextMessage] = useState<string | null>(null);

  const createAnnouncement = api.an.createAnnouncement.useMutation({
    onSuccess: (newAnnouncement) => {
      setTextMessage(`${newAnnouncement.title} announcement has been added`);
    },
    onError: (error) => {
      setTextMessage(`Error creating announcement: ${error.message}`);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAnnouncementData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

      if (!announcementData.title || !announcementData.content) {
        setTextMessage("Error: Please fill in both title and content.");
        return;
      }

    try {
      createAnnouncement.mutate({
        title: announcementData.title,
        content: announcementData.content,
      });
      setAnnouncementData({
        title: "",
        content: ""
      });
      setTextMessage(null);
    } catch (error) {
      setTextMessage(`Error creating announcement: ${(error as Error).message}`);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-gray-100 p-6">
          <h1 className="mb-4 text-center text-2xl font-bold">
            Create Announcement
          </h1>

          {textMessage && (
            <div className={`mb-4 ${textMessage.startsWith("Error") ? 'text-red-500' : 'text-green-500'}`}
                 data-testid="admin-create-message"
            >
              {textMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              data-testid="admin-create-title-input"
              type="text"
              name="title"
              placeholder="Title"
              value={announcementData.title}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
            <textarea
              data-testid="admin-create-content-input"
              name="content"
              placeholder="Content"
              value={announcementData.content}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
              rows={4}
            />
            <button
              data-testid="admin-create-announcement-button"
              type="submit"
              className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
              disabled={createAnnouncement.isLoading}
            >
              {createAnnouncement.isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncement;