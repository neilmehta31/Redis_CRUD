const pool = require('../pool');

const getAllUsers = async (req) => {
    let res = {status : null, body : null};
    try {
        const client = await pool.connect();
        const sortBy = req.query.sortBy || 'id';
        const sortOrder = req.query.sortOrder || 'ASC';
        const result = await client.query(`SELECT * FROM users ORDER BY ${sortBy} ${sortOrder}`); 
        if (result.rowCount === 0) {
            res.status = 404;
            res.body = { error: 'No users found' };
        } else {
            res.status = 200;
            res.body = result.rows;
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

module.exports = getAllUsers;