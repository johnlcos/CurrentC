'use client';

import { FeedWrapper } from './feed-wrapper';
import { useState, useEffect } from 'react';
import { FeedSchema } from '@/types';
import { NewFeedInputBox } from './new-feed-input-box';

export const MainFeed = ({ type, id }: { type: string; id: string }) => {
  const [allFeed, setAllFeed] = useState<FeedSchema[]>([]);

  const fetchFeed = async () => {
    let feedUrl = '';
    if (type === 'main') {
      feedUrl = `http://localhost:8080/feed/main?id=${id}`;
    } else if (type === 'explore') {
      feedUrl = 'http://localhost:8080/feed/';
    } else if (type === 'profile') {
      feedUrl = `http://localhost:8080/feed/profile?id=${id}`;
    } else if (type === 'reply') {
      feedUrl = `http://localhost:8080/feed/reply?id=${id}`;
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
    <div id='main-feed-container' className='p-2 w-full bg-[#17191A]'>
      {type === 'main' && (
        <NewFeedInputBox
          type={'POST'}
          setAllFeed={setAllFeed}
          replyToId={null}
        />
      )}
      <div className='flex justify-center items-center flex-col gap-y-5'>
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
