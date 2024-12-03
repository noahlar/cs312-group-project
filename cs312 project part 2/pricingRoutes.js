const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricingController');

router.get('/:bookId', pricingController.getPricing);

module.exports = router;
