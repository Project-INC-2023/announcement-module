export interface Announcement {
  id: string;
  title: string;
  content: string;
}

export interface CreateAnnouncementProps {
  announcementCreated: (newAnnouncement: Announcement) => void;
}

export interface EditAnnouncementProps {
  editAnnouncement: (id: String, open: Boolean) => void;
}
