import styles from './ChatHost.module.css';

export default function ChatHost({ host }) {
   return (
      <li className="host-chat">
         <div className={`${styles.conversationList} float-end`}>
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
               {host.message.map((eachMesage) => {
                  return (
                     <div className={`${styles.hostMessage}`}>
                        <p className="mb-0">{eachMesage}</p>
                     </div>
                  );
               })}
            </div>
            <div className={`${styles.hostUser}`}>{host.name}</div>
         </div>
      </li>
   );
}
