import ScansPerDay from "../models/scans-per-day.model";

export const registerScan = async (dateString: string) => {

    const date = new Date(dateString);

    const day = await ScansPerDay.findOne({ date });

    if (!day) {
        const newDay = new ScansPerDay({ date, numberOfScans: 1 });
        await newDay.save();
    }
    else await ScansPerDay.updateOne({ date }, { $inc: { numberOfScans: 1 } });
};