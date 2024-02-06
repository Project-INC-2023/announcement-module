import { redirect } from "next/navigation";
import ViewAnnouncements from "../_components/view-announcements";
import { getServerAuthSession } from "@/server/auth";

const UserPage = async () => {
  const session = (await getServerAuthSession())!;
  if (!session?.user) return redirect("/");

  return (
    <div className="relative flex">
      <div className="w-full items-center justify-between pt-3">
        <ViewAnnouncements />
      </div>
    </div>
  );
};

export default UserPage;
