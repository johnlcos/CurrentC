import { FaUserCircle } from 'react-icons/fa';
import { BiLike } from 'react-icons/bi';
import { BiDislike } from 'react-icons/bi';

import { MessageWrapper } from './message-wrapper';

interface FeedWrapperProps {
  author: string;
  id: string;
  likes: number;
  dislikes: number;
  content: string;
}

export const FeedWrapper = ({
  author,
  id,
  likes,
  dislikes,
  content,
}: FeedWrapperProps) => {
  return (
    <div className='outline rounded-2xl h-[200px] w-[400px]'>
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
        <span>Reply</span>
      </div>
    </div>
  );
};
