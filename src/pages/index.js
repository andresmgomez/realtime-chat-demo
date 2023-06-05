import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import ChatApp from 'src/components/layout/ChatApp';

let socket;

export default function Home() {
   const [username, setUsername] = useState('');
   const [newMessage, setNewMessage] = useState(null);
   const [messages, setMessages] = useState([]);
   const [initials, setInitials] = useState([]);
   const [roomsList, setRoomsList] = useState([]);
   const [selectRoom, setSelectRoom] = useState('');

   const socketInitializer = async () => {
      await fetch('/api/socket');
      socket = io();
      socket.on('add-room-listener', onCreateClientRoom);
      socket.on('room-list-listener', onDisplayClientRooms);
      socket.on('send-message-listener', onSendClientMessage);
   };

   useEffect(() => {
      socketInitializer();
   }, [selectRoom]);

   useEffect(() => {
      if (newMessage && roomsList) {
         let userRoomsList = [...roomsList];
         userRoomsList = userRoomsList.filter(
            (room) => room.name !== newMessage.name
         );
         userRoomsList = [...userRoomsList, { ...newMessage }];
         updateClientRoomList(userRoomsList);
         setNewMessage(null);
      }
   }, [newMessage]);

   useEffect(() => {
      updateUserRoomsWithMessages();
   }, [roomsList]);

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

   const onSendClientMessage = (data) => {
      if (data) {
         setNewMessage(data.messages.message);
         console.log(data.messages);
      }
   };

   const updateClientRoomList = (onlineRooms) => {
      const updateRooms = onlineRooms.sort(
         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRoomsList(updateRooms);
   };

   const updateUserRoomsWithMessages = () => {
      let userRoomsList = [...roomsList];
      let updateUserRoom = userRoomsList.find(
         (room) => room.name === selectRoom
      );

      if (updateUserRoom) {
         const updateUserMessages = updateUserRoom.messages;
         setMessages(updateUserMessages);
      }
   };

   const getFirstName = (onlineUser) => {
      const fullNameUser = onlineUser.split();
      const topUser = fullNameUser[0];
      return topUser;
   };

   const addOnlineUser = (onlineUser) => {
      const firstName = getFirstName(onlineUser);
      setUsername(firstName);
      localStorage.setItem('username', onlineUser);
   };

   const getRoomInitials = (roomName) => {
      const roomInitials =
         roomName.charAt(1) + roomName.charAt(5).toUpperCase();
      setInitials(roomInitials);
   };

   const addOnlineRoom = (roomName) => {
      getRoomInitials(roomName);
      socket.emit('add-room-event', { roomName, initials, username, messages });
      setSelectRoom(roomName);
      // chooseOnlineRoom(roomName);
   };

   // const chooseOnlineRoom = (roomName) => {
   //    if (roomName) {
   //       setSelectRoom(roomName);
   //       socket.emit('choose-room-event', { roomName });
   //    }
   // };

   const sendOnlineMessage = (message) => {
      socket.emit('send-message-event', {
         user: username,
         message,
         room: selectRoom
      });

      setMessages((userMessages) => [
         ...userMessages,
         {
            user: username,
            message
         }
      ]);
   };

   return (
      <>
         <main>
            <ChatApp
               username={username}
               addOnlineUser={addOnlineUser}
               sendOnlineMessage={sendOnlineMessage}
               roomsList={roomsList}
               selectRoom={selectRoom}
               addOnlineRoom={addOnlineRoom}
            />
         </main>
      </>
   );
}
