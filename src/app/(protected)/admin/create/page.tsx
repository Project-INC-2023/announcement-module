import Link from "next/link";
import CreateAnnouncement from "@/app/_components/create-announcement";
import { getServerAuthSession } from "@/server/auth";
import { Button } from "@/_components/ui/button";
import ProfileDropDownMenu from "@/app/_components/profileDropDownMenu";

const AdminCreatePage: React.FC = async () => {
  const session = (await getServerAuthSession())!;

  // removed announcement state and handleAnnouncementCreated func
  return (
    <div className="max-w mx-auto max-h-screen text-center">
      <div className=" flex items-center justify-start bg-gray-200 px-10 py-2">
        <div className="flex w-1/4 justify-start">
          <ProfileDropDownMenu image={session.user.image} />
        </div>

        <h2 className="w-1/2 text-xl font-semibold">Admin Create Page</h2>
        <div
          data-testid="admin-create-back-link"
          className="flex w-1/4 justify-end"
        >
          <Button className="p-0">
            <Link href="/viewAnnouncement" className="px-4">
              Back to the admin dashboard
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex">
        <div className="w-full items-center pt-40">
          <CreateAnnouncement />
        </div>
      </div>
    </div>
  );
};

export default AdminCreatePage;
