import React, {useState, useEffect} from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import Following from './Following';

const Header = ({ name, image }) => {
  function logout() {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className='flex justify-between items-center p-4 w-full'>
      <div className='font-bold text-white font-mono'>
        <div className='flex'>
          {name}
          <img className='flex rounded-full ml-7' width={30} src={image} alt="" />
        </div>
      </div>
      <div className='flex space-x-4'>

        <a
          href="#"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group hover:font-bold transition-all"
        >
          <IoHomeOutline className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          <span className="flex-1 ms-2 whitespace-nowrap font-mono">
            Home
          </span>
        </a>

        <a
          href="#"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group hover:font-bold transition-all"
        >
          <FiSearch className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          <span className="flex-1 ms-2 whitespace-nowrap font-mono">
            Search
          </span>
        </a>

        <a
          href="#"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group hover:font-bold transition-all"
        >
          <CiLogout className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          <span onClick={logout} className="flex-1 ms-2 whitespace-nowrap font-mono cursor-pointer">
            Logout
          </span>
        </a>
      </div>
    </div>
  );
};

export default Header;
