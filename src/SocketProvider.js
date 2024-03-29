"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = React.createContext(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  // console.log(state);
  if (!state) throw new Error("State is undefined");
  return state;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);
  
  const sendMessage = useCallback(
    (msg) => {
      console.log("Send Message:", msg);
      if (socket) {
        socket.emit("event:message", { message: msg });
      }
    },
    [socket]
  );

  const onMsgReceive = useCallback((msg) => {
    console.log("From Server:", msg);
    const { message } = JSON.parse(msg);
    setMessages((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    const _socket = io("${PUBLIC_IP}:8000");
    _socket.on("message", onMsgReceive);
    setSocket(_socket);
    return () => {
      _socket.off("message", onMsgReceive);
      _socket.disconnect();
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </SocketContext.Provider>
    // <div></div>
  );
};
