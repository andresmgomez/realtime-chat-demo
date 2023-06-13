import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { chatEvents, chatListeners } from 'src/constants/chatVariables';

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
      socket.on(chatListeners.ADD_ROOM_SEVER, onCreateClientRoom);
      socket.on(chatListeners.ROOMS_LIST_SERVER, onDisplayClientRooms);
      socket.on(chatListeners.SEND_MESSAGE_SERVER, onSendClientMessage);
   };

   useEffect(() => {
      socketInitializer();

      if (socket) {
         socket.off(chatListeners.ROOMS_LIST_SERVER);
         socket.off(chatListeners.ADD_ROOM_SEVER);
         socket.off(chatListeners.SEND_MESSAGE_SERVER);
      }
   }, [selectRoom]);

   useEffect(() => {
      if (newMessage && roomsList) {
         // Get current list of chat rooms
         let userRoomsList = [...roomsList];
         // Filter the chat rooms that have not
         // received a new message
         userRoomsList = userRoomsList.filter(
            (room) => room.name !== newMessage.name
         );
         // Update the chat rooms with the room that has
         // received a new message
         userRoomsList = [...userRoomsList, { ...newMessage }];
         // Organize list of chat rooms from last created date
         updateClientRoomList(userRoomsList);
         // Run the useEffect every time a new message is sent
         setNewMessage(null);
      }
   }, [newMessage]);

   useEffect(() => {
      // Synchronize user's messages with list of chat rooms
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
      // Sort current chat rooms in descending order
      const updateRooms = onlineRooms.sort(
         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRoomsList(updateRooms);
   };

   const updateUserRoomsWithMessages = () => {
      // Access the chat rooms with new messages
      let userRoomsList = [...roomsList];
      // Find the chat room that user has selected
      let updateUserRoom = userRoomsList.find(
         (room) => room.name === selectRoom
      );

      if (updateUserRoom) {
         // Pass chat messages to user's list of messages
         const updateUserMessages = updateUserRoom.messages;
         setMessages(updateUserMessages);
      }
   };

   const addOnlineUser = (onlineUser) => {
      // Store the full username from the user modal
      const fullName = setUsername(onlineUser);
      localStorage.setItem('username', fullName);
   };

   const getRoomInitials = (roomName) => {
      // Get the initial characters of a room name
      // before displaying it in the avatar image
      const roomInitials =
         roomName.charAt(1) + roomName.charAt(5).toUpperCase();
      setInitials(roomInitials);
   };

   const addOnlineRoom = (roomName) => {
      getRoomInitials(roomName);

      // Notify chat server that a new room has been
      // created with additional information
      socket.emit(chatEvents.ADD_ROOM_CLIENT, {
         roomName,
         initials,
         username,
         messages
      });
      // At the same time, select created room as the
      // active room on the client
      chooseOnlineRoom(roomName);
   };

   const chooseOnlineRoom = (roomName) => {
      // Notify chat server that chat room has been selected
      // only if online room exist
      if (roomName) {
         setSelectRoom(roomName);
         socket.emit(chatEvents.CHOOSE_ROOM_CLIENT, roomName);
      }
   };

   const sendOnlineMessage = (message) => {
      // Validate that chat user cannot send a message if he or she
      // has not chosen an online room or there is not a single room
      if (!username || !selectRoom || roomsList.length === 0) return;

      // Notify chat server that online user has sent a message
      socket.emit(chatEvents.SEND_MESSAGE_CLIENT, {
         user: username,
         message,
         room: selectRoom
      });

      // Keep track of list of current messages
      // and update it with the new message sent
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
