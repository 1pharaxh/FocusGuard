"use client";
import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isSignedIn, user } = useUser();
  // In case the user signs out while on the page.
  if (!isLoaded || !userId || !isSignedIn) {
    return null;
  }
  // if user is signed in, add a key user_id to the local storage with the value of the user id
  if (isSignedIn) {
    localStorage.setItem("user_id", userId);
  }

  return (
    <main className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center max-w-7xl ">
        <UserButton afterSignOutUrl="/delete-user-key " />
        Hello, {userId} your current active session is {sessionId}
        <div>Hello, {user.firstName} welcome to Clerk</div>
      </div>
    </main>
  );
}
