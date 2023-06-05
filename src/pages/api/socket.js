import { Server } from 'socket.io';

let roomsList = [];
let onlineUsers = {};

const addOnlineRoom = (data, socket) => {
   if (roomsList.indexOf(((room) => room.roomName === data.roomName) === -1)) {
      roomsList.push({
         name: data.roomName,
         initials: data.initials,
         username: data.username,
         messages: data.messages,
         createdAt: new Date()
      });
   }

   onlineUsers[socket.id].emit('add-room-listener', data.roomName);
   socket.broadcast.emit('room-list-listener', roomsList);
};

const sendOnlineMessage = (data, socket) => {
   const { user, message, room } = data;

   let userRoom = roomsList.find((data) => data.name === room);
   userRoom.messages.push({ user, message, createdAt: new Date() });

   socket.broadcast.emit('send-message-listener', userRoom);
};

// const chooseOnlineRoom = (roomName, socket) => {
//    let activeRoom = roomsList.find((data) => data.roomName === roomName);
//    socket.broadcast.emit('choose-room-listener', data.roomName);
//    onlineUsers[socket.id].emit('send-message-listener', activeRoom);
// };

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

      socket.emit('room-list-listener', roomsList);
      socket.on('add-room-event', (data) => addOnlineRoom(data, socket));
      socket.on('choose-room-event', (data) => chooseOnlineRoom(data, socket));
      socket.on('send-message-event', (data) =>
         sendOnlineMessage(data, socket)
      );
   });

   res.end();
}
