'use client';

import { usePathname } from 'next/navigation';
import { UserSearch } from './user-search';
import { AccountSettingForm } from './account-setting-form';

export const RightSideWrapper = () => {
  const pathname = usePathname();
  return (
    <div>
      {pathname === '/overview' && <UserSearch />}
      {pathname === '/settings/account' && <AccountSettingForm />}
    </div>
  );
};
