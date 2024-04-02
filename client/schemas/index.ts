import * as z from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  username: z.string().min(1, {
    message: 'Username is required',
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: 'Current password is required',
    }),
    newPassword: z.string().min(6, {
      message: 'New password is required',
    }),
    confirmNewPassword: z.string().min(6, {}),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'New Password and confirmation password does not match',
    path: ['confirmNewPassword'],
  });
