import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ChatRooms from '../chat/ChatRooms/ChatRooms';

const UserModal = dynamic(() => import('../modal/UserModal'));

export default function ChatApp() {
   const [onlineUser, setOnlineUser] = useState('');
   const [userGroupFound, setUserGroupFound] = useState(true);
   const [addUserGroup, setAddUserGroup] = useState(true);

   const addUser = (username) => {
      localStorage.setItem('username', username);
      setOnlineUser(username);
   };

   const closeModal = () => {
      setAddUserGroup(false);
   };

   useEffect(() => {
      if (localStorage.getItem('username')) {
         setUserGroupFound(true);
      }

      setUserGroupFound(false);
   });

   let showCreateModal = (
      <UserModal closeModal={closeModal} addUser={addUser} />
   );
   return (
      <>
         <ChatRooms />
         {/* {addUserGroup && !userGroupFound ? showCreateModal : null} */}
      </>
   );
}
