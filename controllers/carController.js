const fs = require("fs");

// read file json nya
const cars = JSON.parse(fs.readFileSync(`${__dirname}/../data/cars.json`));

// // Default
const defaultRouter = (req, res, next) => {
  res.status(200).json({
    message: "ping successfully",
  });
};

// Get all cars
const getCars = (req, res, next) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    totalData: cars.length,
    requestAt: req.requestTime,
    data: {
      cars,
    },
  });
};

module.exports = {
  defaultRouter,
  getCars,
};
