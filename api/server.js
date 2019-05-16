require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose").set("debug", true);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const data = require("./data");
const cors = require("cors");
const app = express();
const User = require("./model.js");
app.options("*", cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json()); // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.get("/api/board", (req, res) => {
  return res.json(data);
});

// TODO: signup + login
app.post("/api/login", async (req, res) => {
  console.log(req.body);
  let { email, password } = req.body;
  let findUser = await User.findOne({ email: email });
  if (!findUser) {
    return res.status("409").json("Authentication failed.Please contact admin");
  } else {
    return res.status("200").json("OK Babe");
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log("api runnging on port " + PORT + ": "));
