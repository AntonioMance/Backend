const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const users = require('./routes/Users');
const changeProfile = require('./routes/ChangeProfile');


const app = express();
const port = 3000;

const mongodb_uri = 'mongodb+srv://antonio:lARTE8CBkUUmauEw@webapps.pmcgye4.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(
    mongodb_uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.set('strictQuery', false);

app.use(cors({
    origin: 'http://localhost:8080', 
    credentials: true,
}));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/app/users', users);
app.use('/app/users', changeProfile);   

                                  
app.listen(port, () => console.log(`Running on port ${port}`));