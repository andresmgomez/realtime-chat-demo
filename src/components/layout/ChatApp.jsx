import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import ChatRooms from '../chat/ChatRooms/ChatRooms';
import ChatUsers from '../chat/ChatUsers/ChatUsers';

const UserModal = dynamic(() => import('../modal/UserModal/UserModal'));
const RoomModal = dynamic(() => import('../modal/RoomModal/RoomModal'));

export default function ChatApp() {
   const [username, setUsername] = useState('');
   const [renderUserModal, setRenderUserModal] = useState(true);
   const [renderRoomModal, setRenderRoomModal] = useState(false);
   const [userGroupFound, setUserGroupFound] = useState(true);

   const closeUserModal = () => setRenderUserModal(false);
   const displayModal = () => setRenderRoomModal(true);
   const closeRoomModal = () => setRenderRoomModal(false);

   const addUser = (onlineUser) => {
      setUsername(onlineUser);
      localStorage.setItem('username', onlineUser);
   };

   useEffect(() => {
      if (localStorage.getItem('username')) {
         setUserGroupFound(true);
      }

      setUserGroupFound(false);
   });

   let showUserModal = (
      <UserModal
         title="User to Chat Group"
         label="Username"
         cta="Add User"
         addUser={addUser}
         closeModal={closeUserModal}
      />
   );

   let showRoomModal = (
      <RoomModal
         title="Create Room"
         label="Chat Room"
         cta="Add Room"
         closeModal={closeRoomModal}
      />
   );
   return (
      <div className="row">
         <div className="col-sm-12 col-md-4 col-lg-4">
            <ChatRooms displayModal={displayModal} />
         </div>
         <div className="col-sm-12 col-md-8 col-lg-8">
            <ChatUsers username={username} />
         </div>
         {renderUserModal && !userGroupFound ? showUserModal : null}
         {renderRoomModal ? showRoomModal : null}
      </div>
   );
}
