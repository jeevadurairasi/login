const express = require('express');
const Car = require('../models/car.model');

const router = express.Router();

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update car data
router.put('/:id', async (req, res) => {
  const carId = req.params.id;
  const updatedData = req.body;

  try {
    const car = await Car.findByIdAndUpdate(carId, updatedData, { new: true });
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car updated successfully', car });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Book a car
router.post('/book/:id', async (req, res) => {
  const carId = req.params.id;

  try {
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Update loyalty points and extra discount rides
    car.loyaltyPoints += 10; // Example: Add 10 points for each booking
    if (car.loyaltyPoints >= 25) {
      car.extraDiscountRides += 2; // Add 2 extra discount rides
      car.loyaltyPoints -= 25; // Deduct used points
    }

    await car.save();
    res.json({ message: `Car ${car.name} booked successfully!`, car });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;