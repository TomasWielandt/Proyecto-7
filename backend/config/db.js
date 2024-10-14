const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("estamos conectados a la BD.");
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;