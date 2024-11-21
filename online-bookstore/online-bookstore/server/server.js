const express = require('express');
const app = express();
const booksRoutes = require('./routes/booksRoutes');
const searchRoutes = require('./routes/searchRoutes');

app.use(express.json());
app.use('/api/books', booksRoutes);
app.use('/api/search', searchRoutes);

app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const books = [
        { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Fiction', price: 10 },
        { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Non-fiction', price: 15 },
    ];
    const book = books.find(b => b.id == bookId);

    if (book) {
        res.render('bookDetails', { book });
    } else {
        res.status(404).send('Book not found');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
