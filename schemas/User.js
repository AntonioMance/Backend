const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    loginToken: {
        type: mongoose.SchemaTypes.String,
    },
    


});

module.exports = mongoose.model('User', User); //