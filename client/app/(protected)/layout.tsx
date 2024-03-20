'use client';
import { SideNavBar } from '../side-navbar';
import { useEffect, useState, createContext } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from '@supabase/gotrue-js/src/lib/types';

export const SessionContext = createContext<Session | null>(null);

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userSession, setUserSession] = useState<Session | null>(null);

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
      {!isLoading && (
        <div className='flex'>
          <div className='w-2/12 p-0'>
            <SideNavBar />
          </div>
          <div className='w-10/12'>{children}</div>
        </div>
      )}
    </SessionContext.Provider>
  );
}
