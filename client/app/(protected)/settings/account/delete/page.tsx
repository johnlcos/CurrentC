'use client';

import { useContext, useState, useRef, useEffect } from 'react';
import { SessionContext } from '@/app/(protected)/layout';
import { useRouter } from 'next/navigation';

const AccountDeletionPage = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { userSession } = useContext(SessionContext);

  let modalRef = useRef<HTMLDivElement>(null);

  const handleAccountDeletion = async () => {
    const response = await fetch('http://localhost:8080/settings/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userSession?.user.id }),
    });
    const result = await response.json();
    if (result.success) {
      router.push('http://localhost:3000/');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  console.log(modalRef);

  return (
    <>
      <div className='text-text-white ml-5 p-5'>
        <span className='text-xl'>Delete Account</span>
        <p className='text-lg my-5'>This will delete you account permanently</p>
        <p className='text-subtext-color text-sm my-5'>
          You are about to start the process of deleting you Alerty account. All
          of your information will be deleted permanently and cannot be
          recovered.
        </p>
        <button
          className='bg-red-600 text-black px-10 rounded-2xl hover:bg-red-500'
          onClick={() => setShowModal(true)}
        >
          Delete
        </button>
      </div>
      <div>
        {showModal && (
          <div
            className='fixed left-0 top-0 bg-black bg-opacity-50 
          w-screen h-screen flex justify-center items-center z-10'
          >
            <div
              className='bg-[#3E4042] rounded shadow-md p-2 w-[50%] 
              h-max flex flex-col justify-center items-center gap-y-5'
              ref={modalRef}
            >
              <p className='text-lg'>Are you sure?</p>
              <button
                className='bg-red-600 text-black px-10 rounded-2xl hover:bg-red-500 shadow-md'
                onClick={handleAccountDeletion}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AccountDeletionPage;
