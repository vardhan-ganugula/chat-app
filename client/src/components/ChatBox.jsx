import React from "react";
import { useAuthStore } from "../store/useAuthStrore";
import ProfilePic from "../assets/images/picture1.png";
import { useChatStore } from "../store/useChatStore";

const ChatBox = ({ user }) => {
  const { setSelectedUser, selectedUser } = useChatStore();
  return (
    <div className={`flex items-center gap-3 p-3 justify-start bg-white border-b-2 cursor-pointer ${selectedUser?.username === user.username ? 'bg-blue-100' : ''}`} 
    
      onClick={() => {setSelectedUser(user); console.log('clicking')}}
    >
      <img src={user.profilePic || ProfilePic} alt={user.username} className="h-12 w-12 rounded-full pointer-events-none" />
      <div>
        <h1 className="text-lg font-semibold text-blue-800 pointer-events-none">{user.username}</h1>
      </div>
    </div>
  );
};

export default ChatBox;
