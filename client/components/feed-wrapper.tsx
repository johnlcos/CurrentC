'use client';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';
import { BiLike } from 'react-icons/bi';
import { BiDislike } from 'react-icons/bi';
import { MessageWrapper } from './message-wrapper';
import { OverviewContext } from '@/app/(protected)/layout';
import { useContext } from 'react';
import { difference } from 'next/dist/build/utils';

interface FeedWrapperProps {
  author: string;
  id: string;
  likes: number;
  dislikes: number;
  content: string;
  created_at: string;
}

export const FeedWrapper = ({
  author,
  id,
  likes,
  dislikes,
  content,
  created_at,
}: FeedWrapperProps) => {
  const router = useRouter();
  const { showModal, setShowModal, setSelectedFeedID } =
    useContext(OverviewContext);

  const handleReplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('id', id);
    setSelectedFeedID(id);
    setShowModal(true);
  };

  const getTimeDifferenceInMinutes = (created_at: string): number => {
    const createdAtDate: any = new Date(created_at);
    const currentDate: any = new Date();
    const differenceInMilliseconds = currentDate - createdAtDate;
    const differenceInMinutes = Math.floor(
      differenceInMilliseconds / (1000 * 60)
    );
    return differenceInMinutes;
  };

  return (
    <div
      className='outline rounded-2xl h-[200px] w-[90%] md:w-[80%] max-w-[500px]'
      onClick={() => router.push(`/feed/${id}`)}
    >
      <div className='flex m-2 w-full'>
        <div>
          <FaUserCircle size={35} />
        </div>
        <div className='flex flex-col w-[80%] sm:w-[85%] '>
          <div
            id='feed-wrapper-identifiers'
            className='w-full flex justify-between items-center ml-3'
          >
            <div className='flex justify-center'>
              <div className='mr-5'>{author}</div>
              <div>{`${getTimeDifferenceInMinutes(
                created_at
              )} minutes ago`}</div>
            </div>
            <div>...</div>
          </div>
          <div className='ml-3'>
            <MessageWrapper message={content} />
          </div>
        </div>
      </div>

      <div id='feed-footer' className='text-[13px] p-5 flex justify-between'>
        <div
          id='views-likes-dislike-box'
          className='flex justify-between w-1/3'
        >
          <div className='w-[100px] justify-self-start flex gap-4'>
            <span className='flex justify-center items-center'>
              <BiLike size={17} /> {likes}
            </span>
            <span className='flex justify-center items-center'>
              <BiDislike size={17} /> {dislikes}
            </span>
          </div>
        </div>
        <button onClick={handleReplyClick}>Reply</button>
      </div>
    </div>
  );
};
