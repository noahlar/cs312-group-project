const db = require('../db');

// add item to cart
exports.addItemToCart = async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        const [cartItem] = await db.query('SELECT * FROM cart WHERE user_id = ? AND book_id = ?', [userId, bookId]);
        if (cartItem.length > 0) {
            await db.query('UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND book_id = ?', [userId, bookId]);
        } else {
            await db.query('INSERT INTO cart (user_id, book_id, quantity) VALUES (?, ?, 1)', [userId, bookId]);
        }
        res.json({ message: 'Item added to cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// remove an item from cart
exports.removeItemFromCart = async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        await db.query('DELETE FROM cart WHERE user_id = ? AND book_id = ?', [userId, bookId]);
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get cart total price
exports.getCartTotal = async (req, res) => {
    const { userId } = req.params;
    try {
        const [items] = await db.query(
            'SELECT books.price, cart.quantity FROM cart JOIN books ON cart.book_id = books.id WHERE cart.user_id = ?',
            [userId]
        );
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        res.json({ total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
