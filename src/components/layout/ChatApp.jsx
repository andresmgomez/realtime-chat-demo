import { useState } from 'react';
import dynamic from 'next/dynamic';

const UserModal = dynamic(() => import('../modal/UserModal'));

export default function ChatApp() {
   const [onlineUser, setOnlineUser] = useState('');
   const [addUserGroup, setAddUserGroup] = useState(true);

   const addUser = (user) => {
      console.log(user);
      setOnlineUser(user);
   };

   const closeModal = () => {
      setAddUserGroup(false);
   };

   let showCreateModal = (
      <UserModal closeModal={closeModal} addUser={addUser} />
   );
   return (
      <>
         {/* <div>Chat Container</div> */}
         {addUserGroup ? showCreateModal : null}
      </>
   );
}
