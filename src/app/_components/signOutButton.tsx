"use client";

import React from "react";
import { signOut } from "next-auth/react";


const SignOutButton = () => {
  return (
    <button type="button"
      onClick={() => {
        signOut().catch(console.error);
      }}
    >
      Sign out
    </button>
  );
};

export default SignOutButton;