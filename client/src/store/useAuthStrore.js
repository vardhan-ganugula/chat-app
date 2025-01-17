import { create } from "zustand";
import AxiosInstance from "../lib/axios";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === 'development' ? "http://localhost:3000/" : "/";
export const useAuthStore = create((set, get) => ({
  onlineUsers: [],
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isLoggedIn: false,
  socket: null,

  checkAuth: async () => {
    try {
      const response = await AxiosInstance.get("/auth/check");
      set({ authUser: response.data, isLoggedIn: true });
      get().connectSocket();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  setAuthUser: (user) => set({ authUser: user }),
  setLoginState: (state) => set({ isLoggedIn: state }),
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await AxiosInstance.put("/auth/update-profile", data);

      set({ authUser: response.data.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  login: async (data) => {
    try {
      const response = await AxiosInstance.post("/auth/login", data);
      console.log(response.data);
      toast.success(response.data.message);
      if (response.data.status === "success") {
        set({ authUser: response.data.data, isLoggedIn: true });
        get().connectSocket();
      }
    } catch (error) {
      // console.log(error.message);
      if (isAxiosError(error)) {
        if (error.response.data) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error(error.message);
      }
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });
    socket.on("getOnlineUsers", (ids) => {
      set({ onlineUsers: ids });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
      set({ socket: null });
    }
  },
  signup: async (data) => {
    try {
      const response = await AxiosInstance.post("/auth/signup", data);
      toast.success(response.data.message);
      if (response.data.status === "success") {
        set({ authUser: response.data.data, isLoggedIn: true });
        get().connectSocket();
      }
    } catch (error) {
      // console.log(error);
      if (isAxiosError(error) && error.response) {
        console.log(error.response.data);
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  },
}));
