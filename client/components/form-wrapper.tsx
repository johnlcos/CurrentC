'use client';

import { useState } from 'react';
import * as z from 'zod';
import { RegisterSchema } from '@/schemas/index';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const FormWrapper = () => {
  const [isRegisterForm, setIsRegisterForm] = useState<boolean>(true);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = RegisterSchema.parse(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // const form = useForm<z.infer<typeof RegisterSchema>>({
  //   resolver: zodResolver(RegisterSchema),
  //   defaultValues: {
  //     email: '',
  //     password: '',
  //     username: '',
  //   },
  // });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col justify-center items-center space-y-4'>
          <label htmlFor='email'>
            Email:
            <input placeholder='email' type='email' name='email'></input>
          </label>
          <label htmlFor='username'>
            Username:
            <input placeholder='username' type='text' name='username'></input>
          </label>
          <label htmlFor='password'>
            Password:
            <input
              placeholder='password'
              type='password'
              name='password'
            ></input>
          </label>
          <button type='submit'>Login</button>
        </div>
      </form>
      {isRegisterForm && (
        <div>
          <button onClick={() => setIsRegisterForm(true)}>
            Do not have an account?
          </button>
        </div>
      )}
      {!isRegisterForm && (
        <div>
          <button onClick={() => setIsRegisterForm(false)}>
            Do you have an account already?
          </button>
        </div>
      )}
    </div>
  );
};
