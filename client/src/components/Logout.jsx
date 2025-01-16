import React, { useEffect } from 'react'

const Logout = () => {

  useEffect(() => {
    localStorage.removeItem('token')
  }, [])
  return (
    <div className='h-screen w-full flex items-center justify-center'>Logout</div>
  )
}

export default Logout