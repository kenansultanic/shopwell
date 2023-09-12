import http from "http";
import { Server } from "socket.io";
import { saveNotification } from "../actions/notification";
import { registerScan } from "../actions/scans";

const connectSocketServer = (server: http.Server) => {
    
    const io = new Server(server, {
        cors: {
          origin: 'http://localhost:3000',
          methods: ['GET', 'POST']
        }
      });
      
      io.on('connection', socket => {
        
        socket.on('send_notification', async data => {
          const newNotification = await saveNotification(data);
          socket.broadcast.emit('receive_notification', { newNotification });
        });
      
        socket.on('register_scan', data => {
          try {
            registerScan(data.date);
          }
          catch (error) {
            console.error(error);
          }
        });
      
      });
};

export default connectSocketServer;