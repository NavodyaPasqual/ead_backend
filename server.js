const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const application = express();

//import routes
const authRoute = require('./src/routes/userLoginRegiRoutes');
const postRoute = require('./src/routes/userProfileRoutes');
dotenv.config();

const PORT = process.env.PORT || 8081;

/**
 * Get MONGODB_URI from .env
 */

const MONGODB_URI = process.env.MONGODB_URI;

//connect to DB
mongoose.connect(
    process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
},
    () => {
    console.log('DB Connected...');
    console.log('######################################################');
    }
);

application.get('/', (req, res) => {
    res.send('Welcome to Enviro Mart!');
})

//Middleware
application.use(express.json());
//Route middleware
application.use('/api/user', authRoute);
application.use('/api/user/profile', postRoute);

application.listen(8081, () => {
    console.log('######################################################');
    console.log(`Server is ON and running on PORT : ${PORT}`);
    console.log('...Wait DB connecting...');
});

