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

app.post("/api/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let emailSplit = email.split('@');
    let username = emailSplit[0];
    let user = await User.findOne({ email: email, password: password });
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

//TODO: signup

app.post('/api/signup', async (req, res) => {
  try {
    let {email, password} = req.body;
    let user = new User({
      email,
      password
    });
    await user.save((err, result) => {
      console.log(result);
    });
    res.status(200).json("ÖK");
  }

  catch(err) {
    console.log('Error from try/catch signup',err)
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log("api runnging on port " + PORT + ": "));
