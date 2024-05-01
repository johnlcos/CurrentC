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

    // compile data from the form into an object
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      // validate the data matches what is expected using zod
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center space-y-4">
          <label
            htmlFor="email"
            className="flex flex-col justify-center items-start w-full text-subtext-color text-sm font-bold mb-2"
          >
            Email
            <input
              placeholder="Email"
              type="email"
              name="email"
              className="input"
            ></input>
          </label>
          {formType === "register" && (
            <label
              htmlFor="username"
              className="flex flex-col justify-center items-start w-full text-subtext-color text-sm font-bold mb-2"
            >
              Username
              <input
                placeholder="Username"
                type="text"
                name="username"
                className="input"
              ></input>
            </label>
          )}
          <label
            htmlFor="password"
            className="flex flex-col justify-center items-start w-full text-subtext-color text-sm font-bold mb-2"
          >
            Password
            <input
              placeholder="Password"
              type="password"
              name="password"
              className="input"
            ></input>
          </label>
          <button type="submit" className="auth-button">
            {formType === "register" ? "Sign Up" : "Log In"}
          </button>
        </div>
      </form>
      {formType === "register" && (
        <div className="flex justify-center my-5">
          <Link href="/login" className="auth-button">
            Do you have an account already?
          </Link>
        </div>
      )}
      {formType === "login" && (
        <div className="flex justify-center my-5">
          <Link href="/signup" className="auth-button">
            Do not have an account already?
          </Link>
        </div>
      )}
    </div>
  );
};
