import React from 'react';
import Sidebar from '../Components/Sidebar';
import Chat from '../Components/Chat';

const Home = () => {
  return (
    <div className='bg-slate-900 h-screen flex items-center justify-center'>
      <div className="border rounded-[10px] lg:min-w-[65%] h-[80%] min-w-[90%] flex overflow-hidden">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
