import mongoose from "mongoose";

export interface ScansPerDayDocument extends mongoose.Document {
    date: Date,
    numberOfScans: number
};

const ScansPerDaySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    numberOfScans: {
        type: Number,
        required: true
    }
});

const ScansPerDay = mongoose.model<ScansPerDayDocument>('scans_per_day', ScansPerDaySchema);

export default ScansPerDay;