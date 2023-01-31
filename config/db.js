const mongoose = require('mongoose');

mongoose.set('strictQuery',false);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI2, {
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

