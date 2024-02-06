"use client"

import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Button } from "@/_components/ui/button";
import { Label } from "@/_components/ui/label";
import { Input } from "@/_components/ui/input";

const LoginPage = () => {
  const [isLoading] = useState<boolean>(false);

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl text-center mb-4 font-semibold tracking-tight">Sign in</h1>
        <p className="text-sm text-muted-foreground text-center mb-4"> Welcome to announcement module! </p>
        <form>   
          <div className="mb-4">
            <Label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="email for magic link"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading} className="w-full">
            Sign In with Email
          </Button>
        </form>
        <div className="mt-4 flex items-center justify-between">
          <div className="w-full border-t border-gray-300" />
          <span className="w-full text-xs text-gray-500 uppercase">Or continue with</span>
          <div className="w-full border-t border-gray-300" />
        </div>
        <Button variant="outline" type="button" disabled={isLoading} className="mt-4 h-10 w-full">
          {isLoading ? 
            <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" /> 
            : 
            <FaGithub className="mr-2 h-6 w-4"
                      onClick={() => {
                        signIn("github", { callbackUrl: "/viewAnnouncement" }).catch(console.error);
                      }} />}
          GitHub
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;