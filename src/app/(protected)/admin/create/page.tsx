import CreateAnnouncement from "@/app/_components/create-announcement";

const AdminCreatePage: React.FC = async () => {
  return (
    <div className="max-w mx-auto max-h-screen text-center">
      <div className="flex">
        <div className="w-full items-center pt-40">
          <CreateAnnouncement />
        </div>
      </div>
    </div>
  );
};

export default AdminCreatePage;
