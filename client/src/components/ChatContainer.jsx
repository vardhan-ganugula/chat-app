import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";
import axiosInstance from "../lib/axios";
import ProfilePic from "../assets/images/picture1.png";
import { useAuthStore } from "../store/useAuthStrore";

const ChatContainer = () => {
  const {
    getMessages,
    messages,
    selectedUser,
    addMessage,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const {onlineUsers} = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    unsubscribeFromMessages,
    subscribeToMessages,
  ]);

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("sending message");
    const message = e.target.message.value;
    if (message.trim() === "") return;

    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        { message }
      );
      e.target.message.value = "";
      addMessage(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while sending message"
      );
    }
  };

  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white shadow-sm w-full">
      {/* Chat Header */}
      <div className="flex items-center gap-3 border-b p-4">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <img
            src={selectedUser.profile || ProfilePic}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{selectedUser.username}</h3>
          {onlineUsers.includes(selectedUser._id) ? (<p className="text-sm text-gray-500">Active now</p>) : (<p className="text-sm text-gray-500">Offline</p>)}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex flex-1 flex-col space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex items-end gap-2 ${
              message.senderId === selectedUser._id
                ? "flex-row"
                : "flex-row-reverse"
            }`}
          >
            <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
              <img
                src={selectedUser.profile || ProfilePic}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2  ${
                message.senderId === selectedUser._id
                  ? "bg-gray-100 text-gray-900"
                  : "bg-blue-600 text-white"
              }`}
            >
              <p className="text-sm">{message.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t bg-white p-4">
        <form className="flex items-center gap-2" onSubmit={sendMessage}>
          <input
            name="message"
            id="message"
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span>Send</span>
            <IoSend className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;