let serverRoomsList = [];
export let onlineUsers = {};

export const onCreateServerRoom = (data, socket) => {
   if (
      serverRoomsList.indexOf(
         ((serverRoom) => serverRoom.name === data.roomName) === -1
      )
   ) {
      serverRoomsList.push({ name: roomName });
   }

   onlineUsers(socket.id).emit('add-room-event', data.roomName);
};
