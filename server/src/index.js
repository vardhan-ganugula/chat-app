import express from 'express';
import {config} from 'dotenv'
import authRouter from '../routes/auth.route.js';
import messageRouter from '../routes/message.route.js';
import {connectDB} from '../lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();


config();
connectDB();

// middlewares 
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// routers
app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter)

const port = process.env.PORT || 8000; 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


