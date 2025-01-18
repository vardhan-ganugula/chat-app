import React, { useEffect, useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";
import axiosInstance from "../lib/axios";
import ProfilePic from "../assets/images/picture1.png";
import { useAuthStore } from "../store/useAuthStrore";
import { ImagePlus, X } from "lucide-react";

const ChatContainer = () => {
  const {
    getMessages,
    messages,
    selectedUser,
    addMessage,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [imageSrc, setImageSrc] = useState(null);
  const messagesEndRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    scrollToBottom();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    unsubscribeFromMessages,
    subscribeToMessages,
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setImageSrc(fileReader.result);
    };

    fileReader.onerror = (error) => {
      console.error("Error reading file:", error);
      toast.error("Failed to load image");
    };

    fileReader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageSrc(null);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const message = e.target.message.value;

    if (message.trim() === "" && !imageSrc) return;
    setIsSending(true);
    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        { message, image: imageSrc }
      );
      e.target.message.value = "";
      setImageSrc(null);
      addMessage(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while sending message"
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white shadow-sm w-full">
      {/* Chat Header */}
      <div className="flex items-center gap-3 border-b p-4">
        <div className="relative h-10 w-10 rounded-full">
          <img
            src={selectedUser.profile || ProfilePic}
            alt=""
            className="h-full w-full object-cover"
          />
          <div
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
              onlineUsers.includes(selectedUser._id)
                ? "bg-green-500"
                : "bg-gray-400"
            }`}
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{selectedUser.username}</h3>
          <p className="text-sm text-gray-500">
            {onlineUsers.includes(selectedUser._id) ? "Active now" : "Offline"}
          </p>
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
              className={`max-w-[50%] rounded-2xl px-4 py-2 ${
                message.senderId === selectedUser._id
                  ? "bg-gray-100 text-gray-900"
                  : "bg-blue-600 text-white"
              }`}
            >
              {message.image && (
                <div className="mb-2">
                  <div className="h-48 w-full bg-slate-100 mb-2 rounded animate-pulse flex items-center justify-center gap-4 text-zinc-700">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />{" "}
                    loading...
                  </div>
                  <img
                    src={message.image}
                    alt="Uploaded"
                    className="max-h-48 w-auto rounded-lg object-cover defaultBackgroundImage"
                    onLoad={(e) => {
                      e.target.previousElementSibling.classList.add("hidden")
                    }}
                  />
                </div>
              )}
              <p className="text-sm break-words">{message.message}</p>
            </div>
          </div>
        ))}
        <div className="flex flex-row-reverse">
          {isSending && (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />
              <p className="text-sm text-gray-500">Sending...</p>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t bg-white p-4">
        {imageSrc && !isSending && (
          <div className="mb-4 flex items-center gap-2">
            <div className="relative h-16 w-16">
              <img
                src={imageSrc}
                alt="Preview"
                className="h-full w-full rounded-lg object-cover"
              />
              <button
                onClick={removeImage}
                className="absolute -right-2 -top-2 rounded-full bg-white p-1 shadow-md hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        )}
        <form className="flex items-center gap-2" onSubmit={sendMessage}>
          <input
            name="message"
            id="message"
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label
            htmlFor="image"
            className="cursor-pointer rounded-lg p-2 hover:bg-gray-100 transition-colors"
          >
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handleImagePreview}
            />
            <ImagePlus className="h-5 w-5 text-blue-600" />
          </label>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="hidden md:block">Send</span>
            <IoSend className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;
