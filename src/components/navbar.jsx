import React from 'react'
import ChecklistIcon from './logo'

export default function Navbar() {
  return (
  <header>
<nav  className='h-17 w-full bg-rose-600 shadow-sm py-4 px-8 sticky  z-50 flex items-center justify-between'>
    <div className="brand text-neutral-200 flex items-center font-bold font-mono text-2xl">
       <ChecklistIcon width={40}
    height={40} /> TaskWriter</div>
    <div className="">
        <ul className='hidden md:flex gap-15 text-rose-300 font-[500]'>
            <li className="cursor-pointer hover:font-bold transition-all duration-200 hover:text-rose-50">Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-200 hover:text-rose-50 p-1'>YourTasks</li>
        </ul>
    </div>
</nav>
  </header>
  )
}
