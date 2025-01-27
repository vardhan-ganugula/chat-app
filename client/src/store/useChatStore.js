import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-toastify";
import { useAuthStore } from "./useAuthStrore";

export const useChatStore = create((set, get) => ({
  selectedUser: null,
  messages: [],
  users: [],
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/messages/users");
      set({ users: response.data.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while fetching users"
      );
    } finally {
      set({ isUsersLoading: false });
    }
  },
  allUserMessages: {},
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });

    try {
      const response = await axiosInstance.get(`/messages/chat/${userId}`);
      set({ messages: response.data.data });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while fetching messages"
      );
    } finally {
      set({ isMessagesLoading: false });
      const tempMessages = get().allUserMessages;
      delete tempMessages[userId];
      set({ allUserMessages: tempMessages });
    }
  },
  setSelectedUser: (user) => {
    set({ selectedUser: user });
    const tempMessages = get().allUserMessages;
    delete tempMessages[user._id];
    set({ allUserMessages: tempMessages });
  },
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (message) => {
      if (
        message.senderId === selectedUser._id ||
        message.receiverId === selectedUser._id
      ) {
        set({
          messages: [...get().messages, message],
        });
      }

      set({
        allUserMessages: {
          ...get().allUserMessages,
          [message.senderId]: message,
        },
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setUsers: (users) => set({ users }),
}));
