import express from 'express';
import { PORT, mongodburl } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookmodel.js';
import booksroute from './routes/booksroute.js'
import cors from 'cors';

const app = express();
app.use(cors());
// Allow custom origins
// app.use(
//     cors({
//         origin: 'https://localhost:3000',
//         methods: ['GET', 'Post', 'Delete', 'Put'],
//         allowedHeaders: ['Content-Type']
//     })
// )
// for parsing 
app.use(express.json()); 

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Hi There');
})

app.use('/books', booksroute);

mongoose.connect(mongodburl, { })
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () =>{
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });