import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    }
});

export default mongoose.model('religious', dataSchema);