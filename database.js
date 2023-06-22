const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb+srv://mb1412:Kaitou1412@cluster0.aiqlokr.mongodb.net/");
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
