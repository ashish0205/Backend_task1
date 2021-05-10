const { validationResult } = require("express-validator");
const conn = require("../config/database");

const deltweet = async (req, res, next) => {
  try {
    conn.query(
      "DELETE  FROM tweet WHERE tweetid=?",
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
            message: "Tweet DELETED Successfully",
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
module.exports = deltweet;
