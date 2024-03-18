const express = require("express");

const router = express.Router();

const carController = require("../controllers/carController");

router.route("/").get(carController.defaultRouter);
router.route("/cars").get(carController.getCars);

module.exports = router;
