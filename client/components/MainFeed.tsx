"use client";

import { FeedWrapper } from "./FeedWrapper";
import { useState, useEffect, useContext } from "react";
import { FeedSchema } from "@/types";
import { NewFeedInputBox } from "./NewFeedInputBox";
import { SessionContext } from "@/app/(protected)/layout";

interface MainFeedProps {
  type: "main" | "explore" | "profile" | "reply";
  replyToId?: string;
}

export const MainFeed = ({ type, replyToId }: MainFeedProps) => {
  // store the displayed feed in state
  const [allFeed, setAllFeed] = useState<FeedSchema[]>([]);
  const { userSession } = useContext(SessionContext);

  // depending on the type of feed needed, update the request url, fetch the feed and update state

  // fetch the feed on component render
  useEffect(() => {
    const fetchFeed = async () => {
      let feedUrl = "";
      if (type === "main") {
        feedUrl = `http://localhost:8080/feed/main?id=${userSession?.user.id}`;
      } else if (type === "explore") {
        feedUrl = "http://localhost:8080/feed/";
      } else if (type === "profile") {
        feedUrl = `http://localhost:8080/feed/profile?id=${userSession?.user.id}`;
      } else if (type === "reply") {
        feedUrl = `http://localhost:8080/feed/reply?id=${replyToId}`;
      }
      const response = await fetch(feedUrl);
      const data = await response.json();
      setAllFeed(data);
    };
    fetchFeed();
  }, [replyToId, type, userSession?.user.id]);
  return (
    <div id="main-feed-container" className="p-2 w-full bg-[#17191A]">
      {(type === "main" || type === "explore" || "reply") && (
        <NewFeedInputBox
          type={type === "reply" ? "REPLY" : "POST"}
          setAllFeed={setAllFeed}
          replyToId={replyToId}
        />
      )}
      <div className="flex justify-center items-center flex-col gap-y-5">
        {allFeed.map((feed) => (
          <FeedWrapper
            key={feed.id}
            author={
              feed.profiles ? feed.profiles.display_name : feed.display_name
            }
            author_username={
              feed.profiles ? feed.profiles.username : feed.username
            }
            author_id={feed.author_id}
            profile_avatar={
              feed.profiles ? feed.profiles.profile_avatar : feed.profile_avatar
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
