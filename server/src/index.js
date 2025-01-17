import {config} from 'dotenv'
import authRouter from '../routes/auth.route.js';
import messageRouter from '../routes/message.route.js';
import {connectDB} from '../lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import {app, server} from '../lib/socket.js';
import express from 'express';

const __dirname = path.resolve();

config();
connectDB();

// middlewares 
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({
  limit: '10mb'
}));
app.use(cookieParser());



// routers
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter)
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  })

}
const port = process.env.PORT || 8000; 
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


