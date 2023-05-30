import { Server } from 'socket.io';

export default function HandleWebSocket(req, res) {
   if (!res.socket.server.io) {
      const io = new Server(res.socket.server);
      res.socket.server.io = io;

      io.on('connection', (socket) => {
         console.log('Web Socket is starting a connection');
      });
   }

   console.log('Web Socket already has a connection');
   res.end();
}
