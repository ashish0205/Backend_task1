const { validationResult } = require("express-validator");
const conn = require("../config/database");

const updatetweet = async (req, res, next) => {
  const error = validationResult(req);

  if (!error) {
    return res.json({ status: 412, error: error.array() });
  }
  let tweetStr = req.body.tweet;
  if (tweetStr.trim() !== "" && tweetStr !== undefined) {
    try {
      console.log(req.body.tweetid);
      conn.query(
        "UPDATE tweet SET tweet=? WHERE tweetid=?",
        [
          req.body.tweet,
          +req.body.tweetid,
          "1",
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
              message: "Tweet updated Successfully",
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
module.exports = updatetweet;
