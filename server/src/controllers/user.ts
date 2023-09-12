import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import RestrictionSuggestion from "../models/restrictions/restrictionSuggestion.model";
import Restriction from "../models/restrictions/restriction.model";

export const changePassword = async (req: Request, res: Response) => {
    
    try {
        const _id = req.cookies.user?._id;
        const { oldPassword, newPassword } = req.body;

        if (!_id)
            return res.status(400).json({ message: 'Missing user cookie' });

        const user = await User.findOne({ _id });
        
        if (!user)
            return res.status(400).json({ message: 'User does not exist' });
        
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch)
            return res.status(400).json({ message: 'Invalid password' });

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(newPassword, salt);

        const updated = await User.updateOne({ _id }, { $set: { password: passwordHash } });

        res.status(200).json({ updated });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUserInfo = async (req: Request, res: Response) => {

    try {
        const updated = await User.findOneAndUpdate(
            { _id: req.params.id }, 
            { $set: { ...req.body } }, 
            { returnDocument: 'after' }
        );

        if (updated) {
            updated.password = 'null';
            return res.status(200).json({ updated });
        }
        
        res.status(304).json({ message: 'User info not modified' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const allowExtraEmails = async (req: Request, res: Response) => {

    const { allow, id: _id } = req.body;

    try {
        const updated = await User.findOneAndUpdate(
            { _id },
            { $set: { allowExtraEmails: allow } }, 
            { returnDocument: 'after' }
        );

        if (updated) {
            updated.password = 'null';
            return res.status(200).json({ updated });
        }
        
        res.status(304).json({ message: 'User info not modified' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRestrictions = async (req: Request, res: Response) => {

    try {
        const restrictions = await Restriction.find({});
       
        res.status(200).json({ restrictions });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUsersRestrictions = async (req: Request, res: Response) => {

    try {
        const { key } = req.params;

        if (!['allergy', 'religious', 'intolerance'].includes(key))
            return res.status(404).json({ message: 'No such collection of data' });

        let collectionToUpdate: {};

        if (key === 'allergy')
            collectionToUpdate = { 'dietaryRestrictions.allergies': req.body.data };
        else if (key === 'religious')
            collectionToUpdate = { 'dietaryRestrictions.religious': req.body.data };
        else collectionToUpdate = { 'dietaryRestrictions.intolerances': req.body.data };

        const updated = await User.findOneAndUpdate(
            { _id: req.cookies.user._id }, 
            { $set: collectionToUpdate },
            { returnDocument: 'after' }
        );

        if (updated)
            return res.status(200).json({ updated });
        
        res.status(304).json({ message: 'User info not modified' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const suggestNewRestriction = async (req: Request, res: Response) => {

    const { name, type, description } =  req.body;

    const suggestion = new RestrictionSuggestion({
        name,
        type,
        description
    });

    try {
        const newSuggestion = await suggestion.save();
        res.status(201).json({ newSuggestion });
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
};