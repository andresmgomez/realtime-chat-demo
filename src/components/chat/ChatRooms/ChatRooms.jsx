import { FaUser } from 'react-icons/fa';
import { chatRooms } from 'src/data/chatRooms';

import ChatRoom from '../ChatRoom/ChatRoom';
import styles from './ChatRooms.module.css';

export default function ChatRooms({ displayModal }) {
   return (
      <section className={`${styles.chatRooms} me-lg-1 ms-lg-0`}>
         <div className="p-4">
            <div className="float-end">
               <div>
                  <button
                     type="button"
                     className="btn btn-link text-decoration-none text-muted py-0"
                     onClick={displayModal}>
                     <FaUser />
                  </button>
               </div>
            </div>
            <h4 class="mb-4">Chat Rooms</h4>
         </div>
         <div className={`${styles.chatRoomsList} p-4`}>
            <ul className="list-unstyled mb-0">
               {chatRooms.map((room, index) => {
                  return <ChatRoom room={room} key={index} />;
               })}
            </ul>
         </div>
      </section>
   );
}
