"use client";

import { useEffect, useState, useContext } from "react";
import { SessionContext } from "@/app/(protected)/layout";

interface FollowButtonProps {
  followed_id: string;
}

export const FollowButton = ({ followed_id }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const session = useContext(SessionContext);

  const fetchIsFollowing = async () => {
    const response = await fetch(
      `http://localhost:8080/users/isfollowing?follower=${session?.user.id}&followed=${followed_id}`
    );
    const json = await response.json();
    setIsFollowing(json.data);
    setLoading(false);
  };

  const fetchToggleFollow = async () => {
    setIsFollowing((prev) => !prev);
    const response = await fetch(
      `http://localhost:8080/users/follow?follower=${
        session?.user.id
      }&followed=${followed_id}&following=${!isFollowing}`
    );
  };

  useEffect(() => {
    fetchIsFollowing();
  }, []);

  return (
    <>
      {loading ? null : (
        <button
          onClick={fetchToggleFollow}
          className=" text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-1.5 transition duration-300"
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      )}
    </>
  );
};
