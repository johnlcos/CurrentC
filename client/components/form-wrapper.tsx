"use client";

import { LoginSchema, RegisterSchema } from "@/schemas/index";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormWrapperProps {
  formType: string;
}

export const FormWrapper = ({ formType }: FormWrapperProps) => {
  const router = useRouter();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const validatedForm =
        formType === "register"
          ? RegisterSchema.parse(data)
          : LoginSchema.parse(data);
      const fetchURL =
        formType === "register"
          ? "http://localhost:8080/auth/signup"
          : "http://localhost:8080/auth/signin";
      const response = await fetch(fetchURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedForm),
      });

      const returnedData = await response.json();
      if (returnedData) {
        router.push(returnedData.redirectUrl);
      }

      const sessionRes = await fetch("http://localhost:8080/auth/getSession");
      const session = await sessionRes.json();
      console.log(session);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center space-y-4">
          {formType === "register" && (
            <>
              <label
                htmlFor="email"
                className="flex flex-col justify-center items-start w-full"
              >
                Email:
                <input
                  placeholder="email"
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                ></input>
              </label>
              <label
                htmlFor="username"
                className="flex flex-col justify-center items-start w-full"
              >
                Username:
                <input
                  placeholder="username"
                  type="text"
                  name="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                ></input>
              </label>
            </>
          )}
          {formType === "login" && (
            <>
              <label
                htmlFor="email"
                className="flex flex-col justify-center items-start w-full"
              >
                Email:
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                ></input>
              </label>
            </>
          )}
          <label
            htmlFor="password"
            className="flex flex-col justify-center items-start w-full"
          >
            Password:
            <input
              placeholder="password"
              type="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
            ></input>
          </label>
          <button
            type="submit"
            className="w-full text-center bg-green-700 p-3 rounded-lg text-gray-50 font-semibold shadow-md hover:bg-green-600 transition duration-300 flex items-center justify-center gap-2"
          >
            {formType === "register" ? "Sign Up" : "Log In"}
          </button>
        </div>
      </form>
      {formType === "register" && (
        <div className="flex justify-center my-5">
          <Link
            href="/login"
            className="w-full text-center bg-green-700 p-3 rounded-lg text-gray-50 font-semibold shadow-md hover:bg-green-600 transition duration-300 flex items-center justify-center gap-2"
          >
            Do you have an account already?
          </Link>
        </div>
      )}
      {formType === "login" && (
        <div className="flex justify-center my-5">
          <Link
            href="/signup"
            className="w-full text-center bg-green-700 p-3 rounded-lg text-gray-50 font-semibold shadow-md hover:bg-green-600 transition duration-300 flex items-center justify-center gap-2"
          >
            Do not have an account already?
          </Link>
        </div>
      )}
    </div>
  );
};
