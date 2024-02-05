import { redirect } from "next/navigation";
import SignInButton from "./_components/signInButton";
import { getServerAuthSession } from "@/server/auth";

const Home = async () => {
  const session = (await getServerAuthSession())!;
  if (session?.user) redirect("/viewAnnouncement");
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="max-w-md w-full p-6 bg-slate-200 rounded-md shadow-md">
        <h2 className="text-2xl text-center font-semibold mb-4">Login Page</h2>
        <SignInButton />
      </div>
    </div>
  );
};

export default Home;
