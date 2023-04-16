const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const users = require('./routes/Users');
const changeProfile = require('./routes/ChangeProfile');
const messages = require('./routes/Messages');
const UserProfiles = require('./routes/UserProfile')


const app = express();
const port = 3000;

const mongodb_uri = 'mongodb+srv://antonio:lARTE8CBkUUmauEw@webapps.pmcgye4.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(
    mongodb_uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.set('strictQuery', false);

app.use(cors({
    origin: 'https://webapps-frontend.onrender.com', 
    credentials: true,
}));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/app/users', users);
app.use('/app/users', changeProfile);
app.use('/app/messages', messages);   
app.use('/app/users', UserProfiles)  

                                  
app.listen(port, () => console.log(`Running on port ${port}`));