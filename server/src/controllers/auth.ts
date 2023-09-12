import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import { generateCode } from "../utils/functions";
import { sendRestartCode } from "../utils/emails/email";

export const register = async (req: Request, res: Response) => {

    const { withGoogle, email, firstName, lastName, password, allowExtraEmails, picture } = req.body;

    //const salt = await bcrypt.genSalt();
    //const passwordHash = await bcrypt.hash(password, salt);

    if (!email || !firstName || !lastName || (!withGoogle && !password))
        return res.status(422).json({ message: 'Missing one or more required parameters' });

    let userFields: {};

    if (withGoogle)
        userFields = { email, firstName, lastName, picture };
    else userFields = { email, firstName, lastName, password, allowExtraEmails };

    const user = new User({ ...userFields });

    try {
        const newUser = await user.save();

        const accessToken = jwt.sign({ ...newUser }, process.env.JWT_SECRET!, { expiresIn: '30m' });
        const refreshToken = jwt.sign({ ...newUser }, process.env.JWT_SECRET!, { expiresIn: '5d' });

        res.cookie('user', newUser, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 5*24*60*60*1000 });

        res.status(201).json({ user: newUser, accessToken, refreshToken });
    }
    catch (error) {

        // Email already in use
        if (error.code === 11000)
            return res.status(409).json({ message: 'Email already in use' });

        // Password too weak
        if (error.errors?.password)
            return res.status(409).json({ message: 'Weak password' });

        res.status(500).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    if (!email || !password)
        return res.status(422).json({ message: 'Missing one or both parametars'});

    if (typeof email !== 'string' || typeof password !== 'string')
        return res.status(422).json({ message: 'Parameters must be of type string' });

    try {
        const user = await User.findOne({ email }).lean();

        if (!user)
            return res.status(400).json({ message: 'User does not exist' });
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(400).json({ message: 'Invalid password' });

        user.password = 'null';

        const accessToken = jwt.sign({ ...user }, process.env.JWT_SECRET!, { expiresIn: '30m' });
        const refreshToken = jwt.sign({ ...user }, process.env.JWT_SECRET!, { expiresIn: '5d' });

        res.cookie('user', user, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 5*24*60*60*1000 });
        res.status(200).json({ accessToken, refreshToken, user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const googleLogin = async (req: Request, res: Response) => {
    
    const { email } = req.body;

    if (!email)
        return res.status(422).json({ message: 'Missing email'});

    if (typeof email !== 'string')
        return res.status(422).json({ message: 'Email must be of type string' });

    try {
        const user = await User.findOne({ email }).lean();
        
        if (!user)
            return res.status(400).json({ message: 'User does not exist' });

        user.password = 'null';

        const accessToken = jwt.sign({ ...user }, process.env.JWT_SECRET!, { expiresIn: '30m' });
        const refreshToken = jwt.sign({ ...user }, process.env.JWT_SECRET!, { expiresIn: '5d' });

        res.cookie('user', user, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 5*24*60*60*1000 });
        res.status(200).json({ accessToken, refreshToken, user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const newAccesToken = async (req: Request, res: Response) => {

    const { refreshToken } = req.body;

    jwt.verify(refreshToken, process.env.JWT_SECRET!, (error: any, decoded: any) => {
            
            if (error) 
                return res.sendStatus(403); // Invalid token
                                        // bilo user: decoded 

            const { iat, exp, ...rest } = decoded;
            
            const accessToken = jwt.sign({ ...rest }, process.env.JWT_SECRET!, { expiresIn: '30m' });    
           
            res.status(200).json({ accessToken });
        }
    );
};

// Sends password restart code to email
export const sendCode = async (req: Request, res: Response) => {

    if (!req.user?.email)
        return res.status(404).json({ message: 'Email not in use' });

    const code = generateCode();

    try {
        sendRestartCode(req.user, code);

        const salt = await bcrypt.genSalt();
        const codeHash = await bcrypt.hash(code, salt);

        // Valid for 15 minutes
        res.cookie('restartCodeHashed', codeHash, { maxAge: 1000*60*15 });
        res.status(200).json({ email: req.user.email });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const restartPassword = async (req: Request, res: Response) => {

    const { code, password, email } = req.body;

    try {
        const isMatch = await bcrypt.compare(code, req.cookies?.restartCodeHashed);

        if (!isMatch)
            return res.status(400).json({ message: 'Incorrect code' });
    
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const updated = await User.updateOne({ email }, { $set: { password: passwordHash } });
        //TESTIRAJ
        if (!updated.acknowledged)
            return res.status(304).json({ message: 'Password not modified' });

        res.clearCookie('restartCodeHashed');
        res.status(200).json({ updated });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};