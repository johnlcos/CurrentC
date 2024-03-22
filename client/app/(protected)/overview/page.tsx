'use client';
import { userInfo } from 'os';
import { MainFeed } from '@/components/main-feed';
import { useEffect, useState } from 'react';
import { UserSearch } from '@/components/user-search';

export default function Home() {
  return (
    <div id='main-container' className='h-screen w-full flex bg-slate-100'>
      <div className='w-full flex flex-col md:flex-row'>
        <div className='w-full md:w-10/12'>
          <MainFeed />
        </div>
        <div className='w-full md:w-2/12 h-full flex flex-col'>
          <UserSearch />
        </div>
      </div>
    </div>
  );
}
