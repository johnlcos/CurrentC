import { useEffect, useState } from "react";

interface FollowButtonProps {
  follower_id: string;
  followed_id: string;
}

export const FollowButton = ({
  follower_id,
  followed_id,
}: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchIsFollowing = async () => {
    const response = await fetch(
      `http://localhost:8080/users/isfollowing?follower=${follower_id}&followed=${followed_id}`
    );
    const json = await response.json();
    console.log("FollowButton isFollowing: ", json.data);
    setIsFollowing(json.data);
    setLoading(false);
  };

  const fetchToggleFollow = async () => {
    setIsFollowing((prev) => !prev);
    console.log("fetchToggleFollow isFollowing: ", isFollowing);
    const response = await fetch(
      `http://localhost:8080/users/follow?follower=${follower_id}&followed=${followed_id}&following=${!isFollowing}`
    );
    const json = await response.json();
    console.log("FollowButton toggleFollow: ", json);
  };

  useEffect(() => {
    fetchIsFollowing();
  }, []);

  return (
    <>
      {loading ? null : (
        <button onClick={fetchToggleFollow}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </>
  );
};
