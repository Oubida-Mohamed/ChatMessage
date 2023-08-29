import { createContext } from "react";
import React, { useState } from "react";
import axios from 'axios';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [rooms, setRooms] = useState([])
  



  const getRooms = async () => {
    try {
      const rooms = await axios.get('http://localhost:5000/api/rooms/all');
      if (rooms.data) setRooms(rooms.data);
    } catch (error) {
      console.log(error.message);
    }
  };




  return (
    <ChatContext.Provider value={{ getRooms, rooms ,selectedRoom ,setSelectedRoom }}>
      {children}
    </ChatContext.Provider>
  );
};
