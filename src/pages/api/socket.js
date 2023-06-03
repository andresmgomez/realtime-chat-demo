import { Server } from 'socket.io';
// import { onCreateServerRoom } from './utils/chatServer';

let roomsList = [];
let onlineUsers = {};

const addOnlineRoom = (data, socket) => {
   // if (roomsList.indexOf(((room) => room.name === data.roomName) === -1)) {
   //    roomsList.push({ name: data.roomName, createdAt: new Date() });
   // }

   onlineUsers[socket.id].emit('add-room-listener', data.roomName);
   socket.broadcast.emit('room-list-listener', roomsList);
};

export default function SocketHandler(req, res) {
   if (res.socket.server.io) {
      res.end();
      return;
   }

   const io = new Server(res.socket.server);
   res.socket.server.io = io;

   io.on('connection', (socket) => {
      console.log('Chat Socket starting a connection');

      const existingUser = onlineUsers[socket.id];
      if (!existingUser) {
         onlineUsers[socket.id] = socket;
      }

      socket.on('add-room-event', (data) => addOnlineRoom(data, socket));
      socket.on('choose-room-event', (data) => selectOnlineRoom(data, socket));
   });

   res.end();
}
