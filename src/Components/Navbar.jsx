import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex gap-3 justify-around items-center bg-slate-800 ">

      <div className="flex  items-center flex-shrink-0 sm:inline hidden">
        <img src="src/img/logo.png" alt="Logo" className="h-12 w-12 " style={{ transform: 'scale(1.5)' }} />
      </div>

      <div className='flex items-center justify-between h-14 text-[#ddddf7]'>
        <img src={currentUser.photoURL} style={{ transform: 'scale(1.5)' }} alt="" className='flex-shrink-0 object-cover bg-[#ddddf7] h-8 w-8 rounded-full ' />
        <span className='flex-shrink pl-4 md:inline hidden'>{currentUser.displayName}</span>
      </div>

      <button
        className=' font-semibold hover:bg-blue-700 bg-blue-600 h-11 hover:text-white text-[#ddddf7]  w-full  absolute bottom-0 left-0 cursor-pointer'
        onClick={() => signOut(auth)}>
        Logout
      </button>

    </div>
  );
};

export default Navbar;
