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

      if (socket) {
         socket.off('room-list-listener');
         socket.off('add-room-listener');
         socket.off('send-message-listener');
      }
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

   const onSendClientMessage = (data) => {
      if (data) {
         setNewMessage(data.messages.message);
         console.log(data.messages);
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

   const addOnlineUser = (onlineUser) => {
      const fullName = setUsername(onlineUser);
      localStorage.setItem('username', fullName);
   };

   const getRoomInitials = (roomName) => {
      const roomInitials =
         roomName.charAt(1) + roomName.charAt(5).toUpperCase();
      setInitials(roomInitials);
   };

   const addOnlineRoom = (roomName) => {
      getRoomInitials(roomName);
      socket.emit('add-room-event', { roomName, initials, username, messages });
      chooseOnlineRoom(roomName);
   };

   const chooseOnlineRoom = (roomName) => {
      if (roomName) {
         setSelectRoom(roomName);
         socket.emit('choose-room-event', roomName);
      }
   };

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
               messages={messages}
               roomsList={roomsList}
               selectRoom={selectRoom}
               addOnlineRoom={addOnlineRoom}
               chooseOnlineRoom={chooseOnlineRoom}
            />
         </main>
      </>
   );
}
