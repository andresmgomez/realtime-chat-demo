import Link from 'next/link';
import styles from './ChatRoom.module.css';

export default function ChatRoom({ room, activeRoom, chooseRoom }) {
   let activeRoomStyles = ['text-primary', 'pt-3'];

   if (!activeRoom) {
      activeRoomStyles = ['text-dark', 'pt-3'];
   }

   return (
      <li
         className={`${styles.chatRoom} ${activeRoomStyles.join(' ')}`}
         onClick={() => chooseRoom(room.name)}>
         <div className="d-flex align-items-center">
            <div className="position-relative me-3 ms-0">
               <div className={`${styles.roomImage}`}>
                  <span className={`${styles.roomInitials} rounded-circle`}>
                     {room.initials}
                  </span>
               </div>
            </div>
            <div className="flex-grow-1">
               <h5 className={`${styles.roomName} mb-0`}>{room.name}</h5>
            </div>
         </div>
      </li>
   );
}
