const pool = require('../config/db');

exports.getUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch user details' });
    }
};

exports.getPurchaseHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await pool.query(
            `SELECT ph.*, b.title, b.author 
             FROM purchase_history ph
             JOIN books b ON ph.book_id = b.id
             WHERE ph.user_id = $1 ORDER BY ph.purchase_date DESC`,
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch purchase history' });
    }
};
