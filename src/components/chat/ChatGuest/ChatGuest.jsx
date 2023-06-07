import styles from './ChatGuest.module.css';

export default function ChatGuest({ message }) {
   return (
      <div className={`${styles.alignMessage}`}>
         <div className={`${styles.guestMessage}`}>
            <p className="mb-0">{message}</p>
         </div>
      </div>
   );
}
