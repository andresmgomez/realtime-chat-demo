import styles from './ChatGuest.module.css';

export default function ChatGuest({ message }) {
   return (
      <div className={`${styles.userMessage}`}>
         <p className="mb-0">{message}</p>
      </div>
   );
}
