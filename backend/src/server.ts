import * as dotenv from 'dotenv';

dotenv.config();

export const  PORT: number = parseInt(process.env.PORT || '5000', 10);
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const MONGO_URI = process.env.MONGO_URI  as string;


import connectDB from './config/db.js';
import app from './app.js';


//connect to MongoDB
connectDB();


//start the server
app.listen(PORT,(): void => {
    console.log(`Server running on port ${PORT}`);
})