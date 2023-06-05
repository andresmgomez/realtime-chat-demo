import { chatHost } from 'src/data/chatHost';
import ChatGuest from '../ChatGuest/ChatGuest';
import ChatHost from '../ChatHost/ChatHost';

import styles from './ChatBox.module.css';

export default function ChatBox({ messages }) {
   console.log(messages);
   return (
      <section className={`${styles.chatConversation} p-3 p-lg-4`}>
         <ul className="list-unstyled mb-0">
            {messages.length !== 0 && (
               <li className="guest-chat">
                  <div className={`${styles.conversationList}`}>
                     {/* <div className={`${styles.userAvatar}`}>
                        <img
                           src="https://picsum.photos/50/50"
                           alt="Host User"
                           className="rounded-circle"
                           width="36px"
                           height="36px"
                        />
                     </div> */}
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
                     {/* <div className={`${styles.guestUser}`}>
                        {messages.user}
                     </div> */}
                  </div>
               </li>
            )}
            {/*  */}
            {chatHost.map((host, index) => {
               return <ChatHost host={host} />;
            })}
         </ul>
      </section>
   );
}
