import * as _ from 'underscore';
import { chatHost } from 'src/data/chatHost';
import ChatGuest from '../ChatGuest/ChatGuest';
import ChatHost from '../ChatHost/ChatHost';

import styles from './ChatBox.module.css';
import { chatGuest } from 'src/data/chatGuest';

export default function ChatBox() {
   return (
      <section className={`${styles.chatConversation} p-3 p-lg-4`}>
         <ul className="list-unstyled mb-0">
            {chatGuest.map((guest, index) => {
               return <ChatGuest guest={guest} key={index} />;
            })}
            {/*  */}
            {chatHost.map((host, index) => {
               return <ChatHost host={host} key={index} />;
            })}
         </ul>
      </section>
   );
}
