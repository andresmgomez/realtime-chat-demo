import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import ChatUsers from '../chat/ChatUsers/ChatUsers';
import ChatRooms from '../chat/ChatRooms/ChatRooms';

const UserModal = dynamic(() => import('../modal/UserModal/UserModal'));
const RoomModal = dynamic(() => import('../modal/RoomModal/RoomModal'));

export default function ChatApp({
   username,
   addOnlineUser,
   sendOnlineMessage,
   messages,
   roomsList,
   selectRoom,
   addOnlineRoom
}) {
   const [renderUserModal, setRenderUserModal] = useState(true);
   const [renderRoomModal, setRenderRoomModal] = useState(false);
   const [userGroupFound, setUserGroupFound] = useState(true);

   const closeUserModal = () => setRenderUserModal(false);
   const displayModal = () => setRenderRoomModal(true);
   const closeRoomModal = () => setRenderRoomModal(false);

   useEffect(() => {
      if (localStorage.getItem('username')) {
         setUserGroupFound(true);
      }

      setUserGroupFound(false);
   });

   let showUserModal = (
      <UserModal
         title="User to Chat Group"
         cta="Add User"
         addUser={addOnlineUser}
         closeModal={closeUserModal}
      />
   );

   let showRoomModal = (
      <RoomModal
         title="Create Online Room"
         label="#Technology"
         cta="Add Room"
         addRoom={addOnlineRoom}
         closeModal={closeRoomModal}
      />
   );
   return (
      <div className="row">
         <div className="col-sm-12 col-md-4 col-lg-4">
            <ChatRooms
               displayModal={displayModal}
               roomsList={roomsList}
               selectRoom={selectRoom}
            />
         </div>
         <div className="col-sm-12 col-md-8 col-lg-8">
            <ChatUsers
               username={username}
               sendOnlineMessage={sendOnlineMessage}
               messages={messages}
            />
         </div>
         {renderUserModal && !userGroupFound ? showUserModal : null}
         {renderRoomModal ? showRoomModal : null}
      </div>
   );
}
