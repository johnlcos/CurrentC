'use client';

import { useContext } from 'react';
import { SessionContext } from '@/app/(protected)/layout';

const AccountSettingInfoPage = () => {
  const { userSession } = useContext(SessionContext);
  console.log(userSession);

  //Can add more user information in the future such as Languages, Gender, BirthDate, Age, Country, etc...

  const convertDate = (obj: string) => {
    const createdAt = new Date(obj);
    return createdAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      Account Information
      <div>
        <div>Username</div>
        <p>{userSession?.user.user_metadata.username || 'N/A'}</p>
      </div>
      <div>
        <div>Email</div>
        <p>{userSession?.user.user_metadata.email || 'N/A'}</p>
      </div>
      <div>
        <div>Verified</div>
        <p>{userSession?.user.user_metadata.email_verified || 'N/A'}</p>
      </div>
      <div>
        <div>Account creation</div>
        <p>{userSession ? convertDate(userSession?.user.created_at) : 'N/A'}</p>
      </div>
    </div>
  );
};

export default AccountSettingInfoPage;
