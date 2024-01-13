export interface Announcement {
  id: string;
  title: string;
  content: string;
}

export interface CreateAnnouncementProps {
  announcementCreated: (newAnnouncement: Announcement) => void;
}

export interface EditAnnouncementProps {
  editAnnouncement: (id: string, open: boolean) => void;
  announcementId: string;
}

export interface EditAnnouncementFromAdminPageProps {
  editAnnouncement: (id: string, open: boolean) => void;
}
