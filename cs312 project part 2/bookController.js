const db = require('../db');

// get all books
exports.getAllBooks = async (req, res) => {
    try {
        const [books] = await db.query('SELECT * FROM books');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get books by format
exports.getBooksByFormat = async (req, res) => {
    const { format } = req.params;
    try {
        const [books] = await db.query('SELECT * FROM books WHERE format = ?', [format]);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get details of a book by ID
exports.getBookDetails = async (req, res) => {
    const { bookId } = req.params;
    try {
        const [books] = await db.query('SELECT * FROM books WHERE id = ?', [bookId]);
        const book = books[0];
        if (!book) {
            return res.status(404).json({ message: 'Book not found.' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
