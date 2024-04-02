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
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit = async (data: z.infer<typeof ChangePasswordSchema>) => {
    console.log(data);
    reset();
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
          />
          {errors.currentPassword && (
            <div>{errors.currentPassword.message}</div>
          )}
          <input
            {...register('newPassword')}
            type='password'
            placeholder='New password'
          />
          {errors.newPassword && <div>{errors.newPassword.message}</div>}
          <input
            {...register('confirmNewPassword')}
            type='password'
            placeholder='Re-type new password'
          />
          {errors.confirmNewPassword && (
            <div>{errors.confirmNewPassword.message}</div>
          )}
          <button disabled={isSubmitting} type='submit'>
            Change password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordSettingPage;
