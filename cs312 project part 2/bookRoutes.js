const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getAllBooks);

router.get('/format/:format', bookController.getBooksByFormat);

router.get('/:bookId', bookController.getBookDetails);

module.exports = router;
