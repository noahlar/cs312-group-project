const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController'); 

router.get('/', booksController.getAllBooks); 

module.exports = router;



router.get('/', (req, res) => {
  const query = req.query.q || '';
  
  res.json({ message: `Searching for books with query: ${query}` });
});

router.get('/', booksController.searchBooks);

module.exports = router;
