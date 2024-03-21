import { OverviewContext } from '@/app/(protected)/layout';
import fetchSpecificFeed from '@/hooks/fetchSpecficFeed';
import { FeedSchema } from '@/types';
import { useContext, useEffect, useState } from 'react';
import { FeedWrapper } from './feed-wrapper';

export const ReplyFeedModal = () => {
  const { showModal, setShowModal, selectedFeed, setSelectedFeed } =
    useContext(OverviewContext);

  const handleCloseModal = (e: React.MouseEvent) => {
    setSelectedFeed(null);
    setShowModal(false);
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {showModal && (
        <div
          onClick={handleCloseModal}
          className='fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center'
        >
          {selectedFeed && (
            <div
              className='bg-white rounded shadow-md p-2 w-[50%] h-max flex flex-col justify-center items-center gap-y-5'
              onClick={handleContentClick}
            >
              <div className='w-[90%]'>
                <FeedWrapper
                  author={selectedFeed.profiles.username}
                  id={selectedFeed.id}
                  likes={selectedFeed.like_count}
                  dislikes={selectedFeed.dislike_count}
                  content={selectedFeed.content}
                  created_at={selectedFeed.created_at}
                />
              </div>
              <textarea
                className='outline w-[90%] rounded-lg p-2'
                placeholder='Post your reply'
              ></textarea>
            </div>
          )}
        </div>
      )}
    </>
  );
};
