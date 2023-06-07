import { FaUser } from 'react-icons/fa';

import ChatRoom from '../ChatRoom/ChatRoom';
import styles from './ChatRooms.module.css';

export default function ChatRooms({
   displayModal,
   roomsList,
   selectRoom,
   chooseOnlineRoom
}) {
   return (
      <section className={`${styles.chatRooms} me-lg-1 ms-lg-0`}>
         <div className="p-4">
            <div className="float-end">
               <button
                  type="button"
                  className="btn btn-link text-decoration-none text-muted py-0"
                  onClick={displayModal}>
                  <FaUser />
               </button>
            </div>
            <h4 class="mb-4">Chat Rooms</h4>
         </div>
         <div className={`${styles.chatRoomsList} p-4`}>
            <ul className="list-unstyled mb-0">
               {roomsList.map((room, index) => {
                  return (
                     <ChatRoom
                        room={room}
                        activeRoom={room.name === selectRoom}
                        chooseRoom={chooseOnlineRoom}
                        key={index}
                     />
                  );
               })}
            </ul>
         </div>
      </section>
   );
}
