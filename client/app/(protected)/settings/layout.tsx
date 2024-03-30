import { RightSideWrapper } from '@/components/right-side-wrapper';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-full h-full flex'>
      <div className='w-full flex justify-center h-full '>{children}</div>
      <div className='w-3/6 p-0 fixed right-0 bg-[#17191A] hidden h-screen lg:block z-1'>
        <RightSideWrapper />
      </div>
    </div>
  );
}
