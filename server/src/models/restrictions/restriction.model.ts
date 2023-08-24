import mongoose from "mongoose";

export interface RestrictionDocument extends mongoose.Document {
    name: string,
    type: 'allergy' | 'religious' | 'restriction'
};

const RestrictionSchema = new mongoose.Schema({
    name: {
        required: true,
        unique: true,
        type: String
    },
    type: {
        required: true,
        type: String,
        enum: ['allergy', 'religious', 'intolerance'],
        default: 'allergy'
    }
});

const Restriction = mongoose.model<RestrictionDocument>('restriction', RestrictionSchema);

export default Restriction;