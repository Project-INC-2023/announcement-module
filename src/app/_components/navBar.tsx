import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/server/auth";
import ProfileDropDownMenu from "@/app/_components/profileDropDownMenu";

const Navbar = async () => {
  const session = await getServerAuthSession();
  if (!session?.user) return redirect("/");
  const { user } = session;
  const links = [
    {
      name: "View Announcements",
      href: "/viewAnnouncement",
    },
  ];
  if (user.systemRole === "admin") {
    links.push({
      name: "Create Announcement",
      href: "/admin/create",
    });
  }
  return (
    <nav className="flex h-20 items-center gap-4 border-b px-10">
    <ProfileDropDownMenu image={session.user.image} />
      <div className="text-xl font-bold"> 
      {user.systemRole === "admin" ? (
            <h1>Admin Navbar</h1> 
          ) : (
            <h1>User Navbar</h1>
          )}
        </div>   
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.name}   
        </Link>
      ))}
      {/* {user.systemRole === "admin" ? (
        <Button className="p-0">
        <Link href="admin/create" className="px-3">
          Create
        </Link>
      </Button>
      ) : (
        null
      )} */}
    </nav>
  );
};

export default Navbar;