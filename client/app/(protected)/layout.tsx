'use client';
import { SideNavBar } from '../side-navbar';
import { useEffect, useState, createContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Session } from '@supabase/gotrue-js/src/lib/types';
import { ReplyFeedModal } from '@/components/reply-feed-modal';
import { RightSideWrapper } from '@/components/right-side-wrapper';

interface OverviewContextSchema {
  showModal: boolean;
  setShowModal: (bool: boolean) => void;
  selectedFeedID: string;
  setSelectedFeedID: (id: string) => void;
}

interface SessionContextSchema {
  userSession: Session | null;
  setUserSession: (sess: Session) => void;
}

export const SessionContext = createContext<SessionContextSchema>({
  userSession: null,
  setUserSession: () => {},
});
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
  const pathname = usePathname();

  console.log(pathname);

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
  return (
    <SessionContext.Provider value={{ userSession, setUserSession }}>
      <OverviewContext.Provider
        value={{
          showModal,
          setShowModal,
          selectedFeedID,
          setSelectedFeedID,
        }}
      >
        <div className='w-screen h-full bg-[#17191A]'>
          <div className='z-10 relative'>
            <ReplyFeedModal />
          </div>
          {!isLoading && (
            <div className='flex w-full h-full'>
              <div className='w-1/6 p-0 fixed h-screen'>
                <SideNavBar />
              </div>
              {children}
            </div>
          )}

          {/* {!isLoading && pathname === '/settings/account' && (
            <div className='flex w-full h-full'>
              <div className='w-1/6 p-0 fixed h-screen'>
                <SideNavBar />
              </div>
              <div className='w-full flex'>
                <div className='w-1/6 h-screen'></div>
                <div className='w-5/6 md:w-2/6 flex justify-center h-full '>
                  {children}
                </div>
                <div className='w-3/6 hidden md:block'></div>
              </div>

              <div className='w-3/6 p-0 fixed right-0 bg-[#17191A] h-screen hidden md:block z-1'>
                <RightSideWrapper />
              </div>
            </div>
          )} */}
        </div>
      </OverviewContext.Provider>
    </SessionContext.Provider>
  );
}
