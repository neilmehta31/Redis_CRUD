const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'users',
    password: 'password',
    port: 5432,    
});

const getAllPg = async (req) => {
    let res;
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

const getIdPg = async (req) => {
    let res;
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
        if (result.rowCount === 0) {
            res.status = 404;
            res.body = { error: 'User not found' };
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

const postPg = async (req) => {
    let res;
    try {
        const client = await pool.connect();
        const { name, email } = req.body;
        const result = await client.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        const newUser = result.rows;
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

const putPg = async (req) => {
    let res;
    try {
        const client = await pool.connect();
        const { name, email } = req.body;
        const { id } = req.params;
        const result = await client.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
            [name, email, id]
        );
        if (result.rowCount === 0) {
            res.status = 404;
            res.body = { error: 'User not found' };
        } else {
            const updatedUser = result.rows;
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

const deletePg = async (req) => {
    let res;
    try {
        const client = await pool.connect();
        const { id } = req.params;
        const result = await client.query('DELETE FROM users WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            res.status = 404;
            res.body = { error: 'User not found' };
        } else {
            res.status = 200;
            res.body = { message: 'User with deleted'};
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

module.exports = {getAllPg, getIdPg, postPg, putPg, deletePg};