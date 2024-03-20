'use client';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';
import { BiLike } from 'react-icons/bi';
import { BiDislike } from 'react-icons/bi';
import { MessageWrapper } from './message-wrapper';
import { OverviewContext } from '@/app/(protected)/layout';
import { useContext } from 'react';

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
  const { showModal, setShowModal } = useContext(OverviewContext);

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // setShowModal(true);
    setShowModal(true);
  };

  return (
    <div
      className='outline rounded-2xl h-[200px] w-[500px]'
      onClick={() => router.push(`/feed/${id}`)}
    >
      <div className='flex m-2'>
        <div>
          <FaUserCircle size={35} />
        </div>
        <div className='flex flex-col'>
          <div
            id='feed-wrapper-identifiers'
            className='flex justify-start items-center ml-3'
          >
            <span className='mr-5'>{author}</span>
            <span>{created_at.slice(0, 10)}</span>
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
        <button onClick={handleModalClick}>Reply</button>
      </div>
    </div>
  );
};
