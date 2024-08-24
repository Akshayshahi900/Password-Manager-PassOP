import React from 'react'

const Navbar = () => {
  return (
   <nav className='bg-gray-200 p-4 gap-4 flex justify-between  h-20 text-black px-2	'>
    <div className="logo flex items-center">
        <span className='text-blue-400 text-3xl font-bold'>Pass</span>
    <span className='text-orange-400 text-3xl font-bold'>Op</span></div>
    <ul className='flex items-center'>
        <li className='flex gap-4 px-2  text-xl '>
            <a className='hover:font-bold cursor-pointer'  href="/">Home</a>
            <a className='hover:font-bold cursor-pointer' href="/">About</a>
            <a className='hover:font-bold cursor-pointer' href="/">Contact us</a>
            
        </li>
    </ul>

   </nav>
  )
}

export default Navbar
