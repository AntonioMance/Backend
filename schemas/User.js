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
    gameList: {
        type: mongoose.SchemaTypes.Array,
        default: []
    },
    status: {
        type: mongoose.SchemaTypes.Number, 
        default: 4 
    },
    follow: {
        type: mongoose.SchemaTypes.Array, 
        default: [] 
    },
    availability: {
        type: [{
          start: String,
          end: String
        }],
        default: []
      },
    peoplePlayedWith: {
        type: Number,
        default: 0,
      },



});

module.exports = mongoose.model('User', User); //