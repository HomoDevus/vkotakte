const express = require('express');
const app = express();
import { config } from 'dotenv';

config();

app.use(express.json()); //or use body-parser middleware to parse the JSON body from HTTP request

// Import Routes
import authRoute from './routes';

// Route Middlewares
app.use('/api', authRoute);

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server running on localhost:' + port);
});
