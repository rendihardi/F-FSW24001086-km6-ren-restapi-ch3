const express = require("express");

const router = express.Router();

const carController = require("../controllers/carController");

router.route("/").get(carController.defaultRouter);
router.route("/cars").get(carController.getCars).post(carController.createCar);
router.route("/cars/:id").get(carController.getCarById);

module.exports = router;
