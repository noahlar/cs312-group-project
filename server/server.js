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
            { 
                id: 1, 
                title: 'Book 1', 
                author: 'Author 1', 
                genre: 'Fiction', 
                image: '/images/book1.jpg' 
            },
            { 
                id: 2, 
                title: 'Book 2', 
                author: 'Author 2', 
                genre: 'Non-fiction', 
                image: '/images/book2.jpg' 
            }
        ];
    }

    res.render('index', { books, query }); // Render the view with books and query
});


app.get('/Reviews', (req, res) => {
    // Example static data; replace with your own logic to fetch reviews
    const reviews = [
        { title: 'Book 1', review: 'Great book!' },
        { title: 'Book 2', review: 'Not bad.' },
    ];

    res.render('reviews', { reviews }); // Pass data to the `reviews.ejs` template
});

let cart = [];

const books = [
    { id: 1, title: 'Book 1', price: 10, quantity: 1 },
    { id: 2, title: 'Book 2', price: 15, quantity: 2 }
];

//Cart.ejs
app.get('/add-to-cart/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (book) {
        // Check if the book is already in the cart
        const existingBook = cart.find(item => item.id === book.id);
        if (existingBook) {
            existingBook.quantity += 1; // Increase quantity if it's already in the cart
        } else {
            cart.push({ ...book, quantity: 1 }); // Add new book to the cart
        }
    }

    res.redirect('/Cart'); // Redirect to the cart page
});
// Remove an item from the cart
app.get('/Cart/remove/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    console.log(`Removing book with ID: ${bookId}`);  // Log removal action
    cart = cart.filter(item => item.id !== bookId);
    console.log('Updated cart after removal:', cart);  // Log the cart after removal
    res.redirect('/Cart');
});

app.post('/Cart/update/:id', (req, res) => {
    const bookId = req.params.id;
    const newQuantity = parseInt(req.body.quantity, 10);
    console.log(`Updating book with ID: ${bookId}, new quantity: ${newQuantity}`);
    const item = cart.find(item => item.id == bookId);
    if (item) {
        item.quantity = newQuantity;
    }
    console.log('Updated cart after quantity change:', cart);  // Log the cart after update
    res.redirect('/Cart');
});


// Render the cart page
app.get('/Cart', (req, res) => {
    res.render('cart', { cart });
});

// Render Checkout page
app.get('/Cart/checkout', (req, res) => {
    console.log("Checkout route hit");  // To verify if the route is triggered
    if (cart.length === 0) {
        return res.redirect('/Cart'); // Redirect to Cart if the cart is empty
    }
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    res.render('Checkout', { cart, totalAmount });
});

// Handle POST request to checkout
app.post('/Cart/checkout', (req, res) => {
    
    
    const { name, address, payment } = req.body;

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    
    
    res.render('Checkout', { cart, totalAmount });
});


app.get('/Cart', (req, res) => {
    res.render('cart', { cart });
});



app.get('/Login', (req, res) => {
    res.render('Login'); 
});
app.post('/Login', (req, res) => {
    const { username, password } = req.body;
    
    console.log('Username:', username);
    console.log('Password:', password);

    res.redirect('/'); 
});

// Catch-all for any other undefined routes
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
