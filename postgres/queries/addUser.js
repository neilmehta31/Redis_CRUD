const pool = require('../pool');

const addUser = async (req) => {
    let res = {status : null, body : null};
    try {
        const client = await pool.connect();
        const { name, email } = req.body;
        const result = await client.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        const newUser = result.rows[0];
        res.status = 200;
        res.body = newUser;
        client.release();
    } catch (err) {
        console.error(err);
        res.status = 500;
        res.body = { error: 'Error creating user' };
    } finally {
        return res;
    }
};

module.exports = addUser;