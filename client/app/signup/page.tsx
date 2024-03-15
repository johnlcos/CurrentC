import { FormWrapper } from "@/components/form-wrapper";
const SignupPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-green-500 rounded-lg p-8 shadow-md flex flex-col gap-4">
        <h1 className="text-center ">Alerty</h1>
        <FormWrapper formType="register" />
      </div>
    </div>
  );
};

export default SignupPage;
