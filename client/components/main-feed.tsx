"use client";

import { FeedWrapper } from "./feed-wrapper";
import { useState, useEffect } from "react";
import { FeedSchema } from "@/types";
import { NewFeedInputBox } from "./new-feed-input-box";

export const MainFeed = ({ type, id }: { type: string; id: string }) => {
  // store the displayed feed in state
  const [allFeed, setAllFeed] = useState<FeedSchema[]>([]);

  // depending on the type of feed needed, update the request url, fetch the feed and update state
  const fetchFeed = async () => {
    let feedUrl = "";
    if (type === "main") {
      feedUrl = `http://localhost:8080/feed/main?id=${id}`;
    } else if (type === "explore") {
      feedUrl = "http://localhost:8080/feed/";
    } else if (type === "profile") {
      feedUrl = `http://localhost:8080/feed/profile?id=${id}`;
    } else if (type === "reply") {
      feedUrl = `http://localhost:8080/feed/reply?id=${id}`;
    }
    const response = await fetch(feedUrl);
    const data = await response.json();
    setAllFeed(data);
  };

  // fetch the feed on component render
  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div id="main-feed-container" className="p-2 w-full bg-[#17191A]">
      {(type === "main" || type === "explore") && (
        <NewFeedInputBox
          type={"POST"}
          setAllFeed={setAllFeed}
          replyToId={null}
        />
      )}
      <div className="flex justify-center items-center flex-col gap-y-5">
        {allFeed.map((feed) => (
          <FeedWrapper
            key={feed.id}
            author={feed.profiles ? feed.profiles.username : feed.username}
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
