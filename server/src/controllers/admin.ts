import { Request, Response } from "express";
import { Types } from "mongoose";
import User, { UserDocument } from "../models/user.model";
import Product, { ProductDocument } from "../models/product.model";
import ProductReview, { ProductReviewDocument } from "../models/productReview.model";
import RestrictionSuggestion, { RestrictionSuggestionDocument } from "../models/restrictions/restrictionSuggestion.model";
import Restriction, { RestrictionDocument } from "../models/restrictions/restriction.model";
import Allergy from "../models/restrictions/allergy.model";
import Religious from "../models/restrictions/religious.model";
import Intolerance from "../models/restrictions/intolerance.model";
import { Model } from "mongoose";
import { dataUriFormatter, getResourceModel } from "../utils/functions";
import { sendPromoEmails as sendEmails } from "../utils/emails/email";
import uploadImage from "../utils/cloudinary";
import { UploadedFile } from "adminjs";

//type MongooseModel = Model<UserDocument | ProductDocument | ProductReviewDocument | RestrictionDocument | RestrictionSuggestionDocument> | null;

type UserMongooseModel = typeof User & Model<UserDocument>;
type ProductMongooseModel = typeof Product & Model<ProductDocument>;
type ProductReviewMongooseModel = typeof ProductReview & Model<ProductReviewDocument>;
type RestrictionMongooseModel = typeof Restriction & Model<RestrictionDocument>;
type RestrictionSuggestionMongooseModel = typeof RestrictionSuggestion & Model<RestrictionSuggestionDocument>;

type MongooseModel =
  | UserMongooseModel
  | ProductMongooseModel
  | ProductReviewMongooseModel
  | RestrictionMongooseModel
  | RestrictionSuggestionMongooseModel
  | null;

export const getUsers = async (req: Request, res: Response) => {
    
    const { page, limit, loaded } = req.query;

    try {
        const startIndex = loaded; // index of the first review of a page
        const total = await User.countDocuments({}); // Total number of reviews

        const users = await User.find({}).sort({ _id: -1 }).limit(Number(limit)).skip(Number(loaded));

        res.status(200).json({ users, total: Math.ceil(total / Number(limit)) });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getResources = async (req: Request, res: Response) => {

    const { resourceType } = req.params;
    const { page, limit, loaded } = req.query;

    try {
        let model: any = getResourceModel(resourceType);
    
        if (!model)
            return res.status(404).json({ message: 'Requested resource doesn\'t exist' });
    
        const total = await model.countDocuments({});    
        const resources = await model.find({}).sort({ _id: -1 }).limit(Number(limit)).skip(Number(loaded));

        res.status(200).json({ resources, total: Math.ceil(total / Number(limit)) });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getResource = async (req: Request, res: Response) => {

    const { resourceType, id } = req.params;

    try {
        const model: any = getResourceModel(resourceType);

        if (!model)
            return res.status(404).json({ message: 'Requested resource doesn\'t exist' });
        
        if (!Types.ObjectId.isValid(id))
            return res.status(422).json({ message: 'Invalid ID format' });

        const resource = await model.findOne({ _id: id });

        if (!resource)
            return res.status(404).json({ message: 'Requested resource not found' });

        res.status(200).json({ resource });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const saveResource = async (req: Request, res: Response) => {
    
    const { resourceType } = req.params;

    try {
        const ResourceModel: MongooseModel = getResourceModel(resourceType);

        if (!ResourceModel)
            return res.status(404).json({ message: 'Requested resource doesn\'t exist' });


        let uploaded_image: any;

        if (req.files?.image) {

            // @ts-ignore
            const file = dataUriFormatter(req.files.image?.name, req.files.image?.data);

            if (!file)
                return res.status(510).json({ error: 'Server could not upload image' });

            uploaded_image = await uploadImage(file);
        }

        if (uploaded_image)
            req.body.imageURL = uploaded_image.secure_url;

        const resource = new ResourceModel({ ...req.body })    
        const newResource = await resource.save();

        res.status(201).json({ resource: newResource });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editResource = async (req: Request, res: Response) => {

    const { resourceType, id } = req.params;

    try {
        const ResourceModel: MongooseModel = getResourceModel(resourceType);

        if (!ResourceModel)
            return res.status(404).json({ message: 'Requested resource doesn\'t exist' });//ili 304 not modified

        // @ts-ignore    
        const resource = await ResourceModel.findOneAndUpdate({ _id: id }, { $set: { ...req.body } }, { new: true });

        if (!resource)
            return res.status(404).json({ message: 'No item with that id exists' });

        res.status(200).json({ resource });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteResource = async (req: Request, res: Response) => {

    const { resourceType } = req.params;
    const { ids } = req.query;

    if (!ids || typeof ids !== 'string')
        return res.status(400).json({ message: 'ID\'s are a required parameter and must be of type string' });

    const _ids = ids.split(',');

    try {
        const ResourceModel: MongooseModel = getResourceModel(resourceType);

        if (!ResourceModel)
            return res.status(404).json({ message: 'Requested resource doesn\'t exist' });

        // @ts-ignore    
        const deleted = await ResourceModel.deleteMany({ _id: { $in: _ids } });
        
        res.status(200).json({ deleted });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const sendPromoEmails = async (req: Request, res: Response) => {

    try {
        const users = await User.find({ allowExtraEmails: true });

        const error = await sendEmails(req.body, new Date(), users);

        if (error)
            res.status(500).json({ error: 'Could not send Emails' });

        res.sendStatus(200);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};