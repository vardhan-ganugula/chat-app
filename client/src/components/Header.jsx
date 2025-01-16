import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { BsChatQuote } from "react-icons/bs";

const Header = () => {
  return (
    <header className='bg-black p-5 flex items-center justify-around'>
        <div className='flex items-center gap-3'>
            <BsChatQuote className='text-white text-2xl' />
            <Link to='/' className='text-white text-2xl font-bold'>VChat</Link>
        </div>

        <div className='flex items-center gap-3'>
            <NavLink to='/login' className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-white ') + ' font-semibold'}>Login</NavLink>
            <NavLink to='/signup' className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-white ') + ' font-semibold'}>Signup</NavLink>
            <NavLink to='/logout' className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-white ') + ' font-semibold'}>Logout</NavLink>
        </div>
    </header>
  )
}

export default Header