const express = require('express');
const path = require('path');
const app = express();
const { searchBooks } = require('./api/api'); // Use the searchBooks function directly

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Default route for the homepage
app.get('/', async (req, res) => {
    console.log('Received query parameters:', req.query);
    const query = req.query.q || ''; // Capture the search query or default to an empty string
    let books = [];

    if (query) {
        try {
            console.log('Fetching books from API...');
            books = await searchBooks(query);
            console.log('Books fetched:', books);
        } catch (error) {
            console.error('Error fetching books:', error.message);
            books = []; // Fallback to an empty list on error
        }
    } else {
        console.log('No query provided, showing default books.');
        books = [
            { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Fiction' },
            { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Non-fiction' },
        ];
    }

    res.render('index', { books, query }); // Render the view with books and query
});

// Catch-all for any other undefined routes
app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.get('/books/:id/reviews', (req, res) => {
    const bookId = req.params.id;
    const book = getBookById(bookId); // Replace this with your logic to fetch a book by ID

    if (book) {
        res.render('reviews', { book }); // Ensure you have a `reviews.ejs` file in `views`
    } else {
        res.status(404).send('Book not found');
    }
});

//cart.ejs
let cart = [];

// Add item to the cart (this might be handled by another route)
app.get('/add-to-cart/:id', (req, res) => {
    const bookId = req.params.id;
    const book = getBookById(bookId); // Fetch the book by ID (replace with your logic)

    if (book) {
        cart.push({ id: book.id, title: book.title, price: book.price, quantity: 1 });
        res.redirect('/cart'); // Redirect to the cart page
    } else {
        res.status(404).send('Book not found');
    }
});

// Show the cart page
app.get('/cart', (req, res) => {
    res.render('cart', { cart });
});

// Remove an item from the cart
app.get('/cart/remove/:id', (req, res) => {
    const bookId = req.params.id;
    cart = cart.filter(item => item.id !== bookId); // Remove item from the cart
    res.redirect('/cart');
});

//login.ejs
app.get('/login', (req, res) => {
    res.render('login'); // This renders the login.ejs file
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    console.log('Username:', username);
    console.log('Password:', password);

    res.redirect('/'); 
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
