import express, { Request, Response, NextFunction } from "express";
//import database from "./database";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookies from "cookie-parser";
import upload from "express-fileupload";
import dotenv from "dotenv";
import authRouter from "../routes/auth";
import userRouter from "../routes/user";
import productRouter from "../routes/product";
import adminRouter from "../routes/admin";
import { hashPassword } from "./functions";
import ScansPerDay from "../models/scans-per-day.model";

//import { admin, adminRouter } from "../admin/admin";

dotenv.config();
/*
const mongoString = process.env.MONGO_URI!;

mongoose.set('strictQuery', false);
mongoose.connect(mongoString);

const database = mongoose.connection;

database.on('error', error => {
    console.error(error);
});

database.once('connected', () => {
    console.info('Database connected.');
});*/

const initializeServer = () => {

    const app = express();

    app.use(cookies());
    app.use(upload());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        credentials: true
    }));

    app.get('/', async (req, res)=>res.status(201).json({some: await hashPassword('Admin123')}))

    app.get("/test", async (req, res) => {
        let s: any = []
        for (let i = 1; i < 7; i++) {
            const novi = new ScansPerDay({
                date: new Date(new Date(new Date().setDate(new Date().getDate()-i)).toLocaleDateString()),
                numberOfScans: Math.floor(Math.random() * 100) + 1
            });
            const k = await novi.save()
            s.push(k)
        }
        res.send({s})
    });

    app.get("/test2",async (req, res) => {
        const novi = new ScansPerDay({
            date: new Date(new Date().toLocaleDateString()),
            numberOfScans: Math.floor(Math.random() * 100) + 1
        });
        const k = await novi.save()
        res.send({k})
    })

    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/admin', adminRouter);

    // Todo(ispravi)
    app.all('*', async (req: Request, res: Response) => {
        return res.status(404).json({ message: 'Invalid route' });
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        res.json({ message: err.message || "an unknown error occurred" });
    });

    return app;
};

export default initializeServer;