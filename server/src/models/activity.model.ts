import mongoose from "mongoose";

export interface ActivityDocument extends mongoose.Document {
    actionType: 'insert' | 'delete' | 'update',
    collectionName: string,
    timestampOfAction: Date,
    fullDocument: object
};

const ActivitySchema = new mongoose.Schema({
    actionType: {
        type: String,
        enum: ['insert', 'delete', 'update'],
        default: 'insert',
        required: true
    },
    collectionName: {
        type: String,
        required: true
    },
    timestampOfAction: {
        type: Date,
        required: true
    },
    fullDocument: {
        type: Object,
        required: true
    }
});

const Activity = mongoose.model<ActivityDocument>('activity', ActivitySchema);

export default Activity;