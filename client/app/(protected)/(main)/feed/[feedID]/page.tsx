"use client";

import { FeedWrapper } from "@/components/FeedWrapper";
import { FeedSchema } from "@/types";
import { useState, useEffect, useContext } from "react";
import { MainFeed } from "@/components/MainFeed";
import fetchSpecificFeed from "@/hooks/fetchSpecficFeed";
import { NewFeedInputBox } from "@/components/NewFeedInputBox";

const FeedPage = ({ params }: { params: { feedID: string } }) => {
  const [currentFeed, setCurrentFeed] = useState<FeedSchema | null>(null);

  useEffect(() => {
    fetchSpecificFeed({ feedID: params.feedID }).then((data: FeedSchema) => {
      setCurrentFeed(data);
    });
  }, [params.feedID]);

  console.log(currentFeed);
  return (
    <div className="h-full w-full flex  flex-col items-center">
      {currentFeed !== null && (
        <FeedWrapper
          author={
            currentFeed.profiles
              ? currentFeed.profiles.display_name
              : currentFeed.display_name
          }
          author_username={currentFeed.profiles?.username}
          author_id={currentFeed.author_id}
          id={currentFeed.id}
          likes={currentFeed.like_count}
          dislikes={currentFeed.dislike_count}
          content={currentFeed.content}
          created_at={currentFeed.created_at}
          profile_avatar={currentFeed.profiles?.profile_avatar}
        />
      )}
      <MainFeed type="reply" replyToId={params.feedID} />
    </div>
  );
};

export default FeedPage;
