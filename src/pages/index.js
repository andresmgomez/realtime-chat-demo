import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import ChatApp from 'src/components/layout/ChatApp';

let socket;

export default function Home() {
   const [username, setUsername] = useState('');
   const [selectRoom, setSelectRoom] = useState('');

   const addOnlineUser = (onlineUser) => {
      setUsername(onlineUser);
      localStorage.setItem('username', onlineUser);
   };

   const addOnlineRoom = (roomName) => {
      socket.emit('add-room-event', { roomName });
      console.log(roomName);
      setSelectRoom(roomName);
   };

   // const onCreateClientRoom = (data) => {
   //    if (data) {
   //       setSelectRoom(data);
   //    }
   // };

   useEffect(() => {
      async function socketInitializer() {
         await fetch('/api/socket');
         socket = io();
         // socket.on('add-room-listener', onCreateClientRoom);
      }

      socketInitializer();
   }, []);

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
