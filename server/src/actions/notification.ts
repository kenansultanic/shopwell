import Notification from "../models/notification.model";

export const saveNotification = async ({ tag, content }) => {

    const notification = new Notification({ tag, content });

    return notification.save();
};