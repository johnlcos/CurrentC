"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BiBell,
  BiCog,
  BiEnvelope,
  BiExit,
  BiHome,
  BiMapAlt,
  BiSolidUser,
} from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SessionContext } from "@/app/(protected)/layout";

export const SideNavBar = () => {
  const router = useRouter();
  const { userSession } = useContext(SessionContext);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/signOut");
      const data = await response.json();
      if (data.success) {
        router.push(data.redirectUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      id="left-column"
      className="flex flex-col gap-y-5 items-center p-5 bg-[#17191A] shadow-2xl h-full w-full px-2"
    >
      <div className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] relative rounded-full overflow-hidden">
        <Image src={"/alerty.png"} fill alt="Alerty Logo"></Image>
      </div>
      <div className="flex flex-col gap-3 w-full md:w-5/6">
        <Link
          href="/overview"
          className="text-center bg-background p-3 text-text-white font-semibold border-b border-surface shadow-md flex items-center justify-center gap-2 hover:border-primary-500 transition duration-300"
        >
          <BiHome />
          <p className="hidden lg:block">Home</p>
        </Link>
        <Link
          href="/explore"
          className="text-center bg-background p-3 text-text-white font-semibold border-b border-surface shadow-md flex items-center justify-center gap-2 hover:border-primary-500 transition duration-300"
        >
          <BiMapAlt />
          <p className="hidden lg:block">Explore</p>
        </Link>
        <Link
          href="/"
          className="text-center bg-background p-3 text-text-white font-semibold border-b border-surface shadow-md flex items-center justify-center gap-2 hover:border-primary-500 transition duration-300"
        >
          <BiBell />
          <p className="hidden lg:block">Notifications</p>
        </Link>
        <Link
          href="/"
          className="text-center bg-background p-3 text-text-white font-semibold border-b border-surface shadow-md flex items-center justify-center gap-2 hover:border-primary-500 transition duration-300"
        >
          <BiEnvelope />
          <p className="hidden lg:block">Messages</p>
        </Link>
        <Link
          href={`/profile/${userSession?.user.user_metadata.username}`}
          className="text-center bg-background p-3 text-text-white font-semibold border-b border-surface shadow-md flex items-center justify-center gap-2 hover:border-primary-500 transition duration-300"
        >
          <BiSolidUser />
          <p className="hidden lg:block">Profile</p>
        </Link>
        <Link
          href="/settings/account"
          className="text-center bg-background p-3 text-text-white font-semibold border-b border-surface shadow-md flex items-center justify-center gap-2 hover:border-primary-500 transition duration-300"
        >
          <BiCog />
          <p className="hidden lg:block">Settings</p>
        </Link>
        <button
          className="text-center bg-background p-3 text-text-white font-semibold border-b border-surface shadow-md flex items-center justify-center gap-2 hover:border-primary-500 transition duration-300"
          onClick={handleSignOut}
        >
          <BiExit />
          <p className="hidden lg:block">Sign Out</p>
        </button>
      </div>
    </div>
  );
};
