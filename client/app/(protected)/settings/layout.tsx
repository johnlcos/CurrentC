import { RightSideWrapper } from '@/components/right-side-wrapper';
import Link from 'next/link';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settingsMenu = [
    { label: 'Your account', href: '/settings/account' },
    { label: 'Monetization', href: '/settings/monetization' },
    { label: 'Premium', href: '/settings/premium' },
  ];

  return (
    <div className='w-full h-full flex text-text-white'>
      <div className='w-3/6 pl-[17%]'>
        <div className='p-5'>
          <div className='mb-5 text-xl'>Settings</div>
          {settingsMenu.map((setting) => (
            <div
              key={setting.label}
              className='flex justify-between gap-y-2 h-10 hover:bg-box-hover-color'
            >
              <Link
                className='flex justify-center items-center'
                href={setting.href}
              >
                {setting.label}
              </Link>
              <span className='flex justify-center items-center'>
                <MdOutlineKeyboardArrowRight />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className='w-3/6'>{children}</div>
    </div>
  );
}
