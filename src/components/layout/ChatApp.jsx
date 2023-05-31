import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import ChatRooms from '../chat/ChatRooms/ChatRooms';
import ChatUsers from '../chat/ChatUsers/ChatUsers';

const UserModal = dynamic(() => import('../modal/UserModal'));

export default function ChatApp() {
   const [username, setUsername] = useState('');
   const [userGroupFound, setUserGroupFound] = useState(true);
   const [addUserGroup, setAddUserGroup] = useState(true);

   const addUser = (onlineUser) => {
      setUsername(onlineUser);
      localStorage.setItem('username', onlineUser);
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
      <div className="row">
         <div className="col-sm-12 col-md-4 col-lg-4">
            <ChatRooms />
         </div>
         <div className="col-sm-12 col-md-8 col-lg-8">
            <ChatUsers username={username} />
         </div>
         {addUserGroup && !userGroupFound ? showCreateModal : null}
      </div>
   );
}
