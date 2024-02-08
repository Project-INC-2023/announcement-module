import ViewAnnouncements from "@/app/_components/view-announcements";

const UserPage = async () => {
  return (
    <div className="relative flex flex-col">
      <div className="w-full items-center justify-between pt-3">
        <ViewAnnouncements />
      </div>
    </div>
  );
};

export default UserPage;
