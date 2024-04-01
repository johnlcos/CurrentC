import Link from 'next/link';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const SettingsPage = () => {
  const accountSettingMenu = [
    {
      label: 'Account Information',
      href: '/settings/account/info',
      description:
        'See your account inforamtion like your email address and name',
    },
    {
      label: 'Change your password',
      href: '/settings/account/password',
      description: 'Change your password at any time',
    },
    {
      label: 'Delete your account',
      href: '/settings/account/delete',
      description: 'Find out how you can delete your account',
    },
  ];
  return (
    <div className='text-text-white ml-5 p-5'>
      <span className='text-xl'>Account Setting</span>
      <p className='text-sm text-[#71767A] py-5'>
        See information about your account
      </p>
      <ul className='flex gap-y-2 flex-col'>
        {accountSettingMenu.map((menuItem) => (
          <li
            key={menuItem.label}
            className='flex hover:bg-box-hover-color h-10 justify-between'
          >
            <div className='flex flex-col'>
              <Link href={menuItem.href}>{menuItem.label}</Link>
              <p className='text-[#71767A] text-sm'>{menuItem.description}</p>
            </div>
            <div className='flex justify-center items-center'>
              <MdOutlineKeyboardArrowRight />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsPage;
