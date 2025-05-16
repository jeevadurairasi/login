const mongoose = require('mongoose');
const dbConfig = require('../config/db.config');
const Car = require('../models/car.model');

// Connect to MongoDB
mongoose
  .connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Sample car data
const sampleCars = [
  {
    name: 'Car 1',
    image: './assets/suv6.jfif',
    model: 'Model 1',
    type: 'basic',
    rentalDetails: { pricePerKm: 10, discount: 20, perDayCost: 500 },
    details: 'Economical and fuel-efficient',
    gearType: 'manual',
  },
  {
    name: 'Car 2',
    image: './assets/suv1.jfif',
    model: 'Model 2',
    type: 'mid-range',
    rentalDetails: { pricePerKm: 12, discount: 25, perDayCost: 700 },
    details: 'Comfortable and spacious',
    gearType: 'automatic',
  },
  {
    name: 'Car 3',
    image: './assets/suv2.jfif',
    model: 'Model 3',
    type: 'high-end',
    rentalDetails: { pricePerKm: 15, discount: 30, perDayCost: 1000 },
    details: 'Luxury and high performance',
    gearType: 'automatic',
  },
];

// Insert sample cars into the database
Car.insertMany(sampleCars)
  .then(() => {
    console.log('Sample cars inserted successfully');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Error inserting sample cars:', err.message);
    mongoose.disconnect();
  });