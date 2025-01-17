import React, { useCallback, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStrore";
import ChatBox from "./ChatBox";
import { useChatStore } from "../store/useChatStore";
import { IoIosContacts } from "react-icons/io";
import debounce from "lodash.debounce";


const ChatSidebar = () => {
  const { authUser } = useAuthStore();
  const { users, isUsersLoading, getUsers } = useChatStore();

  useEffect(() => {
    getUsers();
  }, []);

  const handleSearch = useCallback(debounce((value)=> {
    console.log(value.target.value);
  }, 500) , []);

  return (
    <aside className="flex h-full flex-col border-r border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex h-20 items-center border-b border-gray-200 px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
            <IoIosContacts className="text-2xl text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="hidden text-lg font-semibold text-gray-900 lg:block">
              Contacts
            </span>
            <span className="hidden text-sm text-gray-500 lg:block">
              {users?.length || 0} available
            </span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="border-b border-gray-200 p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm 
                     placeholder-gray-500 outline-none transition-colors focus:border-blue-500 
                     focus:bg-white focus:ring-1 focus:ring-blue-500"

            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {isUsersLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
              <p className="text-sm text-gray-600">Loading contacts...</p>
            </div>
          </div>
        ) : users && users.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {users.map((user) => (
              <ChatBox key={user._id} user={user} />
            ))}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center p-4">
            <p className="text-center text-sm text-gray-500">
              No contacts available
            </p>
          </div>
        )}
      </div>

      {/* User Profile Preview */}
      {authUser && (
        <div className="mt-auto border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-200">
              {/* User avatar could go here */}
              <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-100 text-blue-600">
                {authUser.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="hidden flex-1 lg:block">
              <p className="font-medium text-gray-900">{authUser.name}</p>
              <p className="text-sm text-gray-500">{authUser.email}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default ChatSidebar;