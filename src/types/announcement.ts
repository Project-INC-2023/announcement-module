export interface Announcement {
    id: string;
    title: string;
    content: string;
  }

export interface CreateAnnouncementProps {
announcementCreated: (newAnnouncement: Announcement) => void;
}