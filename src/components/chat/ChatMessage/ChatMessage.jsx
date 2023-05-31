import { FaPaperPlane } from 'react-icons/fa';
import styles from './ChatMessage.module.css';

export default function ChatMessage() {
   return (
      <section className="p-3 p-lg-4 mb-0 border-top">
         <div className="row g-0">
            <div className="col">
               <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Type a new message..."
               />
            </div>
            <div class="col-auto">
               <div class="ms-md-2 me-md-0">
                  <ul class="list-inline mb-0">
                     <li class="list-inline-item">
                        <button
                           type="submit"
                           class={`${styles.btnSend} btn btn-primary btn-lg`}>
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
