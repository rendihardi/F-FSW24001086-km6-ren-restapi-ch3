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

// Update Data Car
const updateCar = (req, res) => {
  const id = req.params.id;

  // 1. search car sesuai id
  const car = cars.find((carSearch) => carSearch.id === id);
  const carIndex = cars.findIndex((carSearch) => carSearch.id === id);

  // 2. cek data car
  if (!car) {
    return res.status(404).json({
      status: "fail",
      message: `car dengan ID : ${id} gak ada`,
    });
  }
  // 3.  object assign = menggabungkan objek OR spread operator
  cars[carIndex] = { ...cars[carIndex], ...req.body };

  // 4. melakukan update di dokumen json nya
  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(200).json({
      status: "success",
      message: "berhasil update data",
    });
  });
};

module.exports = {
  defaultRouter,
  getCars,
  getCarById,
  createCar,
  updateCar,
};
