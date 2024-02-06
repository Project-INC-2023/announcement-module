import { redirect } from "next/navigation";
import ViewAnnouncements from "../_components/view-announcements";
import { getServerAuthSession } from "@/server/auth";
import ProfileDropDownMenu from "@/app/_components/profileDropDownMenu";

const UserPage = async () => {
  const session = (await getServerAuthSession())!;
  if (!session?.user) return redirect("/");

  return (
    <div className="relative flex flex-col">
      <div className="flex bg-gray-200 px-10 py-2">
        <div className="flex w-1/4 justify-start ">
          <ProfileDropDownMenu image={session.user.image} />
        </div>
        <h2 className="flex w-1/2 items-center justify-center text-xl font-semibold">
          View Announcements
        </h2>
      </div>
      <div className="w-full items-center justify-between pt-3">
        <ViewAnnouncements />
      </div>
    </div>
  );
};

export default UserPage;
