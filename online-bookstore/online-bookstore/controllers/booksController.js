exports.getAllBooks = (req, res) => {
    const books = [
        { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Fiction' },
        { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Non-fiction' },
    ];
    res.json(books);
};
