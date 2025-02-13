import express, { Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import transactionRoutes from './routes/transactionRoutes';

const app = express();


//Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes
// app.use('/api/transactions', transactionRoutes);


//Export app
export default app;