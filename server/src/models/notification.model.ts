import mongoose from "mongoose";

export interface NotificationDocument extends mongoose.Document {
    tag?: string,
    content: string,
    createdAt: Date
};

const NotificationSchema = new mongoose.Schema({
    tag: {
        type: String
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: true, updatedAt: false } });

const Notification = mongoose.model<NotificationDocument>('notification', NotificationSchema);

export default Notification;