const pool = require('../pool');

const getUser = async (req) => {
    let res = {status : null, body : null};
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users WHERE id = $1', [req.body.id]);
        if (result.rowCount === 0) {
            res.status = 404;
            res.body = { error: 'User not found' };
        } else {
            res.status = 200;
            res.body = result.rows[0];
        }
        client.release();
    } catch (err) {
        console.error(err);
        res.status = 500;
        res.body = { error: 'Error fetching users' };
    } finally {
        return res;
    }
};

module.exports = getUser;