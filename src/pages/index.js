import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import ChatApp from 'src/components/layout/ChatApp';

let socket;

export default function Home() {
   const [username, setUsername] = useState('');
   const [messages, setMessages] = useState([]);
   const [roomsList, setRoomsList] = useState([]);
   const [selectRoom, setSelectRoom] = useState('');

   const socketInitializer = async () => {
      await fetch('/api/socket');
      socket = io();
      socket.on('add-room-listener', onCreateClientRoom);
      socket.on('room-list-listener', onDisplayClientRooms);
   };

   useEffect(() => {
      socketInitializer();
   }, []);

   const onCreateClientRoom = (data) => {
      if (data) {
         setSelectRoom(data);
      }
   };

   const onDisplayClientRooms = (data) => {
      if (data) {
         updateClientRoomList(data);
         console.log(data);
      }
   };

   const updateClientRoomList = (onlineRooms) => {
      const updateRooms = onlineRooms.sort(
         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRoomsList(updateRooms);
   };

   const addOnlineUser = (onlineUser) => {
      setUsername(onlineUser);
      localStorage.setItem('username', onlineUser);
   };

   const addOnlineRoom = (roomName) => {
      socket.emit('add-room-event', { roomName, username, messages });
      setSelectRoom(roomName);
   };

   return (
      <>
         <main>
            <ChatApp
               username={username}
               addOnlineUser={addOnlineUser}
               selectRoom={selectRoom}
               addOnlineRoom={addOnlineRoom}
            />
         </main>
      </>
   );
}
