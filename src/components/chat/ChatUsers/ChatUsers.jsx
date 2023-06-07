import ChatBox from '../ChatBox/ChatBox';
import ChatMessage from '../ChatMessage/ChatMessage';
import ChatTop from '../ChatTop/ChatTop';

export default function ChatUsers({ username, sendOnlineMessage, messages }) {
   return (
      <div className="position-relative w-100">
         <ChatTop username={username} />
         <ChatBox username={username} messages={messages} />
         <ChatMessage sendMessage={sendOnlineMessage} />
      </div>
   );
}
