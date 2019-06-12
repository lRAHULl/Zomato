const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    quantity: Number
});

module.exports = mongoose.model("User", userSchema);