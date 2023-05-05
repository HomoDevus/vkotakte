import mongoose from "mongoose";
import express from 'express';
import { config } from 'dotenv';

const app = express();

config();

app.use(express.json()); //or use body-parser middleware to parse the JSON body from HTTP request

// Import Routes
import authRoute from './routes';

// Route Middlewares
app.use('/api', authRoute);

const port = process.env.PORT || 3000;
app.listen(port, function () {
    // Connect to DB
    const db = process.env.DB_HOST;

    if (!db) throw Error('Mongodb host is not specified');

    mongoose
      .connect(db)
      .then(() => console.log('Connected to mongodb'))
      .catch((err) => console.error('Mongodb connection error', err));

    console.log('Server running on localhost:' + port);
});
