'use client';

import { FeedWrapper } from './feed-wrapper';
import { useState, useEffect } from 'react';

export const MainFeed = () => {
  useEffect(() => {
    const fetchAllFeed = async () => {
      const response = await fetch('http://localhost:8080/api/feed');
      const data = await response.json();
      console.log(data);
    };
    fetchAllFeed();
  }, []);

  return (
    <div id='main-feed-container' className='p-2'>
      <div className='flex justify-center items-center flex-col gap-y-5'>
        <FeedWrapper
          name={'Wei'}
          verificationStatus={true}
          uniqueIdentifier={'@weiwang0305'}
          views={14}
          likes={12}
          dislikes={1}
        />
        <FeedWrapper
          name={'Peter'}
          verificationStatus={true}
          uniqueIdentifier={'@peterchung'}
          views={20}
          likes={5}
          dislikes={1}
        />
      </div>
    </div>
  );
};
