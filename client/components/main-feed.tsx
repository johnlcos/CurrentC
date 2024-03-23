"use client";

import { FeedWrapper } from "./feed-wrapper";
import { useState, useEffect } from "react";
import { FeedSchema } from "@/types";
import { NewFeedInputBox } from "./new-feed-input-box";

export const MainFeed = ({ type, id }: { type: string; id: string }) => {
  const [allFeed, setAllFeed] = useState<FeedSchema[]>([]);

  const fetchFeed = async () => {
    let feedUrl = "";
    if (type === "main") {
      feedUrl = "http://localhost:8080/feed/";
    } else if (type === "profile") {
      feedUrl = `http://localhost:8080/feed?id=${id}`;
    }
    const response = await fetch(feedUrl);
    const data = await response.json();
    setAllFeed(data);
  };

  useEffect(() => {
    // const fetchAllFeed = async () => {
    //   const response = await fetch("http://localhost:8080/feed/");
    //   const data = await response.json();
    //   setAllFeed(data);
    // };
    // fetchAllFeed();
    fetchFeed();
  }, []);

  return (
    <div id="main-feed-container" className="p-2 w-full">
      {type === "main" && <NewFeedInputBox setAllFeed={setAllFeed} />}
      <div className="flex justify-center items-center flex-col gap-y-5">
        {allFeed.map((feed) => (
          <FeedWrapper
            key={feed.id}
            author={feed.profiles.username}
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
