const pool = require('../pool');

const updateUser = async (req) => {
    let res = {status : null, body : null};
    try {
        const client = await pool.connect();
        const { name, email, id } = req.body;
        const result = await client.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
            [name, email, id]
        );
        if (result.rowCount === 0) {
            res.status = 404;
            res.body = { error: 'User not found' };
        } else {
            const updatedUser = result.rows[0];
            res.status = 200;
            res.body = updatedUser;
        }
        client.release();
    } catch (err) {
        console.error(err);
        res.status = 500;
        res.body = { error: 'Error updating user' };
    } finally {
        return res;
    }
};

module.exports = updateUser;