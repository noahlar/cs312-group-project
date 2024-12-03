const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// add item to cart
router.post('/add', cartController.addItemToCart);

// remove an item from cart
router.post('/remove', cartController.removeItemFromCart);

// get total price of the cart
router.get('/total/:userId', cartController.getCartTotal);

module.exports = router;
