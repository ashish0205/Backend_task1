const { validationResult } = require("express-validator");
const conn = require("../config/database");

const gettweet = async (req, res, next) => {
  try {
    console.log(req.body.tweetid);
    conn.query(
      "SELECT * from tweet where tweetid=?",
      [+req.body.tweetid],
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
            data: results,
          });
        }
      }
    );
  } catch (err) {
    res.json({
      error: err,
    });
  }
};
module.exports = gettweet;
