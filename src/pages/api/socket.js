import { Server } from 'socket.io';
import { onCreateServerRoom } from './utils/chatServer';

export default function SocketHandler(req, res) {
   if (res.socket.server.io) {
      res.end();
      return;
   }

   const io = new Server(res.socket.server);
   res.socket.server.io = io;

   io.on('connection', (socket) => {
      socket.on('add-room-event', (data) => onCreateServerRoom(data, socket));
   });

   console.log('Chat Socket starting a connection');
   res.end();
}
