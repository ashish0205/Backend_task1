const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const signup = require("./routes/routes");

const app = express();

// PORT
const PORT = process.env.PORT || 4000;
app.use(cors());
// Middleware
app.use(bodyparser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});
app.use("/user", signup);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
