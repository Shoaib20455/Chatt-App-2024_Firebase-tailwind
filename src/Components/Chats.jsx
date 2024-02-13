import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className=" duration-200 group">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="hover:bg-blue-500 p-[10px] flex items-center gap-[10px] text-white cursor-pointer"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img
          className=" w-[50px] h-[50px] rounded-full object-cover"
           src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span
            className="sm:block hidden text-lg font-medium">{chat[1].userInfo.displayName}</span>
            <p
            className="group-hover:text-white text-sm text-gray-300">{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;