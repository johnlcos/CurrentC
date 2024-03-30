import { RightSideWrapper } from '@/components/right-side-wrapper';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-full h-full'>
      <div className='w-full flex'>
        <div className='w-1/6 h-screen'></div>
        <div className='w-5/6 md:w-3/6 flex justify-center h-full '>
          {children}
        </div>
        <div className='w-2/6 hidden md:block'></div>
      </div>

      <div className='w-2/6 p-0 fixed right-0 bg-[#17191A] h-screen hidden md:block z-1'>
        <RightSideWrapper />
      </div>
    </div>
  );
}
