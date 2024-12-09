const api = require('../../api/api'); // Import your API functions

// Define controller functions
exports.getAllBooks = (req, res) => {
    const books = [
        { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Fiction' },
        { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Non-fiction' },
    ];
    res.json(books); // Send a JSON response with the books
};

exports.searchBooks = async (req, res) => {
    const { query } = req.query; // Get the search query from the URL

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const books = await api.searchBooks(query); // Fetch books from the API
        res.render('index', { books, query }); // Render the index page with the books
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from Google Books API' });
    }
};
