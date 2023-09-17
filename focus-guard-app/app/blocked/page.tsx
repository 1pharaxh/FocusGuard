"use client";
import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { ArrowLeftIcon, GlobeIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect } from "react";
export default function Home() {
  const { isLoaded, userId } = useAuth();
  const { isSignedIn, user } = useUser();
  const [name, setName]: any = React.useState("");
  const goBack = () => {
    // go back twice
    window.history.go(-2);
  };

  const goToAnalytics = () => {
    window.location.href = "/";
  };
  useEffect(() => {
    if (isLoaded && userId && isSignedIn) {
      setName(user?.fullName);
    } else {
      setName("");
    }
  }, [isLoaded, userId, isSignedIn, user]);
  return (
    <main className="flex w-full items-center justify-center">
      <div className="grid gap-4 md:grid-cols-2 w-full">
        <div
          className="hidden col-span-1 bg-gradient-to-r from-green-500/20
  via-blue-500 md:flex flex-col justify-center items-center
  to-indigo-500/60 h-screen"
        >
          <Image
            className="object-cover rounded-lg shadow-lg"
            alt="Focus Guard Login Image"
            src="/focus_guard_signup.jpeg"
            width={500}
            height={500}
          />
          <h2 className="text-xl  text-white mt-2 font-sans">
            Your focus determines your reality
            <span className="text-sm block text-center text-white mt-2 font-sans">
              Sun Tzu - The Art of War
            </span>
          </h2>
        </div>
        <div className="col-span-1 h-screen flex flex-col justify-center items-center">
          <Image
            className="object-cover rounded-lg"
            alt="Focus Guard Logo Image"
            src="/focusGuardLogo.png"
            width={300}
            height={300}
          />
          <span
            className="
        text-2xl
        max-w-[400px] text-center
        bg-gradient-to-br from-indigo-500
        via-violet-500
        to-indigo-500 bg-clip-text font-bold text-transparent"
          >
            Focus Guard blocked this page for {name}
          </span>

          <div className="flex items-center justify-center space-x-4 mt-4">
            <Button onClick={goToAnalytics} variant="outline">
              <GlobeIcon className="w-4 h-4 mr-1" />
              Dashboard
            </Button>
            <Button onClick={goBack} variant="outline">
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
