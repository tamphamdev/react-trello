const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.route("/login").post(userController.login);
router.route("/signup").post(userController.signup);
router.route("/reset-password").post(userController.resetPassword);
router.route('/reset/:token').get(userController.reset);
router.route('/update-password').put(userController.updatePassword);

module.exports = router;
