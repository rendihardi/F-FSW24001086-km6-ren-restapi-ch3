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

// Get Car by id
const getCarById = (req, res, next) => {
  const id = req.params.id;
  // menggunakan array method utk membantu menemukan spesifik data
  const car = cars.find((carSearch) => carSearch.id === id);
  res.status(200).json({
    status: "success",
    data: {
      car,
    },
  });
};

// Creat new Data Car
const createCar = (req, res) => {
  const newCar = req.body;
  cars.push(newCar);

  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        car: newCar,
      },
    });
  });
};

module.exports = {
  defaultRouter,
  getCars,
  getCarById,
  createCar,
};
