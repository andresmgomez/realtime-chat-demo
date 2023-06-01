import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import ChatApp from 'src/components/layout/ChatApp';

export default function Home() {
   let socket;

   const [username, setUsername] = useState('');
   const [selectRoom, setSelectRoom] = useState('');

   const addOnlineUser = (onlineUser) => {
      setUsername(onlineUser);
      localStorage.setItem('username', onlineUser);
   };

   const addOnlineRoom = (roomName) => {
      setSelectRoom(roomName);
   };

   const socketInitializer = async () => {
      await fetch('/api/socket');
      socket = io();
   };

   useEffect(() => {
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
