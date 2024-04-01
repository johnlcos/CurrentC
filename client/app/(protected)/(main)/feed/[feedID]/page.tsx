'use client';

import { FeedWrapper } from '@/components/feed-wrapper';
import { FeedSchema } from '@/types';
import { useState, useEffect, useContext } from 'react';
import { MainFeed } from '@/components/main-feed';
import fetchSpecificFeed from '@/hooks/fetchSpecficFeed';
import { NewFeedInputBox } from '@/components/new-feed-input-box';

const FeedPage = ({ params }: { params: { feedID: string } }) => {
  const [currentFeed, setCurrentFeed] = useState<FeedSchema | null>(null);

  useEffect(() => {
    fetchSpecificFeed({ feedID: params.feedID }).then((data: FeedSchema) => {
      setCurrentFeed(data);
    });
  }, [params.feedID]);

  // console.log(currentFeed);
  return (
    <div className='h-full w-full flex  flex-col items-center'>
      {currentFeed !== null && (
        <FeedWrapper
          author={
            currentFeed.profiles
              ? currentFeed.profiles.username
              : currentFeed.username
          }
          author_id={currentFeed.author_id}
          id={currentFeed.id}
          likes={currentFeed.like_count}
          dislikes={currentFeed.dislike_count}
          content={currentFeed.content}
          created_at={currentFeed.created_at}
        />
      )}
      <NewFeedInputBox type={'REPLY'} replyToId={params.feedID} />
      <MainFeed type='reply' id={params.feedID} />
    </div>
  );
};

export default FeedPage;
