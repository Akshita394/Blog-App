import express from 'express'
import mongoose from 'mongoose';
import colors from "colors";
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose
    .connect(
    process.env.MONGO
    )
    .then( () =>{
      console.log('Mongodb is connected'.bgMagenta.white);

    }).catch(err => {
        console.log(err)
    })


const app = express();

app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json());



app.listen (3000,() => {
    console.log('server is running on port 3000!'.bgCyan.white)
});



app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})