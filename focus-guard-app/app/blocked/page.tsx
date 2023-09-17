"use client";
import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
export default function Home() {
  const { isLoaded, userId } = useAuth();
  const { isSignedIn, user } = useUser();
  const [name, setName]: any = React.useState("");
  useEffect(() => {
    if (isLoaded && userId && isSignedIn) {
      setName(user?.fullName);
    } else {
      setName("");
    }
  }, [isLoaded, userId, isSignedIn, user]);
  return (
    <main className="flex w-full items-center justify-center">
      <div>
        YOU HAVE BEEN BLOCKED FROM VISITING THIS URL FOOL {user?.fullName}
      </div>
    </main>
  );
}
