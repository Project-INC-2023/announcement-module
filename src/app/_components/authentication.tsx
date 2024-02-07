"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import { toast } from "sonner";
import { ImSpinner2 } from "react-icons/im";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Button } from "@/_components/ui/button";
import { Label } from "@/_components/ui/label";
import { Input } from "@/_components/ui/input";

const LoginPage = () => {
  const [isLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [signedIn, setSignedIn] = useState<boolean>(false);

  return (
    <div className="mx-auto max-w-md">
      {signedIn && (
        <div
          data-testid="notify-email-sent"
          className="rounded-md bg-green-50 p-4"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <FontAwesomeIcon
                className="h-5 w-5 text-green-500"
                icon={faEnvelopeOpen}
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Check your inbox for the magic link
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-semibold tracking-tight">
          Sign in
        </h1>
        <p className="mb-4 text-center text-sm text-muted-foreground">
          {" "}
          Welcome to announcement module!{" "}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn("email", {
              email,
              redirect: false,
            })
              .then((data) => {
                console.log(data);
                if (data?.error === null) {
                  setSignedIn(true);
                  setEmail("");
                }
                if (data?.error === "AccessDenied") {
                  setSignedIn(false);
                  toast.error(
                    "Please contact your system administrator to get access to the system.",
                  );
                }
              })
              .catch((error) => {
                console.log(error);
                setSignedIn(false);
              });
          }}
        >
          <div className="mb-4">
            <Label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </Label>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
              placeholder="email for magic link"
              minLength={1}
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
          <span className="w-full text-xs uppercase text-gray-500">
            Or continue with
          </span>
          <div className="w-full border-t border-gray-300" />
        </div>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          className="mt-4 h-10 w-full"
          onClick={() => {
            signIn("github", { callbackUrl: "/viewAnnouncement" }).catch(
              console.error,
            );
          }}
        >
          {isLoading ? (
            <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FaGithub className="mr-2 h-6 w-4" />
          )}
          GitHub
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
