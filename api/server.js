require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose").set("debug", true);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
const path = require("path");
const User = require("./model.js");
const Data = require("./test.js");

/* Initial CORS before boyParser*/
app.options("*", cors());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000"
  })
);
app.use(bodyParser.json()); // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
/* Connect to Mongo DB*/
mongoose
  .connect(process.env.MONGO_URI || process.env.MONGO_LOCAL, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

/* Serve static file if in production*/
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "build/index.html"));
  });
}

/* Get all dump data*/
app.get("/api/board", async (req, res) => {
  let data = await Data.find();
  if (!data) {
    res.status(400).send({ message: "Cant get data" });
  } else {
    return await res.json(data);
  }
});
/* Login route*/
app.post("/api/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let emailSplit = email.split("@");
    let username = emailSplit[0];
    let user = await User.findOne({ email: email }).exec();
    if (!user) {
      return res.status(400).send({ message: "Email does not exist" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({ message: "The password is invalid" });
    }
    if (user) {
      let token_payload = { email: user.email, password: user.password };
      let token = jwt.sign(token_payload, "jwt_secrect_password", {
        expiresIn: "2h"
      });
      let response = {
        username,
        message: "Token created ,Authentication Successfull",
        token
      };
      return res.status("200").json(response);
    } else {
      return res
        .status("409")
        .json("Authentication failed.Please contact admin");
    }
  } catch (err) {
    console.log(err);
  }
});
/* Sign up route*/
app.post("/api/signup", async (req, res) => {
  try {
    let { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const isExistEmail = await User.findOne({ email: email }).exec();
    if (isExistEmail)
      return res.json({ statusCode: 400, message: "Email does exist" });
    password = await bcrypt.hash(password, salt);
    let user = new User({
      email,
      password
    });
    await user.save((err, result) => {
      console.log("Result Sign up", result);
    });
    res.status(200).json({ statusCode: 200, message: "Sigup Success" });
  } catch (err) {
    console.log("Error from try/catch signup", err);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("api runnging on port " + PORT + ": "));
