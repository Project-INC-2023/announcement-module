"use client";

import React from "react";
import { signOut } from "next-auth/react";


const SignOutButton = () => {
  return (
    <button
      type="button"
      onClick={() => {
        signOut({ callbackUrl: "/" }).catch(console.error);
      }}
      className="rounded border-2 border-red-500 px-4 py-2 font-bold text-black hover:bg-red-700 ml-2"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
