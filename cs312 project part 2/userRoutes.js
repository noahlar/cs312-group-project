const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:userId', userController.getUserDetails);
router.get('/:userId/purchase-history', userController.getPurchaseHistory);

module.exports = router;
