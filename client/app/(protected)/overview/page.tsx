'use client';
import { MainFeed } from '@/components/main-feed';
import { useState } from 'react';
import { ReplyFeedModal } from '@/components/reply-feed-modal';

export default function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div id='main-container' className='h-screen w-full flex bg-slate-100'>
      <ReplyFeedModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
      />
      <div className='w-full flex flex-col md:flex-row'>
        <div className='w-full md:w-7/12'>
          <MainFeed />
        </div>
        <div className='w-full md:w-5/12 h-full bg-white'></div>
      </div>
    </div>
  );
}
