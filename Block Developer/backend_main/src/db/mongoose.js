const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
};

module.exports = connectDB;