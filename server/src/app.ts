import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import database from "./utils/database";
import initializeServer from "./utils/server";
import { saveNotification } from "./actions/notification";



dotenv.config();

const PORT = process.env.PORT || 4000;

// TODO(IZMJESTII)
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
  //console.log('user', socket.id);

  socket.on("test", data => {
    console.log("dodje")
    socket.broadcast.emit("test2", {test: 1});
  })

  socket.on('send_notification', async data => {
    const newNotification = await saveNotification(data);
    socket.broadcast.emit('receive_notification', { newNotification });
  });
});


server.listen(PORT, () => {
    console.info(`Server running on port ${PORT}.`);
});