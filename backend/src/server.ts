import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';

dotenv.config();


//connect to MongoDB
connectDB();


//start the server
const PORT: number = parseInt(process.env.PORT || '6000',10);

app.listen(PORT,(): void => {
    console.log(`Server running on port ${PORT}`);
})