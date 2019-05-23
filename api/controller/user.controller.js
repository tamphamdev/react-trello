const jwt = require("jsonwebtoken");
const User = require("../model/user");
const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      let user = await User.findOne({ email: email });
      if (!user) {
        console.log("Log user in login: ", user);
        return res.send({ statusCode: 400, message: "Email does not exist" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.send({
          statusCode: 400,
          message: "The password is invalid"
        });
      }
      let emailSplit = email.split("@");
      let username = emailSplit[0];
      if (user) {
        let token_payload = { email: user.email, password: user.password };
        let token = jwt.sign(token_payload, process.env.JWT_SECRET_KEY, {
          expiresIn: "2h"
        });
        let response = {
          username,
          message: "Token created ,Authentication Successfull",
          token
        };
        return res.status("200").json(response);
      } else {
        return res.json({
          statusCode: 400,
          message: "Authentication failed.Please contact admin"
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  /* Sign up route*/
  signup: async (req, res) => {
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
  }
};
