'use client';
import { userInfo } from 'os';
import { MainFeed } from '@/components/main-feed';
import { useEffect } from 'react';

export default function Home() {
  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     const userInfoRes = await fetch('http://localhost:8080/auth/getUserInfo');
  //     const userInfo = await userInfoRes.json();
  //     console.log(userInfo);
  //   };

  //   getUserInfo();
  // }, []);

  return (
    <div id='main-container' className='h-screen w-full flex bg-slate-100'>
      <div className='w-full flex flex-col md:flex-row'>
        <div className='w-full md:w-7/12'>
          <MainFeed />
        </div>
        <div className='w-full md:w-5/12 h-full bg-white'></div>
      </div>
    </div>
  );
}
