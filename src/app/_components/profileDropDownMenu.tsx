"use client";

import { signOut } from "next-auth/react";
import type { User } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/_components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/_components/ui/avatar";

const ProfileDropDownMenu: React.FC<Pick<User, "image">> = ({ image }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="h-12 w-12">
          <AvatarImage src={image!} alt="Profile Picture" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            // to implement proper error handling
            signOut({ callbackUrl: "/" }).catch(console.error);
          }}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropDownMenu;
