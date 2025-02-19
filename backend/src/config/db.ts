import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log('MongoDB connected successfully');

    } catch (error) {
        console.error('MongoDB connection error:', (error as Error).message);
        process.exit(1);
    }
}

export default connectDB;