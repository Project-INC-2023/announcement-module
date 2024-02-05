import { redirect } from "next/navigation";
import ViewAnnouncements from "../_components/view-announcements";
import { getServerAuthSession } from "@/server/auth";
import SignOutButton from "../_components/signOutButton";

const UserPage = async () => {
  const session = (await getServerAuthSession())!;
  if (!session?.user) return redirect("/");
  
  return (
    <div className="relative flex">
      <div className="w-full pt-3 items-center justify-between">
        <SignOutButton />
        <ViewAnnouncements />
      </div>
    </div>
  );
}

export default UserPage;
