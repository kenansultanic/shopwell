import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

config();

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith('Bearer '))
            return res.sendStatus(401); // No token

        const token = authHeader.split(' ')[1];

        jwt.verify(
            token,
            process.env.JWT_SECRET!,
            (error, decoded) => {
                
                if (error)
                    return res.sendStatus(401); // Invalid token

                req.user = decoded;

                next();
            }
        );
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const findUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    
    const { email } = req.query;

    try {
        const user = await User.findOne({ email });

        req.user = user;

        next();
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {

    const { user } = req.user;
    //console.log(req.user)
    // Checks if the decoded JWT belongs to an admin
    if (!user?.isAdmin)
        return res.sendStatus(403);

    next();
};