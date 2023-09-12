import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    picture?: string,
    allowExtraEmails: boolean,
    dietaryReatrictions: {
        allergies: string[],
        religious: string[],
        intolerances: string[]
    },
};

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 40
    },
    password: {
        type: String,
        //required: true,
        validate: {
            validator: (v: string) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/.test(v),
            message: 'Password too weak'
        }
    },
    picture: {
        type: String
    },
    allowExtraEmails: {
        type: Boolean,
        default: false
    },
    dietaryRestrictions: {
        allergies: [{
            type: String
        }],
        religious: [{
            type: String
        }],
        intolerances: [{
            type: String
        }]
    }
});

UserSchema.pre<UserDocument>('save', function (next) {

    const user = this;

    if (!user.isModified('password'))
        return next();

    bcrypt.genSalt(10, (err, salt) =>{
        if (err)
            return next(err);
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error)
                return next(err);
            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model<UserDocument>('user', UserSchema);

export default User //mongoose.model('user', dataSchema);