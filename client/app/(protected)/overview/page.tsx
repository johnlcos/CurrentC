'use client';
import { userInfo } from 'os';
import { MainFeed } from '@/components/main-feed';
import { useEffect, useState } from 'react';
import { UserSearch } from '@/components/user-search';

export default function Home() {
  return (
    <div className='bg-[#17191A] w-full flex flex-col'>
      <MainFeed />
    </div>
  );
}
