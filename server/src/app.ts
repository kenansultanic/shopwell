import dotenv from "dotenv";
import http from "http";
import connectToDatabase from "./utils/database";
import initializeServer from "./utils/server";
import connectSocketServer from "./utils/socket-server";

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

connectSocketServer(server);

server.listen(PORT, () => {
    console.info(`Server running on port ${PORT}.`);
});