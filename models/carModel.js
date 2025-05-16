const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  model: { type: String, required: true },
  type: { type: String, enum: ['basic', 'mid-range', 'high-end'], required: true },
  rentalDetails: {
    pricePerKm: { type: Number, required: true },
    discount: { type: Number, required: true },
    perDayCost: { type: Number, required: true },
  },
  details: { type: String, required: true },
  gearType: { type: String, enum: ['manual', 'automatic'], required: true },
  isFrequentRenter: { type: Boolean, default: false },
  loyaltyPoints: { type: Number, default: 0 },
  extraDiscountRides: { type: Number, default: 0 },
});

module.exports = mongoose.model('Car', carSchema);