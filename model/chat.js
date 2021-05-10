const { validationResult } = require("express-validator");
const conn = require("../config/database");

const chat = async (req, res, next) => {
  const error = validationResult(req);

  let message = req.body.message;
  if (message.trim() !== "" && message !== undefined) {
    try {
      conn.query(
        "INSERT INTO chat (sender_id,reciever_id,message,status,created_at,updated_at) VALUES (?,?,?,?,?,?)",
        [
          +req.body.sender_id,
          +req.body.reciever_id,
          req.body.message,
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
              message: "success",
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
module.exports = chat;
