import { MainFeed } from '@/components/main-feed';

export default function Explore() {
  return (
    <div className='w-full flex flex-col'>
      <MainFeed type='explore' />
    </div>
  );
}
