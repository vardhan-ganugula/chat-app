import mongoose from 'mongoose';
import { config } from 'dotenv';
config();



export async function connectDB(){
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/chat-appp';
    try{
        const connect = await mongoose.connect(mongoURI)
        console.log('Connected to database');
    }catch(err){
        console.log('Error connecting to database');
        console.log(err);
    }
} 