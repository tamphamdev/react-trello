const express = require("express");
const router = express.Router();
const indexController = require("../controller/data.controller");

router.route("/board").get(indexController.board);

module.exports = router;