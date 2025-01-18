import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { ImagePlus, X } from "lucide-react";
import { toast } from "react-toastify";
import axiosInstance from "../lib/axios";
import ProfilePic from "../assets/images/picture1.png";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStrore";

const ChatHeader = ({ selectedUser, isOnline }) => (
  <div className="flex items-center gap-3 border-b p-4">
    <div className="relative h-10 w-10 rounded-full">
      <img
        src={selectedUser.profile || ProfilePic}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div
        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
          isOnline ? "bg-green-500" : "bg-gray-400"
        }`}
      />
    </div>
    <div>
      <h3 className="font-medium text-gray-900">{selectedUser.username}</h3>
      <p className="text-sm text-gray-500">
        {isOnline ? "Active now" : "Offline"}
      </p>
    </div>
  </div>
);

const Message = ({ message, isOwn, profilePic }) => (
  <div
    className={`flex items-end gap-2 ${
      isOwn ? "flex-row-reverse" : "flex-row"
    }`}
  >
    <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
      <img
        src={profilePic || ProfilePic}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
    <div
      className={`max-w-[50%] rounded-2xl px-4 py-2 ${
        isOwn ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {message.image && (
        <img
          src={message.image}
          alt="Uploaded"
          className="max-h-48 w-auto rounded-lg object-cover mb-2"
          loading="lazy"
        />
      )}
      <p className="text-sm break-words">{message.message}</p>
    </div>
  </div>
);

const ImagePreview = ({ src, onRemove }) => (
  <div className="mb-4 flex items-center gap-2">
    <div className="relative h-16 w-16">
      <img
        src={src}
        alt="Preview"
        className="h-full w-full rounded-lg object-cover"
      />
      <button
        onClick={onRemove}
        className="absolute -right-2 -top-2 rounded-full bg-white p-1 shadow-md hover:bg-gray-100"
      >
        <X className="h-4 w-4 text-gray-600" />
      </button>
    </div>
  </div>
);

const ChatContainer = () => {
  const {
    getMessages,
    messages,
    selectedUser,
    addMessage,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();
  const [imageSrc, setImageSrc] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  useEffect(() => {
    const initialize = async () => {
      await getMessages(selectedUser._id);
      subscribeToMessages();
      scrollToBottom();
    };
    initialize();
    return unsubscribeFromMessages;
  }, [selectedUser._id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target.result);
    reader.onerror = () => toast.error("Failed to load image");
    reader.readAsDataURL(file);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const message = e.target.message.value.trim();
    if (!message && !imageSrc) return;

    setIsSending(true);
    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        { message, image: imageSrc }
      );
      e.target.reset();
      setImageSrc(null);
      addMessage(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white shadow-sm w-full">
      <ChatHeader
        selectedUser={selectedUser}
        isOnline={onlineUsers.includes(selectedUser._id)}
      />

      <div className="flex flex-1 flex-col space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <Message
            key={message._id}
            message={message}
            isOwn={message.senderId !== selectedUser._id}
            profilePic={
              message.senderId === selectedUser._id
                ? selectedUser.profilePic
                : authUser.profilePic
            }
          />
        ))}
        {isSending && (
          <div className="flex flex-row-reverse items-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />
            <p className="text-sm text-gray-500">Sending...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t bg-white p-4">
        {imageSrc && !isSending && (
          <ImagePreview src={imageSrc} onRemove={() => setImageSrc(null)} />
        )}
        <form className="flex items-center gap-2" onSubmit={sendMessage}>
          <input
            name="message"
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label className="cursor-pointer rounded-lg p-2 hover:bg-gray-100 transition-colors">
            <input
              type="file"
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