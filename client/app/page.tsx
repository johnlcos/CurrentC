import Image from 'next/image';
import { SideNavBar } from './side-navbar';
import { MainFeed } from '@/components/main-feed';
import { NewFeedInputBox } from '@/components/new-feed-input-box';

export default function Home() {
  return (
    <div id='main-container' className='h-full w-full flex'>
      <div className='w-1/5'>
        <SideNavBar />
      </div>
      <div className='w-4/5'>
        <NewFeedInputBox />
        <MainFeed />
      </div>
    </div>
  );
}
