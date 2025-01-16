import React from 'react'
import {ChatSidebar,ChatContainer,NoChatContainer} from './'
import { useChatStore } from '../store/useChatStore';

const HomePage = () => {
    const {selectedUser } = useChatStore();
  
  return (
    <main className='w-full h-[90vh] flex items-center justify-center bg-slate-100'>
      <section className='container flex h-[80vh] shadow w-full border'>
        <ChatSidebar />
        {selectedUser? <ChatContainer /> : <NoChatContainer />}
      </section>
    </main>
  )
}

export default HomePage