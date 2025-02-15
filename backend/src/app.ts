import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import transactionRoutes from './routes/transactionRoutes';
import authRoutes from './routes/authRoutes.js';

const app = express();


//Middleware
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

//Routes
// app.use('/transactions', transactionRoutes);
app.use('/auth', authRoutes);

//Export app
export default app;