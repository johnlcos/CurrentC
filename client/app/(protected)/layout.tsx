'use client';
import { SideNavBar } from '../side-navbar';
import { UserSearch } from '@/components/user-search';
import { useMemo, useState, createContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from '@supabase/gotrue-js/src/lib/types';
import { ReplyFeedModal } from '@/components/reply-feed-modal';
import { FeedSchema } from '@/types';
import fetchSpecificFeed from '@/hooks/fetchSpecficFeed';

interface OverviewContextSchema {
  showModal: boolean;
  setShowModal: (bool: boolean) => void;
  selectedFeedID: string;
  setSelectedFeedID: (id: string) => void;
}

export const SessionContext = createContext<Session | null>(null);
export const OverviewContext = createContext<OverviewContextSchema>({
  showModal: false,
  setShowModal: () => {},
  selectedFeedID: '',
  setSelectedFeedID: () => {},
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedFeedID, setSelectedFeedID] = useState<string>('');

  const router = useRouter();
  useEffect(() => {
    const getCurrentSession = async () => {
      const response = await fetch('http://localhost:8080/auth/session');
      const json = await response.json();
      const session: Session = json.data.session;
      if (!session) {
        router.push('http://localhost:3000/');
      } else {
        setUserSession(session);
        setIsLoading(false);
      }
    };

    getCurrentSession();
  }, [router]);

  // useEffect(() => {
  //   console.log('selectedFeedID', selectedFeedID);
  //   fetchSpecificFeed({ feedID: selectedFeedID }).then((data) => {
  //     console.log(data);
  //     setSelectedFeed(data);
  //   });
  // }, [selectedFeedID]);

  return (
    <SessionContext.Provider value={userSession}>
      <OverviewContext.Provider
        value={{
          showModal,
          setShowModal,
          selectedFeedID,
          setSelectedFeedID,
        }}
      >
        <div className='w-screen'>
          <ReplyFeedModal />
          {!isLoading && (
            <div className='flex w-screen'>
              <div className='w-4/12 p-0 fixed sm:w-1/4 max-w-[300px] h-screen'>
                <SideNavBar />
              </div>
              <div className='flex-1 ml-[300px]'>{children}</div>
              <div className='w-4/12 p-0 fixed sm:w-1/4 max-w-[300px] right-0 bg-green-700 h-screen'>
                <UserSearch />
              </div>
            </div>
          )}
        </div>
      </OverviewContext.Provider>
    </SessionContext.Provider>
  );
}
