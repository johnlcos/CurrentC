"use client";

import { useEffect, useState, useContext } from "react";
import { SessionContext } from "@/app/(protected)/layout";

interface FollowButtonProps {
  followed_id: string;
  setFollowers: React.Dispatch<React.SetStateAction<number>> | null;
}

export const FollowButton = ({
  followed_id,
  setFollowers,
}: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  // loading state in order to render a temporary placeholder before displaying Follow or Following
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

  // on click, send the follower, followed and wether or not to follow or unfollow to the backend, update state to reflect
  const fetchToggleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (setFollowers) {
      if (isFollowing) setFollowers((prev) => prev - 1);
      else setFollowers((prev) => prev + 1);
    }
    setIsFollowing((prev) => !prev);
    const response = await fetch(
      `http://localhost:8080/users/follow?follower=${
        userSession?.user.id
      }&followed=${followed_id}&following=${!isFollowing}`
    );
  };

  // on render determine if user is following
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
