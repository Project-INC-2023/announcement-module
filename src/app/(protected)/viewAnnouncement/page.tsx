import { getServerAuthSession } from "@/server/auth";
// import { db } from "@/server/db";
import AdminPage from "./AdminViewAnnouncement";
import UserPage from "./UserViewAnnouncement";

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
