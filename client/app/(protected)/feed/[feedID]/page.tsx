'use client';

import { FeedWrapper } from '@/components/feed-wrapper';
import { FeedSchema } from '@/types';
import { useState, useEffect } from 'react';
import fetchSpecificFeed from '@/hooks/fetchSpecficFeed';

const FeedPage = ({ params }: { params: { feedID: string } }) => {
  const [currentFeed, setCurrentFeed] = useState<FeedSchema | null>(null);

  useEffect(() => {
    fetchSpecificFeed({ feedID: params.feedID }).then((data: FeedSchema) => {
      setCurrentFeed(data);
    });
  }, [params.feedID]);

  return (
    <div className='h-full w-full flex justify-center'>
      {currentFeed !== null && (
        <FeedWrapper
          author={currentFeed.profiles.username}
          id={currentFeed.id}
          likes={currentFeed.like_count}
          dislikes={currentFeed.dislike_count}
          content={currentFeed.content}
          created_at={currentFeed.created_at}
        />
      )}
    </div>
  );
};

export default FeedPage;
