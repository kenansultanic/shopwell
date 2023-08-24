import mongoose from "mongoose";

export interface RestrictionSuggestionDocument extends mongoose.Document {
    name: string,
    type: 'allergy' | 'religious' | 'intolerance',
    description: string
};

const RestrictionSuggestionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['allergy', 'religious', 'intolerance'],
        default: 'allergy',
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

const RestrictionSuggestion = mongoose.model<RestrictionSuggestionDocument>('restrictionSuggestion', RestrictionSuggestionSchema);

export default RestrictionSuggestion;