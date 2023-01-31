const express = require('express');
const cors = require('cors');
const dotenv= require('dotenv')
const bodyParser=require('body-parser')
const app = express();
app.use(bodyParser.json())
require('dotenv').config();

app.use(express.json());
app.use(cors());

const connectDB = require('./config/db');
dotenv.config({ path: '.env'});

connectDB();

const APIendpoints = require('./routes/APIendpoints.js');

app.use('/api', APIendpoints);
const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`Server listening on port ${port}...`) });