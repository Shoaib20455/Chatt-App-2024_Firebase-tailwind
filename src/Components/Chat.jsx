import React, { useContext } from "react";
import Cam from "../assets/cam.png";
import Add from "../assets/add.png";
import More from "../assets/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="flex-[2]">
      <div className=" h-14 bg-slate-800 flex items-center justify-between
     p-[10px] text-gray-300">
        <span>{data.user?.displayName}</span>
        <div className="flex gap-[10px]">
          <img src={Cam} alt=""
          className="h-[24px] cursor-pointer" />
          <img src={Add} alt=""
          className="h-[24px] cursor-pointer" />
          <img src={More} alt=""
          className="h-[24px] cursor-pointer" />
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;