import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
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
        <div className="col-span-1 h-screen flex justify-center items-center">
          <SignIn />
        </div>
      </div>
    </main>
  );
}
