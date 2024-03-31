import Link from 'next/link';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const SettingsPage = () => {
  const accountSettingMenu = [
    { label: 'Account Information', href: '/settings/account' },
    { label: 'Change your password', href: '/settings/password' },
    { label: 'Delete your account', href: '/settings/delete' },
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
            <Link
              href={menuItem.href}
              className='flex justify-center items-center'
            >
              {menuItem.label}
            </Link>
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
