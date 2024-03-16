import { FormWrapper } from "@/components/form-wrapper";

const LoginPage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-slate-100">
      <div className="rounded-lg p-8 shadow-2xl flex flex-col gap-4 bg-white">
        <h1 className="text-center ">Alerty</h1>
        <FormWrapper formType="login" />
      </div>
    </div>
  );
};
export default LoginPage;
