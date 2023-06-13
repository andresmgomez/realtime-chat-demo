import { Server } from 'socket.io';
import { chatEvents, chatListeners } from 'src/constants/chatVariables';

let roomsList = [];
let onlineUsers = {};

const addOnlineRoom = (data, socket) => {
   // Check of the chat room is already in the list of chat rooms.
   // Otherwise, create a new chat room with assigned fields
   if (roomsList.indexOf(((room) => room.roomName === data.roomName) === -1)) {
      roomsList.push({
         name: data.roomName,
         initials: data.initials,
         username: data.username,
         messages: data.messages,
         createdAt: new Date()
      });
   }

   // Send socket information with created chat room to the user request
   onlineUsers[socket.id].emit(chatListeners.ADD_ROOM_SEVER, data.roomName);
   // Return to listening clients that there is a change in rooms list
   socket.broadcast.emit(chatListeners.ROOMS_LIST_SERVER, roomsList);
};

const sendOnlineMessage = (data, socket) => {
   const { user, message, room } = data;

   // Find the room name from user's list of chat rooms received
   let userRoom = roomsList.find((data) => data.name === room);
   // Pass each message created into the messages list with metadata
   userRoom.messages.push({ user, message, createdAt: new Date() });
   // Return to listening clients the list of user's chat messages
   socket.broadcast.emit(chatListeners.SEND_MESSAGE_SERVER, userRoom);
};

const chooseOnlineRoom = (data, socket) => {
   const { room } = data;

   let activeRoom = roomsList.find((data) => data.room === room);
   // Send socket information with active room to the user request
   onlineUsers[socket.id].emit(chatListeners.SEND_MESSAGE_SERVER, activeRoom);
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

      socket.emit(chatListeners.ROOMS_LIST_SERVER, roomsList);
      socket.on(chatEvents.ADD_ROOM_CLIENT, (data) =>
         addOnlineRoom(data, socket)
      );
      socket.on(chatEvents.CHOOSE_ROOM_CLIENT, (data) =>
         chooseOnlineRoom(data, socket)
      );
      socket.on(chatEvents.SEND_MESSAGE_CLIENT, (data) =>
         sendOnlineMessage(data, socket)
      );
      socket.on('disconnect', () => {
         delete onlineUsers[socket.id];
         console.log('Chat socket has been disconnected');
      });
   });

   res.end();
}
