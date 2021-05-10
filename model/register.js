const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const conn = require("../config/database");

const register = async (req, res, next) => {
  const error = validationResult(req);

  if (!error) {
    return res.json({ status: 412, error: error.array() });
  }
  try {
    const pass = await bcrypt.hash(req.body.password, 12);
    conn.query(
      "SELECT * from user WHERE username=?",
      [req.body.username],
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({
            status: false,
            message: "there are some error with query",
          });
        } else {
          res.json({
            message: "Email id already exists",
          });
        }
      }
    );
    let uname = req.body.username;
    if (uname.trim() !== "" && uname !== undefined) {
      conn.query(
        "INSERT INTO user (username,password,status,created_at,updated_at) VALUES (?,?,?,?,?)",
        [req.body.username, pass, " 1", Date.now(), Date.now()],
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
              message: "User Registered Successfully",
            });
          }
        }
      );
    } else {
      return res.json({ status: 412, error: error.array() });
    }
  } catch (err) {
    next(err);
  }
};
module.exports = register;
