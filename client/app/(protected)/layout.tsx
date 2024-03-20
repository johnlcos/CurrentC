'use client';
import { SideNavBar } from '../side-navbar';
import { useEffect, useState, createContext } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from '@supabase/gotrue-js/src/lib/types';
import { ReplyFeedModal } from '@/components/reply-feed-modal';

interface OverviewContextSchema {
  showModal: boolean;
  setShowModal: (bool: boolean) => void;
}

export const SessionContext = createContext<Session | null>(null);
export const OverviewContext = createContext<OverviewContextSchema>({
  showModal: false,
  setShowModal: () => {},
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

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
  return (
    <SessionContext.Provider value={userSession}>
      <OverviewContext.Provider value={{ showModal, setShowModal }}>
        <>
          <ReplyFeedModal
            showModal={showModal}
            closeModal={() => setShowModal(false)}
          />
          {!isLoading && (
            <div className='flex'>
              <div className='w-2/12 p-0'>
                <SideNavBar />
              </div>
              <div className='w-10/12'>{children}</div>
            </div>
          )}
        </>
      </OverviewContext.Provider>
    </SessionContext.Provider>
  );
}
