import { FormWrapper } from "@/components/form-wrapper";
const SignupPage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-slate-100">
      <div className="rounded-lg p-8 shadow-md flex flex-col gap-4 bg-white">
        <h1 className="text-center ">Alerty</h1>
        <FormWrapper formType="register" />
      </div>
    </div>
  );
};

export default SignupPage;
