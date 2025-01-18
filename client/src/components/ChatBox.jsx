import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStrore";
import ProfilePic from "../assets/images/picture1.png";
import { useChatStore } from "../store/useChatStore";

const ChatBox = ({ user }) => {
  const { setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
  }, [selectedUser]);

  const isSelected = selectedUser?.username === user.username;
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div 
      className={` h-full w-24 md:w-full flex-shrink-0
        relative flex items-center md:gap-4 p-4 cursor-pointer
        transition-all duration-100 ease-in
        hover:bg-gray-50 group
        ${isSelected ? 'bg-blue-50 hover:bg-blue-50' : ''}
        md:before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1
        before:transition-colors before:duration-200 
        ${isSelected ? 'before:bg-blue-500' : 'before:bg-transparent'}
        hover:before:bg-gray-200
      `}
      onClick={() => {
        setSelectedUser(user);
      }}
    >
      {/* User Avatar with Online Indicator */}
      <div className="relative flex-shrink-0">
        <img 
          src={user.profilePic || ProfilePic} 
          alt={user.username} 
          className="h-12 w-12 rounded-full object-cover border-2 border-gray-100 pointer-events-none"
        />
        <div className={`
          absolute bottom-0 right-0 h-3.5 w-3.5 
          rounded-full border-2 border-white
          ${isOnline ? 'bg-green-500' : 'bg-gray-300'}
        `} />
      </div>

      {/* User Info */}
      <div className="hidden flex-1 min-w-0 md:block">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 truncate pointer-events-none">
            {user.username}
          </h3>
          <span className={`
            text-xs px-2 py-0.5 rounded-full
            ${isOnline 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-600'
            }
          `}>
            {isOnline ? 'online' : 'offline'}
          </span>
        </div>
        <p className="text-sm text-gray-500 truncate mt-0.5">
          @{user.username.toLowerCase()}
        </p>
      </div>
    </div>
  );
};

export default ChatBox;