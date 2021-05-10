const { validationResult } = require("express-validator");
const conn = require("../config/database");

const tweet = async (req, res, next) => {
  const error = validationResult(req);
  console.log(req.body.uid);

  if (!error) {
    return res.json({ status: 412, error: error.array() });
  }
  let tweetStr = req.body.tweet;
  if (tweetStr.trim() !== "" && tweetStr !== undefined) {
    try {
      conn.query(
        "INSERT INTO tweet (tweet,uid,liketweet,status,created_at,updated_at) VALUES (?,?,?,?,?,?)",
        [
          req.body.tweet,
          +req.body.uid,
          0,
          "0",
          new Date().toISOString().slice(0, 19).replace("T", " "),
          new Date().toISOString().slice(0, 19).replace("T", " "),
        ],
        function (error, results, fields) {
          if (error) {
            console.log(error);
            res.json({
              status: false,
              message: "there are some error with query",
            });
          } else {
            res.json({
              status: 201,
              message: "Tweet done Successfully",
            });
          }
        }
      );
    } catch (err) {
      res.json({
        error: err,
      });
    }
  } else {
    return res.json({ status: 412, error: error.array() });
  }
};
module.exports = tweet;
