'use client';

import { useState } from 'react';
import { RegisterSchema } from '@/schemas/index';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormWrapperProps {
  formType: string;
}

export const FormWrapper = ({ formType }: FormWrapperProps) => {
  const [type, setType] = useState<string>(formType);
  const router = useRouter();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = RegisterSchema.parse(data);
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(res),
      });

      const returnedData = await response.json();
      if (returnedData) {
        router.push(returnedData.redirectUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col justify-center items-center space-y-4'>
          {type === 'register' && (
            <>
              <label
                htmlFor='email'
                className='flex flex-col justify-center items-start w-full'
              >
                Email:
                <input
                  placeholder='email'
                  type='email'
                  name='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5'
                ></input>
              </label>
              <label
                htmlFor='username'
                className='flex flex-col justify-center items-start w-full'
              >
                Username:
                <input
                  placeholder='username'
                  type='text'
                  name='username'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5'
                ></input>
              </label>
            </>
          )}
          {type === 'login' && (
            <>
              <label
                htmlFor='user'
                className='flex flex-col justify-center items-start w-full'
              >
                Username or Email:
                <input
                  placeholder='Username or Email'
                  type='text'
                  name='user'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5'
                ></input>
              </label>
            </>
          )}
          <label
            htmlFor='password'
            className='flex flex-col justify-center items-start w-full'
          >
            Password:
            <input
              placeholder='password'
              type='password'
              name='password'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5'
            ></input>
          </label>
          <button type='submit'>{type}</button>
        </div>
      </form>
      {type === 'register' && (
        <div className='flex justify-center my-5'>
          <Link href='/login'>Do you have an account already?</Link>
        </div>
      )}
      {type === 'login' && (
        <div className='flex justify-center my-5'>
          <Link href='/signup'>Do not have an account already?</Link>
        </div>
      )}
    </div>
  );
};
