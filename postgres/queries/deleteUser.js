const pool = require('../pool');

const deleteUser = async (req) => {
    let res = {status : null, body : null};
    try {
        const client = await pool.connect();
        const { id } = req.params;
        const result = await client.query('DELETE FROM users WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            res.status = 404;
            res.body = { error: 'User not found' };
        } else {
            res.status = 200;
            res.body = { message: 'User deleted'};
        }
        client.release();
    } catch (err) {
        console.error(err);
        res.status = 500;
        res.body = { error: 'Error deleting user' };
    } finally {
        return res;
    }
};

module.exports = deleteUser;