const path = require('path');
const express = require('express');
const app = express();

// Serve API routes
app.use('/api/books', require('./routes/booksRoutes'));

// Serve React build files for non-API routes
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
