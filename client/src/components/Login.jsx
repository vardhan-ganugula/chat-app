import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../lib/zodSchema";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAuthStore } from "../store/useAuthStrore";


const Login = () => {
  const {login } = useAuthStore();

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <div className="bg-white shadow border">
        <div className="w-[350px] py-3 border-b border-zinc-700">
          <h1 className="text-left px-5 pt-5 text-blue-600 font-semibold text-lg">
            Login
          </h1>
        </div>
        <div>
          <form
            className="w-[350px] h-full p-4"
            onSubmit={handleSubmit((data) => login(data))}
          >
            <div className="w-full flex-col gap-2 py-2 flex">
              <label htmlFor="email" className="text-black font-semibold">
                email
              </label>
              <input
                type="email"
                id="email"
                className="p-2 border-2 border-blue-400 focus:ring-0 focus:border-2 focus:border-blue-600 outline-none"
                {...register("email", { required: "email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="w-full flex-col gap-2 py-2 flex">
              <label htmlFor="password" className="text-black font-semibold">
                password
              </label>
              <input
                type="password"
                id="password"
                className="p-2 border-2 border-blue-400 focus:ring-0 focus:border-2 focus:border-blue-600 outline-none"
                {...register("password", { required: "password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="w-full flex-col gap-2 py-2 flex">
              <button className="w-full py-2 mt-3 justify-center bg-blue-500 text-white flex gap-3 items-center">
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

export default Login;
