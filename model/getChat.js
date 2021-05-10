const { validationResult } = require("express-validator");
const conn = require("../config/database");

const getChat = async (req, res, next) => {
  const error = validationResult(req);

  if (!error) {
    return res.json({ status: 412, error: error.array() });
  }

  try {
    conn.query(
      "SELECT * from chat WHERE sender_id=? OR reciever_id=?",
      [+req.body.uid],
      [+req.body.uid],
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
module.exports = getChat;
