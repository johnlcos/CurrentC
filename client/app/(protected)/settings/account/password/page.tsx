'use client';
import { useForm } from 'react-hook-form';
import { SettingsHeading } from '@/components/setting-heading';
import { ChangePasswordSchema } from '@/schemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ServerError, Success } from '@/types';
import { useState } from 'react';

const PasswordSettingPage = () => {
  const [error, setError] = useState<ServerError | null>(null);
  const [success, setSuccess] = useState<Success | null>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
  } = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit = async (data: z.infer<typeof ChangePasswordSchema>) => {
    setError(null);
    const validatedFields = ChangePasswordSchema.safeParse(data);

    if (!validatedFields.success) return;
    const response = await fetch('http://localhost:8080/settings/password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });
    const result = await response.json();
    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.success) {
    }
  };
  console.log(error);
  return (
    <div className='p-5'>
      <SettingsHeading heading={'Change your password'} />
      <div className='mt-5'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-y-5 w-2/4'
        >
          <div>
            <input
              {...register('currentPassword')}
              type='password'
              placeholder='Current password'
              className='text-black px-1 w-full'
            />
            {error?.errorType === 'Incorrect' && (
              <div className='text-red-600 text-sm'>{error.message}</div>
            )}
          </div>
          <input
            {...register('newPassword')}
            type='password'
            placeholder='New password'
            className='text-black px-1'
          />

          <div>
            <input
              {...register('confirmNewPassword')}
              type='password'
              placeholder='Re-type new password'
              className={`text-black px-1 w-full ${
                error?.errorType === 'Confirmation'
                  ? 'border-2 border-red-600'
                  : ''
              }`}
            />
            {error?.errorType === 'Confirmation' && (
              <div className='text-red-600 text-sm'>{error.message}</div>
            )}
          </div>
          <button
            disabled={!isDirty || !isValid}
            type='submit'
            className='submit-button-with-disable'
          >
            Change password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordSettingPage;

// <div className='flex justify-end text-[#E4E6EB]'>
//   <button
//     onClick={handleClick}
//     disabled={!value}
//     className='bg-[#D7DBDC] rounded-xl px-3 py-0.5 my-2
//               text-[#0F1419] hover:bg-[#aeb1b2]
//               disabled:text-[#88898A] disabled:hover:bg-[#D7DBDC]'
//   >
//     Post
//   </button>
// </div>;
