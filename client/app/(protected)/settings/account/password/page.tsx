'use client';
import { useForm } from 'react-hook-form';
import { SettingsHeading } from '@/components/setting-heading';
import { ChangePasswordSchema } from '@/schemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const PasswordSettingPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
  } = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit = async (data: z.infer<typeof ChangePasswordSchema>) => {
    const validatedFields = ChangePasswordSchema.safeParse(data);
    if (!validatedFields.success) return;
    const response = await fetch('http://localhost:8080/settings/password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields),
    });
    console.log(response);
  };

  return (
    <div className='p-5'>
      <SettingsHeading heading={'Change your password'} />
      <div className='mt-5'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-y-5 w-2/4'
        >
          <input
            {...register('currentPassword')}
            type='password'
            placeholder='Current password'
            className='text-black px-1'
          />
          {/* {errors.currentPassword && (
            <div className='text-green'>{errors.currentPassword.message}</div>
          )} */}
          <input
            {...register('newPassword')}
            type='password'
            placeholder='New password'
            className='text-black px-1'
          />
          {/* {errors.newPassword && <div>{errors.newPassword.message}</div>} */}
          <input
            {...register('confirmNewPassword')}
            type='password'
            placeholder='Re-type new password'
            className='text-black px-1'
          />
          {/* {errors.confirmNewPassword && (
            <div>{errors.confirmNewPassword.message}</div>
          )} */}
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
