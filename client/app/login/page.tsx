import { FormWrapper } from '@/components/form-wrapper';

const LoginPage = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='bg-green-400 rounded-lg p-5 shadow-md flex flex-col gap-4'>
        <h1 className='text-center '>Alerty</h1>
        <FormWrapper formType='login' />
      </div>
    </div>
  );
};
export default LoginPage;
