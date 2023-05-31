import styles from './ChatBox.module.css';

export default function ChatBox() {
   return (
      <section className={`${styles.chatConversation} p-3 p-lg-4`}>
         <ul className="list-unstyled mb-0">
            <li>
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
                     <div className={`${styles.userMessage}`}>
                        <p className="mb-0">
                           Thanks for adding me to your group!
                        </p>
                     </div>
                  </div>
                  <div className={`${styles.guestUser}`}>Adryan Gonzales</div>
               </div>
            </li>
            <li className="host-chat">
               <div className="float-end">
                  <div className={`${styles.hostAvatar}`}>
                     <img
                        src="https://picsum.photos/seed/picsum/50/50"
                        alt="Guest User"
                        className="rounded-circle"
                        width="36px"
                        height="36px"
                     />
                  </div>
                  <div className={`${styles.chatContent}`}>
                     <div className={`${styles.hostMessage}`}>
                        <p className="mb-0">
                           Welcome to the coding channel! Here we talk about
                           coding
                        </p>
                     </div>
                  </div>
                  <div className={`${styles.hostUser}`}>Nicole Hewitt</div>
               </div>
            </li>
         </ul>
      </section>
   );
}
