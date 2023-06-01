import Link from 'next/link';
import styles from './ChatRoom.module.css';

export default function ChatRoom({ room }) {
   return (
      <li className={`${styles.chatRoom}`}>
         <Link href="#">
            <div className="d-flex align-items-center">
               <div className="position-relative me-3 ms-0">
                  <div className={`${styles.roomImage}`}>
                     <span className={`${styles.roomInitials} rounded-circle`}>
                        {room.initials}
                     </span>
                  </div>
               </div>
               <div className="flex-grow-1">
                  <h5 className={`${styles.roomName} mb-0`}>{room.title}</h5>
               </div>
            </div>
         </Link>
      </li>
   );
}