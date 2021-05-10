const { check } = require("express-validator");
const reg = require("../model/register");
const login = require("../model/SignIn");
const tweet = require("../model/tweet");
const likeTweet = require("../model/likeTweet");
const updatetweet = require("../model/updatetweet");
const deltweet = require("../model/deletetweet");
const read = require("../model/gettweet");
const retweet = require("../model/retweet");
const tweetThread = require("../model/tweetThread");
const chat = require("../model/chat");
const getChat = require("../model/getChat");
const router = require("express").Router();

router.post(
  "/Signup",
  [
    check("email", "Please enter a valid email")
      .not()
      .isEmpty()
      .escape()
      .isEmail(),
    check("password", "Please enter a valid password")
      .notEmpty()
      .trim()
      .isLength({
        min: 6,
      }),
  ],
  reg
);

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").notEmpty().escape().isEmail(),
    check("password", "Please enter a valid password")
      .notEmpty()
      .trim()
      .isLength({
        min: 6,
      }),
  ],
  login
);
router.post(
  "/tweet",
  [check("tweet", "please enter something to tweet").notEmpty().trim()],
  tweet
);
router.post(
  "/updatetweet",
  [check("tweet", "please enter something to tweet").not().isEmpty().trim()],
  updatetweet
);
router.post("/deletetweet", deltweet);
router.post("/readTweet", read);
router.post(
  "/retweet",
  [check("retweet", "please enter something to Re-tweet").notEmpty().trim()],
  retweet
);

router.post("/chat", [check("chat", "please enter something in  chat")], chat);

router.post("/getchat", getChat);

router.post("/liketweet", likeTweet);
router.post(
  "/tweetThread",
  [check("retweet", "please enter something to Re-tweet").notEmpty().trim()],
  tweetThread
);

module.exports = router;
