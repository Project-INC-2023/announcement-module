export interface Announcement {
  id: string;
  title: string;
  content: string;
}

export interface CreateAnnouncementProps {
  announcementCreated: (newAnnouncement: Announcement) => void;
}

export interface EditAnnouncementProps {
  editAnnouncementFunc: (announcement: Announcement, open: boolean) => void;
  announcement: Announcement;
}

export interface EditAnnouncementFromAdminPageProps {
  editAnnouncementFunc: (announcement: Announcement, open: boolean) => void;
}
