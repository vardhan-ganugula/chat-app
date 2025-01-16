import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../lib/zodSchema";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axiosInstance from "../lib/axios";
import {toast} from 'react-toastify'
const Signup = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const handleSignup = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      toast.success(response.data.message)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <div className="shadow border-none bg-zinc-950">
        <div className="w-[350px] py-3 border-b border-zinc-700">
          <h1 className="text-left px-5 pt-5 text-white font-semibold text-lg">
            SignUp
          </h1>
        </div>
        <div>
          <form
            className="w-[350px] h-full p-4"
            onSubmit={handleSubmit(handleSignup)}
          >
            <div className="w-full flex-col gap-2 py-2 flex">
              <label htmlFor="username" className="text-zinc-300">
                username
              </label>
              <input
                type="text"
                id="username"
                className="p-1 rounded border border-zinc-700 focus:border-zinc-600 bg-zinc-950 w-full h-10"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="w-full flex-col gap-2 py-2 flex">
              <label htmlFor="email" className="text-zinc-300">
                email
              </label>
              <input
                type="email"
                id="email"
                className="p-1 rounded border border-zinc-700 focus:border-zinc-600 bg-zinc-950 w-full h-10"
                {...register("email", { required: "email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="w-full flex-col gap-2 py-2 flex">
              <label htmlFor="password" className="text-zinc-300">
                password
              </label>
              <input
                type="password"
                id="password"
                className="p-1 rounded border border-zinc-700 focus:border-zinc-600 bg-zinc-950 w-full h-10"
                {...register("password", { required: "password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="w-full flex-col gap-2 py-2 flex">
            <button className="w-full py-1 mt-3 justify-center bg-white text-black rounded flex gap-3 items-center">
              {isSubmitting ? (
                <>
                  <span className="animate-spin text-lg">
                    <AiOutlineLoading3Quarters />
                  </span>
                  <span>Submitting...</span>
                </>
              ) : (
                "Submit"
              )}
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
