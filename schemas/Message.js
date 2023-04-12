const mongoose = require('mongoose');

const Message = new mongoose.Schema({
    sender: {
        type: mongoose.SchemaTypes.Boolean,
        required: true
    },
    author: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    content: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    roomNumber: {
        type: mongoose.SchemaTypes.Number,
        default: 0,
        required: true
    },
    timestamp: {
        type: mongoose.SchemaTypes.Date
    }
});

module.exports = mongoose.model('Message', Message);