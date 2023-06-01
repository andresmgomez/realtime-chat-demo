import { Server } from 'socket.io';

const HandleWebSockets = (req, res) => {
   if (res.socket.server.io) {
      console.log('Web Socket already has a connection');
   } else {
      const io = new Server(res.socket.server);
      res.socket.server.io = io;
   }

   // res.end();
};

export default HandleWebSockets;
