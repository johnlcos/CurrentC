import { FeedWrapper } from '@/components/feed-wrapper';

export const MainFeed = () => {
  return (
    <div id='main-feed-container' className='p-2'>
      <div className='flex justify-center items-center flex-col gap-y-5'>
        <FeedWrapper
          name={'Wei'}
          verificationStatus={true}
          uniqueIdentifier={'@weiwang0305'}
          views={14}
          likes={12}
          dislikes={1}
        />
        <FeedWrapper
          name={'Peter'}
          verificationStatus={true}
          uniqueIdentifier={'@peterchung'}
          views={20}
          likes={5}
          dislikes={1}
        />
      </div>
    </div>
  );
};
