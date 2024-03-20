import { MainFeed } from '@/components/main-feed';

export default function Home() {
  return (
    <div id='main-container' className='h-full w-full flex bg-slate-100'>
      <div className='w-full flex flex-col md:flex-row'>
        <div className='w-full md:w-7/12'>
          <MainFeed />
        </div>
        <div className='w-full md:w-5/12 h-full bg-white'></div>
      </div>
    </div>
  );
}
