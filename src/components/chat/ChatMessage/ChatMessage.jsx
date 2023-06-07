import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import styles from './ChatMessage.module.css';

export default function ChatMessage({ sendMessage }) {
   const [chatMessage, setChatMessage] = useState('');

   const handleMessageField = (event) => {
      event.preventDefault();
      setChatMessage(event.target.value);
   };

   const submitChatMessage = () => {
      if (chatMessage) {
         sendMessage(chatMessage.trim());
         setChatMessage('');
      }
   };

   return (
      <section
         className={`position-relative bottom-0 start-0 mb-0 ${styles.chatMessage}`}>
         <div className="row g-0">
            <div className="col">
               <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Type a new message..."
                  onChange={handleMessageField}
               />
            </div>
            <div class="col-auto">
               <div class="ms-md-2 me-md-0">
                  <ul class="list-inline mb-0">
                     <li class="list-inline-item">
                        <button
                           type="submit"
                           class={`${styles.btnSend} btn btn-primary btn-lg`}
                           onClick={submitChatMessage}
                           disabled={!chatMessage}>
                           <FaPaperPlane />
                        </button>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </section>
   );
}
