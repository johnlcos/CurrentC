'use client';
import { userInfo } from 'os';
import { MainFeed } from '@/components/main-feed';
import { useEffect, useState } from 'react';
import { UserSearch } from '@/components/user-search';

export default function Home() {
  return (
    <div id='main-container' className='h-full w-full flex'>
      <div className='w-full flex flex-col md:flex-row'>
        <div className='w-full md:w-10/12'>
          <MainFeed />
        </div>
      </div>
    </div>
  );
}
