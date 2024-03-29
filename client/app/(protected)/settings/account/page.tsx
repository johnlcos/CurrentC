import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const AccountSettingsPage = () => {
  const settingsMenu = [
    'Your account',
    'Monetization',
    'Premium',
    'Creator Subscriptions',
    'Security and account acceess',
    'Privacy and safety',
    'Notifications',
    'Accessibility, display, and languages',
    'Additional resources',
    'Help center',
  ];
  return (
    <div className='text-text-white w-full h-[500px]'>
      <div>
        <div className='mb-5 text-xl'>Settings</div>
        {settingsMenu.map((setting) => (
          <div key={setting} className='flex justify-between gap-y-2 h-10'>
            <span>{setting}</span>
            <span>
              <MdOutlineKeyboardArrowRight />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSettingsPage;
