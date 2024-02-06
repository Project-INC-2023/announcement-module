// AdminPage.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import AdminViewAnnouncements from "@/app/_components/admin-view-announcements";
import { getServerAuthSession } from "@/server/auth";
import SignOutButton from "@/app/_components/signOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { Button } from "@/_components/ui/button";

const AdminPage: React.FC = async () => {
  const session = (await getServerAuthSession())!;
  if (!session?.user) return redirect("/");

  return (
    <div className="max-w mx-auto max-h-screen text-center">
      <div className="flex items-center justify-between bg-gray-200 px-10 py-2">
        <div className="flex w-1/4 justify-start">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <h2 className="w-1/2 flex-grow text-xl font-semibold">Admin page</h2>

        <div className="flex w-1/4 justify-end">
          <Button className="p-0">
            <Link href="admin/create" className="px-3">
              Create
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex">
        <div className="w-full">
          {session?.user ? (
            <AdminViewAnnouncements />
          ) : (
            <p>No user logged in</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
