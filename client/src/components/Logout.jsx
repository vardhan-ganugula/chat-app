import React, { useEffect } from 'react'
import {toast} from 'react-toastify'
import axiosInstance from '../lib/axios'
import { useAuthStore } from '../store/useAuthStrore'


const Logout = () => {
  const {setLoginState, setAuthUser, disconnectSocket} = useAuthStore();

  useEffect(() => {
    axiosInstance.get('/auth/logout').then(res => {
      setLoginState(false)
      setAuthUser(null)
      disconnectSocket()
    }).catch(err => {
      console.log(err)
      toast.error('something went wrong')
    })
  }, [])
  return (
    <div className='h-screen w-full flex items-center justify-center'>You are Logged out</div>
  )
}

export default Logout