import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore';
import { IoSend } from "react-icons/io5";
import { toast } from 'react-toastify';
import axiosInstance from '../lib/axios';
import ProfilePic from "../assets/images/picture1.png";

const ChatContainer = () => {
  const { getMessages, messages, selectedUser, addMessage } = useChatStore();
  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);
  const sendMessage = async (e) => {
    e.preventDefault();
    console.log('sending message');
    const message = e.target.message.value;
    if(message.trim() === '') return;

    try {
      const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, { message});
      e.target.message.value = '';
      addMessage(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred while sending message');
    }
  }

  return (
    <div className='border w-full h-full flex flex-col'>
      <div className='flex grow w-full p-2 relative flex-col gap-3'>
        {messages.map(message => (
          <div key={message._id}
          className={`flex gap-2 p-2 items-baseline h-7 ${message.senderId === selectedUser._id ? 'justify-start' : 'justify-end'}`}
           
           >
            <div className="w-8 h-8 rounded-full bg-blue-500 translate-y-2">
              <img src={selectedUser.profile || ProfilePic} alt="" className='w-full h-full object-cover rounded-full' />
            </div>
            <div>
              <p className='bg-blue-400 px-4 py-1 rounded-xl rounded-bl-none'>{message.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='px-4 py-2 flex-shrink w-full bg-blue-100'>
        <form className='w-full flex gap-2' onSubmit={sendMessage} >
          <textarea name="message" id="message" rows="1" className='w-full h-10 resize-none outline-none rounded border border-blue-200 p-2 '></textarea>
          <button className='bg-blue-500 text-white px-4 py-2 rounded flex gap-2 items-center' type='submit'>
            send <IoSend />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatContainer