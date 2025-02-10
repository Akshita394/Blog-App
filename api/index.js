import express from 'express'
import mongoose from 'mongoose';
import colors from "colors";
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'

dotenv.config();
mongoose.connect(
    process.env.MONGO
    )
    .then( () =>{
      console.log('Mongodb is connected'.bgMagenta.white);

    }).catch(err => {
        console.log(err)
    })


const app = express();


app.listen (3000,() => {
    console.log('server is running on port 3000'.bgCyan.white)
});

app.use('/api/user',userRoutes);