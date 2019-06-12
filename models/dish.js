const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number
});

module.exports = mongoose.model("Dish", dishSchema);