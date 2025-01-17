import React from 'react';
import { MessageSquare, Users, Smile, MessageCircle } from 'lucide-react';

const NoChatContainer = () => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center border border-gray-200 bg-white p-8 rounded-lg'>
      <div className='flex flex-col items-center justify-center max-w-md text-center space-y-6'>
        {/* Logo/Icon Section */}
        <div className='relative'>
          <div className='h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center'>
            <MessageCircle size={40} className='text-blue-600' />
          </div>
          <div className='absolute -right-2 -top-2 h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center'>
            <Smile size={20} className='text-white' />
          </div>
        </div>

        {/* Welcome Text */}
        <div className='space-y-2'>
          <h1 className='text-2xl font-bold text-gray-900'>Welcome to VChat</h1>
          <p className='text-gray-600 text-sm'>Connect, chat, and collaborate with your friends and colleagues in real-time</p>
        </div>

        {/* Feature Cards */}
        <div className='grid grid-cols-2 gap-4 w-full mt-8'>
          <div className='p-4 bg-gray-50 rounded-lg border border-gray-100 flex flex-col items-center gap-2'>
            <div className='h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center'>
              <MessageSquare size={20} className='text-blue-600' />
            </div>
            <p className='text-sm font-medium text-gray-800'>Real-time Chat</p>
            <p className='text-xs text-gray-600 text-center'>Instant messaging with fast delivery</p>
          </div>
          <div className='p-4 bg-gray-50 rounded-lg border border-gray-100 flex flex-col items-center gap-2'>
            <div className='h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center'>
              <Users size={20} className='text-blue-600' />
            </div>
            <p className='text-sm font-medium text-gray-800'>Group Chats</p>
            <p className='text-xs text-gray-600 text-center'>Connect with multiple users at once</p>
            <p className='text-xs text-gray-500 text-center'>available soon</p>
          </div>
        </div>

        {/* Start Instructions */}
        <div className='mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100 w-full'>
          <p className='text-sm text-blue-800'>
            👈 Select a user from the sidebar to start chatting
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChatContainer;