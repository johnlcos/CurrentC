"use client";
import { useContext } from "react";
import { FollowButton } from "@/components/follow-button";
import { SessionContext } from "@/app/(protected)/layout";
import { FaUserCircle } from "react-icons/fa";
import { MainFeed } from "@/components/main-feed";
import Link from "next/link";

export default function UserProfile({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { id: string };
}) {
  const session = useContext(SessionContext);
  const profileId =
    !searchParams.id && session ? session.user.id : searchParams.id;

  return (
    <div className="w-full flex flex-col">
      <div id="header" className="w-full flex content-between p-4">
        <div className="flex flex-col items-center w-2/6">
          <FaUserCircle size={200} color="#8A8D91" />
          <h1 className="text-[#E4E6EB]">{params.username}</h1>
        </div>
        <div className="w-3/6">
          <p className="text-[#E4E6EB]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
        <div className="w-1/6">
          {searchParams.id ? (
            <FollowButton followed_id={searchParams.id} />
          ) : (
            <Link href={`/profile/${params.username}/edit`}>
              <div className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm transition duration-300 w-[100px] h-[32px] flex justify-center items-center">
                Edit Profile
              </div>
            </Link>
          )}
        </div>
      </div>
      <MainFeed type="profile" id={profileId} />
    </div>
  );
}
