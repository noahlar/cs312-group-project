const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  const query = req.query.q || '';
  
  res.json({ message: `Searching for books with query: ${query}` });
});

module.exports = router;
