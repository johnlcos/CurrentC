'use client';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';
import { BiLike } from 'react-icons/bi';
import { BiDislike } from 'react-icons/bi';
import { FaReply } from 'react-icons/fa';
import { MessageWrapper } from './message-wrapper';
import { OverviewContext } from '@/app/(protected)/layout';
import { useContext, useState, useRef, useEffect } from 'react';
import { DropDown } from './dropdown';

interface FeedWrapperProps {
  author: string;
  id: string;
  likes: number;
  dislikes: number;
  content: string;
  created_at: string;
  type?: string;
}

export const FeedWrapper = ({
  author,
  id,
  likes,
  dislikes,
  content,
  created_at,
  type,
}: FeedWrapperProps) => {
  const router = useRouter();
  let dropDownRef = useRef<HTMLDivElement>(null);

  const { showModal, setShowModal, setSelectedFeedID } =
    useContext(OverviewContext);

  const [dropDown, setDropDown] = useState(false);

  const handleReplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFeedID(id);
    setShowModal(true);
  };

  const handleDropDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropDown(!dropDown);
  };

  const getTimeDifferenceInMinutes = (created_at: string): string => {
    const createdAtDate: any = new Date(created_at);
    const currentDate: any = new Date();
    const differenceInMilliseconds = currentDate - createdAtDate;
    const differenceInMinutes = Math.floor(
      differenceInMilliseconds / (1000 * 60)
    );
    if (differenceInMinutes > 1440) {
      const differenceInDays = Math.floor(differenceInMinutes / (60 * 24));
      return `${differenceInDays} days`;
    } else if (differenceInMinutes > 60) {
      const differenceInHours = Math.floor(differenceInMinutes / 60);
      return `${differenceInHours} hours`;
    } else {
      return `${differenceInMinutes} minutes`;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setDropDown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div
      className='outline h-[200px] w-[90%] md:w-[80%] max-w-[500px] 
      flex flex-col justify-between shadow-lg outline-none bg-[#252526] rounded-lg'
      onClick={() => router.push(`/feed/${id}`)}
    >
      <div className='flex m-2 w-full'>
        <div>
          <FaUserCircle size={35} style={{ color: '#8A8D91' }} />
        </div>
        <div className='flex flex-col w-full'>
          <div
            id='feed-wrapper-identifiers'
            className='w-[94%] flex justify-between items-center ml-3'
          >
            <div className='flex justify-center items-center'>
              <div className='text-[14px] bolded text-[#E4E6EB]'>{author}</div>
              <div className='opacity- text-[12px] ml-1 text-gray-500'>{`· ${getTimeDifferenceInMinutes(
                created_at
              )}`}</div>
            </div>
            <div className='flex'>
              <div className='feed-dropdown-icon' ref={dropDownRef}>
                <button
                  className='text-gray-500 relative'
                  onClick={handleDropDown}
                >
                  ...
                  {dropDown && (
                    <div className='z-10 absolute bg-[#252526] rounded-xl shadow-md'>
                      <DropDown menu={['follow', 'add/remove', 'block']} />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className='ml-3'>
            <MessageWrapper message={content} />
          </div>
        </div>
      </div>

      <div id='feed-footer' className='text-[13px] mx-3 flex justify-between'>
        <div
          id='views-likes-dislike-box'
          className='flex justify-between w-1/3'
        >
          <div className='flex gap-4'>
            <div className='flex items-center justify-center group'>
              <span className='feed-like-icon'>
                <BiLike size={17} />
              </span>
              <span className='group-hover:text-green-500 text-gray-500'>
                {likes}
              </span>
            </div>
            <div className='flex items-center justify-center group'>
              <div className='feed-dislike-icon'>
                <BiDislike size={17} />
              </div>
              <span className='group-hover:text-red-500 text-gray-500'>
                {dislikes}
              </span>
            </div>
          </div>
        </div>
        {type !== 'Modal' && (
          <div className='flex items-center justify-center group'>
            <button onClick={handleReplyClick} className='feed-reply-icon'>
              <FaReply />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
