// file to be removed

export interface Announcement { 
  id: string;
  title: string;
  content: string;
}

export interface CreateAnnouncementProps {
  announcementCreated: (newAnnouncement: Announcement) => void;
}

export interface EditAnnouncementProps {
  announcement: Announcement;
}

export interface EditAnnouncementPageProps {
  announcement_id: string;
}
