const express = require('express');
const cors = require('cors');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());


const APIendpoints = require('./routes/APIendpoints.js');

app.use('/api', APIendpoints);
const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`Server listening on port ${port}...`) });