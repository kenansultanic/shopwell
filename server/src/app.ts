import dotenv from "dotenv";
import database from "./utils/database";
import initializeServer from "./utils/server";

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

app.listen(PORT, () => {
    console.info(`Server running on port ${PORT}.`);
});