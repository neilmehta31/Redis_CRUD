const mongoose = require('mongoose');
const dotenv= require('dotenv')
dotenv.config({ path: '.env'});
mongoose.set('strictQuery',false);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://neil:admin123@cluster0.juitrf0.mongodb.net/crud_full_app", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
           // useFindAndModify: false
        });
        console.log(`Mongo DB Connected: ${conn.connection.host}`);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;

