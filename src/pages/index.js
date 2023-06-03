import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import ChatApp from 'src/components/layout/ChatApp';

let socket;

export default function Home() {
   const [username, setUsername] = useState('');
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
         console.log(selectRoom);
      }
   };

   const onDisplayClientRooms = (data) => {
      const roomList = updateClientRoomList(data);
      console.log(roomList);
   };

   const updateClientRoomList = (roomsList) => {
      const updateRooms = roomsList.sort(
         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRoomsList(updateRooms);
   };

   const addOnlineUser = (onlineUser) => {
      setUsername(onlineUser);
      localStorage.setItem('username', onlineUser);
   };

   const addOnlineRoom = (roomName) => {
      socket.emit('add-room-event', { roomName });
      setSelectRoom(roomName);
      console.log(selectRoom);
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
