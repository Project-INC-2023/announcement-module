"use client"

import { signIn } from "next-auth/react";

const SignInButton = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <button
        type="button"
        onClick={() => {
          signIn("github", {callbackUrl:"/viewAnnouncement"}).catch(console.error);
        }}
        className="p-3 text-xl  bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Sign In with Github
      </button>
    </div>
  );
};

export default SignInButton;
