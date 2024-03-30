import Link from 'next/link';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const SettingsPage = () => {
  const settingsMenu = [
    { label: 'Your account', href: 'settings/account' },
    { label: 'Monetization', href: 'settings/monetization' },
    { label: 'Premium', href: 'settings/premium' },
  ];
  return (
    <div className='text-text-white w-full h-[500px]'>
      <div>
        <div className='mb-5 text-xl'>Settings</div>
        {settingsMenu.map((setting) => (
          <div
            key={setting.label}
            className='flex justify-between gap-y-2 h-10'
          >
            <Link href={setting.href}>{setting.label}</Link>
            <span>
              <MdOutlineKeyboardArrowRight />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
