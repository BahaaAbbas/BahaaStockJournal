import * as dotenv from 'dotenv';

dotenv.config();


import connectDB from './config/db.js';
import app from './app.js';
import { PORT } from './config/Config.js';


//connect to MongoDB
connectDB();


//start the server
app.listen(PORT, (): void => {
    console.log(`Server running on port ${PORT}`);
})