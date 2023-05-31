import ChatBox from '../ChatBox/ChatBox';
import ChatTop from '../ChatTop/ChatTop';

export default function ChatUsers({ username }) {
   return (
      <div className="position-relative w-100 overflow-hidden">
         <ChatTop username={username} />
         <ChatBox />
      </div>
   );
}
