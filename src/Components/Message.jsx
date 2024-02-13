import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const isOwner = message.senderId === currentUser.uid;
  const imageSource = isOwner ? currentUser.photoURL : data.user.photoURL;

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  // Function to format the timestamp into a readable format
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(); // Adjust format as needed
  };

  return (
    <div
     ref={ref} className={`flex gap-5 mb-5 ${isOwner ? 'flex-row-reverse' : ''}`}>
      <div className="flex flex-col text-gray-300 font-light">
        <img className="w-10 h-10 rounded-full object-cover" src={imageSource} alt="" />
        <span>{formatTime(message.createdAt)}</span> {/* Display message time */}
      </div>
      <div className={`max-w-[80%] flex flex-col gap-[10px] ${isOwner ? 'items-end' : ''}`}>
       {message.text &&  <p
          className={`${isOwner ? 'text-white bg-gray-500 rounded-tr-none rounded-tl-[10px] rounded-b-[10px] p-[10px] w-max' : 'bg-white p-[10px] rounded-tl-none rounded-tr-[10px] rounded-b-[10px] w-max'
            }`}>
          {message.text}
        </p>}
        {message.img && (
          <img
            className="w-1/2" src={message.img}
            alt=""
            onError={() => console.error("Error loading image:", message.img)}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
