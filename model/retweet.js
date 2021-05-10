const { validationResult } = require("express-validator");
const conn = require("../config/database");

const retweet = async (req, res, next) => {
  const error = validationResult(req);
  console.log(req.body.parenttweetid);
  if (!error) {
    return res.json({ status: 412, error: error.array() });
  }
  let rTweet = req.body.retweet;
  if (rTweet.trim() !== "" && rTweet !== undefined) {
    try {
      conn.query(
        "INSERT INTO retweet (retweet,status,created_at,updated_at,parenttweetid) VALUES (?,?,?,?,?)",
        [
          req.body.retweet,
          "1",
          new Date().toISOString().slice(0, 19).replace("T", " "),
          new Date().toISOString().slice(0, 19).replace("T", " "),
          +req.body.parenttweetid,
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
              message: "Retweeted  Successfully",
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
module.exports = retweet;
