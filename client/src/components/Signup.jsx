import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../lib/zodSchema";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useAuthStore } from "../store/useAuthStrore";

const Signup = () => {
  const { setLoginState, setAuthUser } = useAuthStore();
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
      toast.success(response.data.message);
      if (response.data.status === "success") {
        setLoginState(true);
        setAuthUser(response.data.data);
      }
    } catch (error) {
      console.log(error);
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }else{
        toast.error("Something went wrong");
      }
    }
  };

  return ( 
    <div className="w-full h-[90vh] flex items-center justify-center">
      <div className="bg-white shadow border">
        <div className="w-[350px] py-3 border-b border-zinc-700">
          <h1 className="text-left px-5 pt-5 text-blue-600 font-semibold text-lg">
            SignUp
          </h1>
        </div>
        <div>
          <form
            className="w-[350px] h-full p-4"
            onSubmit={handleSubmit(handleSignup)}
          >
            <div className="w-full flex-col gap-2 py-2 flex">
              <label htmlFor="username" className="text-zinc-800 font-semibold">
                username
              </label>
              <input
                type="text"
                id="username"
                className="p-2 border-2 border-blue-400 focus:ring-0 focus:border-2 focus:border-blue-600 outline-none"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
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

export default Signup;
