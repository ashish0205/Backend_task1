const conn = require("../config/database");

const likeTweet = async (req, res, next) => {
  try {
    let querys = `SELECT * FROM tweet WHERE tweetid=${+req.body
      .tweetid} And uid=${+req.body.uid}`;
    console.log(querys);

    conn.query(querys, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({
          status: false,
          message: "there are some error with query",
        });
      } else {
        if (results[0].status == "1") {
          let like = results[0].like;

          conn.query(
            `UPDATE tweet SET liketweet=${0},status=${"0"} where tweetid=${+req
              .body.tweetid}`,
            function (error, results, fields) {
              if (error) {
                res.json({
                  status: false,
                  message: "there are some error with dislike query",
                });
              } else {
                res.json({
                  message: "disliked successfully",
                });
              }
            }
          );
          // ;
        } else {
          //let like = results[0].like;

          let likequery = `UPDATE tweet SET liketweet=${1},status=${"1"} where tweetid=${+req
            .body.tweetid}`;
          console.log(likequery);
          conn.query(likequery, function (error, results, fields) {
            if (error) {
              res.json({
                status: false,
                message: "there are some error with like query",
              });
            } else {
              res.json({
                message: "liked successfully",
              });
            }
          });
        }
      }
    });
  } catch (err) {
    res.json({
      error: err,
      message: "there are errors",
    });
  }
};
module.exports = likeTweet;
