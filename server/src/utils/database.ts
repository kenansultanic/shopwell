import mongoose from "mongoose";
import dotenv from "dotenv";
//Todo(stavi u funkciju i folder config)
dotenv.config();

const mongoString = process.env.MONGO_URI ?? '';

const connectToDatabase = () => {

    mongoose.set('strictQuery', false);
    mongoose.connect(mongoString);

    const database = mongoose.connection;

    database.on('error', error => {
        console.error(error);
    });

    database.once('connected', () => {
        console.info('Database connected');
    });
};

export default connectToDatabase;