'use client';

import { FeedWrapper } from '@/components/feed-wrapper';
import { FeedSchema } from '@/types';
import { useState, useEffect } from 'react';
import fetchSpecificFeed from '@/hooks/fetchSpecficFeed';

const FeedPage = ({ params }: { params: { feedID: string } }) => {
  const [currentFeed, setCurrentFeed] = useState<FeedSchema | null>(null);

  useEffect(() => {
    // const fetchSpecificFeed = async () => {
    //   const response = await fetch(
    //     `http://localhost:8080/feed/?id=${params.feedID}`
    //   );
    //   const data = await response.json();
    //   setCurrentFeed(data[0]);
    // };
    fetchSpecificFeed({ feedID: params.feedID }).then((data: FeedSchema) => {
      setCurrentFeed(data);
    });
  }, [params.feedID]);

  return (
    <div>
      <div>
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
    </div>
  );
};

export default FeedPage;
