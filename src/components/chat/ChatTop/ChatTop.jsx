import { FaEllipsisH } from 'react-icons/fa';
import styles from './ChatTop.module.css';

export default function ChatTop({ username }) {
   return (
      <section className={`${styles.chatTop} p-3 p-lg-3 border-bottom`}>
         <div className="row">
            <div className="col-sm-4 col-8">
               <div className="d-flex align-items-center">
                  <div className="me-3 ms-0">
                     <img
                        src="https://picsum.photos/50/50"
                        alt="Chat User"
                        className="rounded-circle"
                     />
                  </div>
                  <div class="flex-grow-1">
                     <h5 class="mb-0">
                        <a href="#" class={`${styles.chatUsername}`}>
                           {!username ? 'Username' : username}
                        </a>
                     </h5>
                  </div>
               </div>
            </div>
            <div className="col-sm-8 col-4">
               <ul className="list-inline text-end mb-0">
                  <li className="list-inline-item me-2 ms-0">
                     <button type="button" className="btn">
                        <FaEllipsisH />
                     </button>
                  </li>
               </ul>
            </div>
         </div>
      </section>
   );
}
