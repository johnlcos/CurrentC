'use client';

import { FeedWrapper } from './feed-wrapper';
import { useState, useEffect } from 'react';
import { FeedSchema } from '@/types';
import { NewFeedInputBox } from './new-feed-input-box';

export const MainFeed = () => {
  const [allFeed, setAllFeed] = useState<FeedSchema[]>([]);

  // useEffect(() => {
  //   const fetchAllFeed = async () => {
  //     const response = await fetch('http://localhost:8080/api/feed');
  //     const data = await response.json();
  //     setAllFeed(data);
  //   };
  //   fetchAllFeed();
  // }, []);

  return (
    <div id='main-feed-container' className='p-2'>
      <NewFeedInputBox setAllFeed={setAllFeed} />
      <div className='flex justify-center items-center flex-col gap-y-5'>
        {allFeed.map((feed) => (
          <FeedWrapper
            key={feed.message}
            name={feed.name}
            verificationStatus={feed.verificationstatus}
            uniqueIdentifier={feed.uniqueidentifier}
            likes={feed.likes}
            dislikes={feed.dislikes}
            message={feed.message}
            views={feed.views}
          />
        ))}
      </div>
    </div>
  );
};
