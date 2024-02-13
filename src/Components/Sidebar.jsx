import React from 'react'
import Navbar from './Navbar'
import Searchbar from './Searchbar'
import Chats from './Chats'

const Sidebar = () => {
  return (
    <div className='flex-1 border-r bg-slate-700 relative'
    >
      <Navbar />
      <Searchbar />
      <Chats />


    </div>
  )
}

export default Sidebar