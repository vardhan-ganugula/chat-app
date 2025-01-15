import express from 'express';
import {config} from 'dotenv'
import authRouter from '../routes/auth.route.js';
import {connectDB} from '../lib/db.js';
const app = express();


config();
connectDB();

// middlewares 

app.use(express.json());

// routers
app.use('/api/auth', authRouter);



const port = process.env.PORT || 8000; 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


