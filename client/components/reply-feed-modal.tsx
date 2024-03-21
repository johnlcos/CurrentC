import { OverviewContext } from '@/app/(protected)/layout';
import fetchSpecificFeed from '@/hooks/fetchSpecficFeed';
import { FeedSchema } from '@/types';
import { useContext, useEffect, useState } from 'react';
import { FeedWrapper } from './feed-wrapper';

export const ReplyFeedModal = () => {
  const [currentFeed, setCurrentFeed] = useState<FeedSchema | null>(null);
  const { showModal, setShowModal, selectedFeed } = useContext(OverviewContext);

  useEffect(() => {
    fetchSpecificFeed({ feedID: selectedFeed }).then((data: FeedSchema[]) => {
      setCurrentFeed(data[0]);
    });
  }, [selectedFeed]);

  const handleCloseModal = (e: React.MouseEvent) => {
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
          <div
            className='bg-white rounded shadow-md p-2 w-[30%] flex flex-col'
            onClick={handleContentClick}
          >
            <div>
              {currentFeed && (
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
        </div>
      )}
    </>
  );
};
