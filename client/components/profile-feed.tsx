"use client";

import { useState, useEffect, useContext } from "react";
import { FeedSchema } from "@/types";
import { SessionContext } from "@/app/(protected)/layout";
import { FeedWrapper } from "./feed-wrapper";

export const ProfileFeed = ({ id }: { id: string }) => {
  const [allFeed, setAllFeed] = useState<FeedSchema[]>([]);
  const [isActiveUsersProfile, setIsActiveUsersProfile] = useState<boolean>();
  const { userSession } = useContext(SessionContext);

  const fetchFeed = async () => {
    let feedUrl = "";
    // const id = userSession?.user.id;
    feedUrl = `http://localhost:8080/feed/profile?id=${id}`;
    const response = await fetch(feedUrl);
    const data = await response.json();
    console.log("profile feed: ", data);
    setAllFeed(data);
  };

  // fetch the feed on component render
  useEffect(() => {
    setIsActiveUsersProfile(userSession?.user.id === id);
    fetchFeed();
  }, [userSession]);

  return (
    <div className="p-2 w-full bg-[#17191A]">
      <div className="flex justify-center items-center flex-col gap-y-5">
        {allFeed.map((feed) => (
          <FeedWrapper
            key={feed.id}
            author={
              isActiveUsersProfile
                ? userSession?.user.user_metadata.display_name
                : feed.profiles?.display_name
            }
            author_id={feed.author_id}
            profile_avatar={
              isActiveUsersProfile
                ? userSession?.user.user_metadata.profile_avatar
                : feed.profiles?.profile_avatar
            }
            id={feed.id}
            likes={feed.like_count}
            dislikes={feed.dislike_count}
            content={feed.content}
            created_at={feed.created_at}
          />
        ))}
      </div>
    </div>
  );
};
