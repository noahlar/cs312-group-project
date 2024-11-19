const express = require('express');
const app = express();
const booksRoutes = require('./routes/booksRoutes');
const searchRoutes = require('./routes/searchRoutes');

app.use(express.json());
app.use('/api/books', booksRoutes);
app.use('/api/search', searchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
