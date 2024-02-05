"use client"

import { signIn } from "next-auth/react";

const SignInButton = () => {
  return (
    <div className="flex items-center justify-center mt-8">
      <button
        type="button"
        onClick={() => {
          signIn("github", { callbackUrl: "/viewAnnouncement" }).catch(console.error);
        }}
        className="p-3 text-xl bg-slate-700 text-white font-semibold rounded hover:bg-slate-900"
      >
        Sign In with Github
      </button>
    </div>
  );
};

export default SignInButton;
