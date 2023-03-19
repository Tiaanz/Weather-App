import React from 'react'
import { BiLogIn } from 'react-icons/bi';

const NavBar = () => {
  return (
    <div>
      <nav className="flex items-center px-10 justify-between ">
        <div className='flex items-center'>
          <div className="w-14 h-14">
            <img src="assets/weather-icon.png" alt="weather-logo" />
          </div>
          <div className="text-xl mx-3">Weather App</div>
        </div>
        <div className="text-xl flex items-center hover:underline hover:cursor-pointer"><BiLogIn className='mx-3 text-2xl'/>Log in</div>
      </nav>
    </div>
  )
}

export default NavBar
