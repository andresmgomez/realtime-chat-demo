import ChatBox from '../ChatBox/ChatBox';
import ChatMessage from '../ChatMessage/ChatMessage';
import ChatTop from '../ChatTop/ChatTop';

export default function ChatUsers({ username }) {
   return (
      <div className="position-relative w-100 overflow-hidden">
         <ChatTop username={username} />
         <ChatBox />
         <ChatMessage />
      </div>
   );
}
