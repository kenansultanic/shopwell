import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectToDatabase from "./utils/database";
import initializeServer from "./utils/server";
import { saveNotification } from "./actions/notification";
import { registerScan } from "./actions/scans";

connectToDatabase();

dotenv.config();

const PORT = process.env.PORT || 4000;

declare global {
    namespace Express {
      interface Request {
        user: any
      }
    }
};

const app = initializeServer();

const server = http.createServer(app);


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


server.listen(PORT, () => {
    console.info(`Server running on port ${PORT}.`);
});