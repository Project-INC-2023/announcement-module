import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";

import LoginPage from "./_components/authentication";


const Home = async () => {
  const session = (await getServerAuthSession())!;
  if (session?.user) redirect("/viewAnnouncement");
  
  return (
    <div className="w-full min-h-screen justify-center items-center bg-slate-100 pt-60">
       <LoginPage />
    </div>
  );
};

export default Home;
