import { RightSideWrapper } from '@/components/right-side-wrapper';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-full h-full flex'>
      <div className='w-5/6 md:w-full flex justify-center h-full '>
        {children}
      </div>

      <div className='w-2/6 p-0 fixed right-0 bg-[#17191A] h-screen md:block z-1'>
        <RightSideWrapper />
      </div>
    </div>
  );
}
