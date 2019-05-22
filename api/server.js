require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose").set("debug", true);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const data = require("./data");
const cors = require("cors");
const app = express();
const path = require("path");
const User = require("./model.js");
const Data = require("./test.js");
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
// app.options("*", cors());

// app.use(
//   cors({
//     credentials: true,
//   })
// );
app.use(bodyParser.json()); // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
/* Connect to Mongo DB*/
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

/* Serve static file if in production*/
if (process.env.NODE_ENV === "production") {
  app.use(express.static("/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

/* Get all dump data*/

app.get("/api/board", async (req, res) => {
  let data = await Data.find();
  if (!data) {
    res.status(400).send({ message: "Cant get data" });
  } else {
    console.log("Get data", data);
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
    password = await bcrypt.hash(password, salt);
    let user = new User({
      email,
      password
    });
    await user.save((err, result) => {
      console.log(result);
    });
    res.status(200).json("ÖK");
  } catch (err) {
    console.log("Error from try/catch signup", err);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("api runnging on port " + PORT + ": "));
