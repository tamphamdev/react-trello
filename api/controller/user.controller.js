const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();
const salt = bcrypt.genSaltSync(10);
module.exports = {
  /*Login controller */
  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      let user = await User.findOne({ email: email });
      if (!user) {
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

  /* Sign up controller*/
  signup: async (req, res) => {
    try {
      let { email, password } = req.body;

      const isExistEmail = await User.findOne({ email: email }).exec();
      if (isExistEmail)
        return res.json({ statusCode: 400, message: "Email does exist" });
      password = await bcrypt.hash(password, salt);
      let user = new User({
        email,
        password
      });
      await user.save((err, result) => {
        res.status(200).json({ statusCode: 200, message: "Sigup Success" });
      });
    } catch (err) {
      console.log("Error from try/catch signup", err);
    }
  },

  /* send mail to user */
  resetPassword: async (req, res) => {
    let { email } = req.body;
    let user = await User.findOne({ email: email }).exec();

    if (!user)
      return res.json({ statusCode: 400, message: "Account does not exist" });
    const token = crypto.randomBytes(20).toString("hex");

    await user.updateOne({
      resetPasswordToken: token,
      resetPasswordExpired: Date.now() + 360000
    });

    const transporter = await nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: "testdev588@gmail.com",
        pass: "cocaimatkhaucungphaisuynghi"
      },
      tls: true
    });

    const mailOptions = {
      from: `${process.env.EMAIL}`,
      to: `${email}`,
      subject: "Link to reset password",
      text: `${process.env.base_URL}/confirm-password/${token}`
    };

    await transporter.sendMail(mailOptions, (err, info) => {
      let message;
      if (err) {
        return res.json({ statusCode: 400, message: err });
      } else {
        message = info.response;
      }
      return res.json({
        statusCode: 200,
        message: "Email recovery password was send"
      });
    });
    transporter.close();
  },
  // get token from url params
  reset: async (req, res) => {
    let user = await User.findOne({
      resetPasswordToken: req.query.resetPasswordToken,
      resetPasswordExpired: {
        $gt: Date.now()
      }
    });

    if (!user) {
      res.json({
        statusCode: 400,
        message: "Password reset link in invalid or has expired"
      });
    } else {
      res
        .status(200)
        .json({ statusCode: 200, message: "Password reset link ok" });
    }
  },

  // update password
  updatePassword: async (req, res) => {
    try {
      let {
        values: { password },
        key
      } = req.body;
      let user = await User.findOne({
        resetPasswordToken: key
      });
      let hashPassword = await bcrypt.hash(password, salt);
      if (!user) {
        res.json({
          statusCode: 400,
          message: "Update failed please try again"
        });
      } else {
        await user.updateOne({ password: hashPassword });
      }
      res.json({ statusCode: 200, message: "Update password successfull !!!" });
    } catch (error) {
      console.log("Error when update password", error);
    }
  }
};
