'use client';

import { FeedWrapper } from '@/components/feed-wrapper';
import { FeedSchema } from '@/types';
import { useState, useEffect } from 'react';

const FeedPage = ({ params }: { params: { feedID: string } }) => {
  const [currentFeed, setAllFeed] = useState<FeedSchema | null>(null);

  useEffect(() => {
    const fetchSpecificFeed = async () => {
      const response = await fetch(
        `http://localhost:8080/feed/?id=${params.feedID}`
      );
      const data = await response.json();
      console.log(data);
    };
    fetchSpecificFeed();
  }, [params.feedID]);

  return (
    <div>
      <div>{params.feedID}</div>
    </div>
  );
};

export default FeedPage;
