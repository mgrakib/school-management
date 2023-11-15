/** @format */

const mongoose = require("mongoose");

const connectDB = () => {
    
    let connectionURL = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.wgouhep.mongodb.net/${process.env.DB_NAME}?${process.env.DB_QUERY}`;

    
	return mongoose.connect(connectionURL);
};

module.exports = connectDB;
