import Link from "next/link";
import { redirect } from "next/navigation";
import SignInButton from "./_components/signInButton";
import ViewAnnouncements from "./_components/view-announcements";
import { getServerAuthSession } from "@/server/auth";

const Home = async () => {
  const session = (await getServerAuthSession())!;
  if (session?.user) redirect("/viewAnnouncement");
  
  return(
  <div className="relative">
    <div className="h-full flex items-center justify-center"> Login Page</div>
    <SignInButton />
  </div>
  );
};

export default Home;
