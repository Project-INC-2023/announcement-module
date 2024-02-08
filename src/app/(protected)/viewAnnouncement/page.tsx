import { getServerAuthSession } from "@/server/auth";
import AdminPage from "@/app/(protected)/viewAnnouncement/AdminViewAnnouncement";
import UserPage from "@/app/(protected)/viewAnnouncement/UserViewAnnouncement";

async function Home() {
  const session = (await getServerAuthSession())!;

  return (
    <>
      {["superadmin", "admin"].includes(session.user.systemRole as string) && (
        <AdminPage />
      )}
      {session.user.systemRole === "user" && <UserPage />}
    </>
  );
}

export default Home;
