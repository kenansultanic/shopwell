import express from "express";
import nodemailer from 'nodemailer';
import hbs, { NodemailerExpressHandlebarsOptions } from "nodemailer-express-handlebars";
import path from "path";
import User, { UserDocument } from "../../models/user.model";
import { formatDate } from "../functions";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dws.webshop@gmail.com',
        pass: 'jszoaanxkrgvxtlj'
    }
});

const handlebarOptions: NodemailerExpressHandlebarsOptions = {
    viewEngine: {
        extname: '.handlebars',
        layoutsDir: path.resolve('./src/utils/emails/templates/views'),
        partialsDir: path.resolve('./src/utils/emails/templates/partials'),
        defaultLayout: false
    },
    viewPath: path.resolve('./src/utils/emails/templates/views'),
    extName: '.handlebars'
};

transporter.use('compile', hbs(handlebarOptions));

export const sendPromoEmails = async ({ subject, title, body }, createdAt: Date, users: UserDocument[]) => {
    
    try {
        users.forEach(({ email, firstName, lastName }) => {
            const mailOptions = {
                from: 'dws.webshop@gmail.com',
                to: email,
                template: 'extra-emails',
                subject,
                context: {
                    title,
                    body,
                    createdAt: formatDate(createdAt),
                    fullName: firstName.concat(' ', lastName),
                    isRestartCode: false
                }
            };
        
            transporter.sendMail(mailOptions);
        });
    }
    catch (error) {
        return new Error(error);
    }
};

export const sendRestartCode = async ({ email, firstName, lastName }, code) => {
    const mailOptions = {
        from: 'dws.webshop@gmail.com',
        to: email,
        template: 'restart-code',
        subject: 'Password restart code',
        context: {
            code,
            title: 'Password restart',
            validMinutes: 15,
            createdAt: formatDate(new Date()),
            fullName: firstName.concat(' ', lastName),
            isRestartCode: true
        }
    };

    transporter.sendMail(mailOptions, error => {
        if (error)
            return new Error(error.message);
    });
};