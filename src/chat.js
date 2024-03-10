import React, { useState } from "react";
import "./styles.css";
import { useSocket } from "./SocketProvider";

export const Chat = () => {
  const { sendMessage, messages } = useSocket();
  const [msg, setMsg] = useState("");
  console.log(msg);
  return (
    <div>
      <p className="text-center">Chat Application 3</p>
      <div className="container place-content-center">
        <div className="chat">
          {messages.map((e) => (
            <p>{e}</p>
          ))}
        </div>
        <input className="message-box" placeholder="Message..." onChange={(e) => setMsg(e.target.value)}></input>
        <button className="send-button" onClick={(e) => sendMessage(msg)}>
          Send
        </button>
      </div>
    </div>
  );
};
