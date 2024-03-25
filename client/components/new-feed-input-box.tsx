'use client';
import { FeedSchema } from '@/types';
import { useState, useContext } from 'react';
import { SessionContext } from '@/app/(protected)/layout';

interface NewFeedInputBoxProps {
  //MAYBE MOVE SETALLFEED TO CONTEXT
  setAllFeed?: (data: FeedSchema[]) => void;
  type: 'POST' | 'REPLY';
  replyToId: string | null;
}

export const NewFeedInputBox = ({
  setAllFeed,
  type,
  replyToId,
}: NewFeedInputBoxProps) => {
  const [value, setValue] = useState('');

  const session = useContext(SessionContext);

  const handleClick = async () => {
    if (session) {
      const response = await fetch('http://localhost:8080/feed/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: value,
          authorId: session.user.id,
          type,
          replyToId,
        }),
      });
      const data = await response.json();
      if (type === 'POST') {
        if (setAllFeed) setAllFeed(data);
      }
      setValue('');
    } else {
      return null;
    }
  };
  return (
    <div className='flex justify-center h-[150px] w-full'>
      <div className='w-[90%] md:w-[80%] max-w-[600px]'>
        <div className='m-2 flex flex-col'>
          <textarea
            className='p-2 w-full h-[100px] resize-none text-sm text-gray-900 bg-gray-500 
            rounded-lg border border-gray-300 
            focus:ring-blue-500 focus:border-blue-500 
            dark:bg-gray-700 dark-border-gray-600 dark:placeholder-gray-400 
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            name='message'
            id='new-feed-textarea'
            placeholder={
              type === 'POST' ? 'What is happening?!' : 'Post your reply!'
            }
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
          <div className='flex justify-end text-[#E4E6EB]'>
            <button onClick={handleClick}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};
