const pool = require('../config/db');

exports.getPricing = async (req, res) => {
    try {
        const { bookId } = req.params;
        const result = await pool.query('SELECT * FROM pricing WHERE book_id = $1', [bookId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch pricing data' });
    }
};
