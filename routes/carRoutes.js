const express = require('express');
const { getCars, addCar, filterCars, bookCar } = require('../controllers/carController');

const router = express.Router();

router.get('/', getCars);
router.post('/', addCar);
router.get('/filter', filterCars);
router.post('/book', bookCar);

module.exports = router;