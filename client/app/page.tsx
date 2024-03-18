import Image from 'next/image';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';

export default function Home() {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-slate-100'>
      <div className='flex flex-col items-center md:flex-row bg-white p-8 py-4 rounded-lg shadow-2xl'>
        <Image src='/alerty.png' width={300} height={300} alt='Alerty Logo' />
        <div className='flex flex-col gap-2 p-3'>
          <h2 className='text-center text-xl text-green-900 font-semibold'>
            Join Alerty!
          </h2>
          <p>Stay up to date with the latest financial news!</p>
          <ul className='flex flex-col gap-2'>
            <li>
              <Link
                href='/'
                className='w-full text-center bg-green-700 p-3 rounded-lg text-gray-50 font-semibold shadow-md hover:bg-green-600 transition duration-300 flex items-center justify-center gap-2'
              >
                <FaGoogle /> Sign up with Google
              </Link>
            </li>
            <li>
              <Link
                href='/signup'
                className='block w-full text-center bg-green-700 p-3 rounded-lg text-gray-50 font-semibold shadow-md hover:bg-green-600 transition duration-300'
              >
                Create Account
              </Link>
            </li>
            <li>
              <p className='text-center'>Already have an account?</p>
            </li>
            <li>
              <Link
                href='/login'
                className='block w-full text-center bg-green-700 p-3 rounded-lg text-gray-50 font-semibold shadow-md hover:bg-green-600 transition duration-300'
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
