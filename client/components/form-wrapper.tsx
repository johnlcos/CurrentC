"use client";

import { useState } from "react";
import * as z from "zod";
import { RegisterSchema } from "@/schemas/index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const FormWrapper = () => {
  const [isRegisterForm, setIsRegisterForm] = useState<boolean>(false);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = RegisterSchema.parse(data);
      console.log(res);
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(res),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center space-y-4">
          {isRegisterForm && (
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
          )}
          {isRegisterForm && (
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
          )}
          {!isRegisterForm && (
            <label
              htmlFor="user"
              className="flex flex-col justify-center items-start w-full"
            >
              Username or Email:
              <input
                placeholder="Username or Email"
                type="text"
                name="user"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              ></input>
            </label>
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
          <button type="submit">{isRegisterForm ? "Signup" : "Login"}</button>
        </div>
      </form>
      {!isRegisterForm && (
        <div className="flex justify-center my-5">
          <button onClick={() => setIsRegisterForm(true)}>
            Do not have an account?
          </button>
        </div>
      )}
      {isRegisterForm && (
        <div className="flex justify-center my-5">
          <button onClick={() => setIsRegisterForm(false)}>
            Do you have an account already?
          </button>
        </div>
      )}
    </div>
  );
};
