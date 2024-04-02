import { FaArrowLeft } from 'react-icons/fa6';
import Link from 'next/link';

interface SettingHeadProps {
  heading: string;
}

export const SettingsHeading = ({ heading }: SettingHeadProps) => {
  return (
    <div className='mb-5'>
      <div className='text-xl text-text-white flex items-center gap-x-10'>
        <Link href='/settings/account'>
          <FaArrowLeft />
        </Link>
        <span>{heading}</span>
      </div>
    </div>
  );
};
