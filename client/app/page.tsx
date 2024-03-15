'use client';
import { userInfo } from 'os';
import { SideNavBar } from './side-navbar';
import { MainFeed } from '@/components/main-feed';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const getUserInfo = async () => {
      const userInfoRes = await fetch('http://localhost:8080/auth/getUserInfo');
      const userInfo = await userInfoRes.json();
      console.log(userInfo);
    };

    getUserInfo();
  }, []);

  return (
    <div id='main-container' className='h-full w-full flex'>
      <div className='w-1/5'>
        <SideNavBar />
      </div>
      <div className='w-4/5'>
        <MainFeed />
      </div>
    </div>
  );
}
