import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

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
         {/* <div>Chat Container</div> */}
         {addUserGroup && !userGroupFound ? showCreateModal : null}
      </>
   );
}
