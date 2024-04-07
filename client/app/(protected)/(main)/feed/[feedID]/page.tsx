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
              ? currentFeed.profiles.display_name
              : currentFeed.display_name
          }
          author_id={currentFeed.author_id}
          id={currentFeed.id}
          likes={currentFeed.like_count}
          dislikes={currentFeed.dislike_count}
          content={currentFeed.content}
          created_at={currentFeed.created_at}
          profile_avatar={currentFeed.profiles?.profile_avatar}
        />
      )}
      <NewFeedInputBox type={'REPLY'} replyToId={params.feedID} />
      <MainFeed type='reply' />
    </div>
  );
};

export default FeedPage;
