"use client";

import { useEffect, useState, useContext } from "react";
import { SessionContext } from "@/app/(protected)/layout";

interface FollowButtonProps {
  followed_id: string;
}

export const FollowButton = ({ followed_id }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { userSession } = useContext(SessionContext);

  const fetchIsFollowing = async () => {
    const response = await fetch(
      `http://localhost:8080/users/isfollowing?follower=${userSession?.user.id}&followed=${followed_id}`
    );
    const json = await response.json();
    setIsFollowing(json.data);
    setLoading(false);
  };

  const fetchToggleFollow = async () => {
    setIsFollowing((prev) => !prev);
    const response = await fetch(
      `http://localhost:8080/users/follow?follower=${
        userSession?.user.id
      }&followed=${followed_id}&following=${!isFollowing}`
    );
  };

  useEffect(() => {
    fetchIsFollowing();
  }, []);

  return (
    <>
      {loading ? (
        <div className="bg-green-700 hover:bg-green-800 rounded-lg transition duration-300 w-[100px] h-[32px]"></div>
      ) : (
        <button
          onClick={fetchToggleFollow}
          className=" text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm transition duration-300 w-[100px] h-[32px]"
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      )}
    </>
  );
};
