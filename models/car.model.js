const mongoose = require('mongoose');

// Define the schema for rental details
const rentalDetailsSchema = mongoose.Schema({
  pricePerKm: { type: Number, required: true },
  discount: { type: Number, required: true },
  perDayCost: { type: Number, required: true },
});

// Define the schema for cars
const carSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  model: { type: String, required: true },
  type: { type: String, enum: ['basic', 'mid-range', 'high-end'], required: true },
  rentalDetails: { type: rentalDetailsSchema, required: true },
  details: { type: String, required: true },
  gearType: { type: String, enum: ['manual', 'automatic'], required: true },
});

// Create and export the Car model
module.exports = mongoose.model('Car', carSchema);