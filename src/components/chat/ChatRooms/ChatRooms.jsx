import { FaUser } from 'react-icons/fa';
import { chatRooms } from 'src/data/chatRooms';

import ChatRoom from '../ChatRoom/ChatRoom';
import styles from './ChatRooms.module.css';

export default function ChatUsers() {
   return (
      <section className={`${styles.chatRooms} me-lg-1 ms-lg-0`}>
         <div className="p-4">
            <div className="float-end">
               <div
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Add Room">
                  <button
                     type="button"
                     class="btn btn-link text-decoration-none text-muted py-0"
                     data-bs-toggle="modal"
                     data-bs-target="addUserModal">
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
