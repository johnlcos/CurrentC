import { FaUserCircle } from 'react-icons/fa';
import { BiLike } from 'react-icons/bi';
import { BiDislike } from 'react-icons/bi';
import { GoUnverified } from 'react-icons/go';
import { GoVerified } from 'react-icons/go';

import { MessageWrapper } from './message-wrapper';

interface FeedWrapperProps {
  name: string;
  verificationStatus: boolean;
  uniqueIdentifier: string;
  views: number;
  likes: number;
  dislikes: number;
  message: string;
}

export const FeedWrapper = ({
  name,
  verificationStatus,
  uniqueIdentifier,
  views,
  likes,
  dislikes,
  message,
}: FeedWrapperProps) => {
  return (
    <div className='outline rounded-2xl h-[200px] w-[600px]'>
      <div className='flex m-2'>
        <div className=''>
          <FaUserCircle size={35} />
        </div>
        <div className='flex flex-col'>
          <div
            id='feed-wrapper-identifiers'
            className='flex justify-start items-center ml-3'
          >
            <span className='mr-5'>{name}</span>
            <div className='mr-5'>
              {verificationStatus === true && <GoVerified size={17} />}
              {verificationStatus === false && <GoUnverified size={17} />}
            </div>
            <span className='mr-5'>{uniqueIdentifier}</span>
          </div>
          <div className='ml-3'>
            <MessageWrapper message={message} />
          </div>
        </div>
      </div>

      <div id='feed-footer' className='text-[13px] p-5 flex justify-between'>
        <div
          id='views-likes-dislike-box'
          className='flex justify-between w-1/3'
        >
          <span>{views} Views</span>
          <div className='w-[100px] justify-self-start flex gap-4'>
            <span className='flex justify-center items-center'>
              <BiLike size={17} /> {likes}
            </span>
            <span className='flex justify-center items-center'>
              <BiDislike size={17} /> {dislikes}
            </span>
          </div>
        </div>
        <span>Reply</span>
      </div>
    </div>
  );
};