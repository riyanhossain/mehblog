import { findAllByTestId } from '@testing-library/react'
import React, { useState } from 'react'
import profileImage from '../images/IMG_20190714_182536.jpg'

function Navbar() {
  const [user,setUser]=useState(false)
  return (
    <nav className='bg-[#AAD1A6]  w-screen flex flex-col items-center'>
      <div className='p-5 flex justify-between w-screen items-center xl:w-[1400px]'>
        <div className='ml-4 flex'>
          <p className='text-2xl font-semibold text-white'>MehBlog</p>

          <input className="ml-1 md:ml-6  border-2 border-gray-300 bg-white h-10 px-5 pr-0 md:pr-16 rounded-lg text-sm focus:outline-none" type="search" name="search" placeholder="Search"/>

        </div>
        <div className='mr-4'>
          {
            user ? <div className='flex justify-center'><a href="/" className='text-white hover:text-blue-800 p-2 hidden xl:inline-flex mt-1'>Home</a>
            <a href="/" className='text-white hover:text-blue-800 p-2 hidden xl:inline-flex mt-1'>MyPost</a>
            <button className='hidden mr-2 p-2 bg-yellow-500 rounded border-0 text-white text-center xl:inline-flex'><span className='mt-1'>Create Blog</span></button>
            <button className=''><img src={profileImage} alt="" className='w-12 h-12 border-2 rounded-full border-yellow-400 '/></button>
            
            </div>
            :<div className='flex items-center'>
              <button className='hidden p-2 bg-yellow-500 rounded border-0 pl-2 pr-2 mr-2 text-white xl:inline-flex'>Create Blog</button>
              <a href='/' className='font-bold'>Login</a>
            </div>
          }
        </div>
      </div>
      <div className='bg-white w-screen flex justify-center items-center border-y-2 border-gray-300'>
        <button><p className='font-bold p-2 xl:hidden'>Category</p></button>
        <a href="/" className='p-2 hidden xl:inline-flex'>Links</a>
        <a href="/" className='p-2 hidden xl:inline-flex'>Links</a>

        <a href="/" className='p-2 hidden xl:inline-flex'>Links</a>
        <a href="/" className='p-2 hidden xl:inline-flex'>Links</a>
        <a href="/" className='p-2 hidden xl:inline-flex'>Links</a>
        
      </div>
    </nav>
  )
}

export default Navbar