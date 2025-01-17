import React from 'react';
import { ChatSidebar, ChatContainer, NoChatContainer } from './';
import { useChatStore } from '../store/useChatStore';

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <main className="w-full h-screen flex py-9 justify-center bg-slate-100">
      <section className="container flex flex-col md:flex-row h-[85vh] shadow-lg w-full bg-white rounded">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4 h-full">
          <ChatSidebar />
        </div>

        {/* Chat Area */}
        <div className="flex-1 h-full rounded">
          {selectedUser ? (
            <ChatContainer />
          ) : (
            <NoChatContainer />
          )}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
