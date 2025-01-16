import React, { useEffect } from "react";
import ProfilePic from "../assets/images/picture1.png";
import { useAuthStore } from "../store/useAuthStrore";
import ChatBox from "./ChatBox";
import { useChatStore } from "../store/useChatStore";

const ChatSidebar = () => {
  const { authUser } = useAuthStore();
  const { users, isUsersLoading, getUsers, selectedUser } = useChatStore();
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <aside className="w-1/6 h-full bg-white border-r">
      <div className="w-full h-[5rem] bg-white border-b-2 flex items-center justify-start gap-3 py-2 px-5">
        <img
          src={ProfilePic}
          className="w-14 h-14 object-contain border-2 rounded-full border-blue-500"
        />
        <div>
          {authUser && (
            <h1 className="text-lg font-semibold text-blue-500">
              {authUser.username}
            </h1>
          )}
        </div>
      </div>
      <div className="w-full overflow-y-auto h-[calc(100%-5rem)]">
        {isUsersLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            Loading...
          </div>
        ) : (
          users.map((user) => <ChatBox key={user._id} user={user} />)
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;
