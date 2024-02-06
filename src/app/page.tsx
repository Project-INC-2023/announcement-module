import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { getServerAuthSession } from "@/server/auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/_components/ui/card";
import { Label } from "@/_components/ui/label";
import { Button } from "@/_components/ui/button";

const Home = async () => {
  const session = (await getServerAuthSession())!;
  if (session?.user) redirect("/viewAnnouncement");
  
  return (
    
    <Card className="w-[350px] shadow-md">
    <CardHeader>
      <CardTitle>Create project</CardTitle>
      <CardDescription>Deploy your new project in one-click.</CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={()=> {
          signIn("github", { callbackUrl: "/viewAnnouncement" }).catch(console.error);
        }}>
        <FaGithub />
      </Button>
    </CardFooter>
  </Card>
  );
};

export default Home;


// <div className="min-h-screen flex items-center justify-center bg-slate-100">
//       <div className="max-w-md w-full p-6 bg-slate-200 rounded-md shadow-md">
//         <h2 className="text-2xl text-center font-semibold mb-4">Login Page</h2>
//         <SignInButton />
//       </div>
//     </div>