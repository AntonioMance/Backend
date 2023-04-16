const express = require("express");
const router = express.Router();
const User = require("../schemas/User");
const verify = require('../verify');

router.use(async (req, res, next) => {
    console.log(req.cookies);
    if (verify(req.cookies.email, req.cookies.loginToken, req.cookies.username)) {
        console.log("verified")
        next(); 
    } else {
        return;
    }    
});
  router.get("/getGames/:username", async (req, res) => {
    let user = await User.findOne({ username: req.params.username });
    let gameList
    console.log(user)
    try {
        console.log(user.gameList)
        gameList = user.gameList; 
    } catch (error) {
        console.log("ne postoji lista")
    }
    if (gameList) {
        return res.status(200).json(gameList);
    } else {
        return res.sendStatus(404); 
    }
    
});


router.post("/AddStatus", async (req, res) => {
    let user = await User.findOne({ email: req.cookies.email });
    user.status = req.body.status; 
    await user.save();
    return res.sendStatus(200);
});

router.get("/Getstatus/:username", async (req, res) => {
    let user = await User.findOne({ username: req.params.username });
    if (user) {
        return res.status(200).json({ status: user.status });
    } else {
        return res.sendStatus(404);
    }
});
router.get("/getFollowList/:username", async (req, res) => {
    let user = await User.findOne({ username: req.params.username });
  
    if (user) {
      return res.status(200).json(user.follow);
    } else {
      return res.sendStatus(404);
    }
  });
  
 router.get("/getAvailability/:username", async (req, res) => {
    let user = await User.findOne({ username: req.params.username });
    if (user) {
      return res.status(200).json(user.availability);
    } else {
      return res.sendStatus(404);
    }
  });

  router.get("/getPeoplePlayedWith/:username", async (req, res) => {
    let user = await User.findOne({ username: req.params.username });
    if (user) {
      return res.status(200).json({ peoplePlayedWith: user.peoplePlayedWith });
    } else {
      return res.sendStatus(404);
    }
  });
module.exports = router;