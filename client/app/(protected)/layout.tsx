'use client';
import { SideNavBar } from '../side-navbar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  useEffect(() => {
    const getCurrentSession = async () => {
      const response = await fetch('http://localhost:8080/auth/session');
      const json = await response.json();
      const session = json.data.session;
      console.log(session);
      if (!session) {
        router.push('http://localhost:3000/');
      } else {
        setIsLoading(false);
      }
    };

    getCurrentSession();
  }, [router]);

  return (
    <>
      {!isLoading && (
        <div className='flex'>
          <div className='w-2/12 p-0'>
            <SideNavBar />
          </div>
          <div className='w-10/12'>{children}</div>
        </div>
      )}
    </>
  );
}
