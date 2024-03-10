'use client';
import { FeedSchema } from '@/types';
import { revalidatePath } from 'next/cache';
import { useState } from 'react';

interface NewFeedInputBoxProps {
  setAllFeed: (data: FeedSchema[]) => void;
}

export const NewFeedInputBox = ({ setAllFeed }: NewFeedInputBoxProps) => {
  const [value, setValue] = useState('');

  const handleClick = async () => {
    const response = await fetch('http://localhost:8080/api/feed/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: value }),
    });
    const data = await response.json();
    setAllFeed(data);
  };

  return (
    <div className='flex justify-center h-[150px]'>
      <div className='w-[600px]'>
        <div className='m-2 flex flex-col'>
          <textarea
            className='p-2 w-full h-[100px] resize-none text-sm text-gray-900 bg-gray-500 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark-border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            name='message'
            id='new-feed-textarea'
            placeholder='What is happening?!'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
          <div className='flex justify-end'>
            <button onClick={handleClick}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};
