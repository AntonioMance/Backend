const express = require('express');
const router = express.Router();
const Message = require('../schemas/Message');
const verify = require('../verify');


router.use(async (req, res, next) => {
    console.log(req.cookies);
    if (verify(req.cookies.email, req.cookies.loginToken, req.cookies.username)) {
        console.log("verified")
        next(); //
    } else {
        return;
    }    
});

router.post('/', async (req, res) => {
    let message = new Message();

    message.timestamp = new Date();
    message.roomNumber = req.body.roomNumber;
    message.sender = req.body.sender;

    console.log(req.cookies.username);

    if (!req.cookies.username) {
        message.author = "NOAUTHOR";
    } else {
        message.author = req.cookies.username;
    }
    message.content  = req.body.content;

    await message.save();
    return res.sendStatus(201);
});


router.get('/:roomNumber', async (req, res) => {
    let messages = await Message.find({ roomNumber: req.params.roomNumber });

    return res.status(200).json(messages);
});

module.exports = router;



