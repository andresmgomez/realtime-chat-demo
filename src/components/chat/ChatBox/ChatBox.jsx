import { chatHost } from 'src/data/chatHost';
import ChatGuest from '../ChatGuest/ChatGuest';
import ChatHost from '../ChatHost/ChatHost';

import styles from './ChatBox.module.css';

export default function ChatBox({ username, messages }) {
   const getFirstName = (username) => {
      const fullNameUser = username.split(' ');
      const topUser = fullNameUser[0];
      return topUser;
   };

   return (
      <>
         <section className={`${styles.chatConversation}`}>
            {messages.length !== 0 && (
               <>
                  <div className={`${styles.chatMessages} p-3 p-lg-4`}>
                     <ul className="list-unstyled mb-0">
                        <>
                           <li>
                              <div className={`${styles.chatContent}`}>
                                 {messages?.map((onlineMessage, index) => {
                                    return (
                                       <ChatGuest
                                          key={index}
                                          message={onlineMessage.message}
                                       />
                                    );
                                 })}
                              </div>
                           </li>
                        </>
                     </ul>
                  </div>
                  <div className={`${styles.guestUser}`}>
                     <div className={`${styles.guestAvatar}`}>
                        <img
                           src="https://picsum.photos/50/50"
                           alt="Host User"
                           className="rounded-circle"
                           width="36px"
                           height="36px"
                        />
                     </div>
                     <div className={`${styles.guestName}`}>
                        {getFirstName(username)}
                     </div>
                  </div>
               </>
            )}
         </section>
      </>
   );
}
