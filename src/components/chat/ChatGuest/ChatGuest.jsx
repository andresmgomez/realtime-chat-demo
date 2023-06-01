import styles from './ChatGuest.module.css';

export default function ChatGuest({ guest }) {
   return (
      <li className="guest-chat">
         <div className={`${styles.conversationList}`}>
            <div className={`${styles.userAvatar}`}>
               <img
                  src="https://picsum.photos/50/50"
                  alt="Host User"
                  className="rounded-circle"
                  width="36px"
                  height="36px"
               />
            </div>
            <div className={`${styles.chatContent}`}>
               {guest.message.map((eachMesage) => {
                  return (
                     <div className={`${styles.userMessage}`}>
                        <p className="mb-0">{eachMesage}</p>
                     </div>
                  );
               })}
            </div>
            <div className={`${styles.guestUser}`}>{guest.name}</div>
         </div>
      </li>
   );
}
