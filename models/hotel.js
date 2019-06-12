const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    dishes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dish"
        }    
    ]
});

module.exports = mongoose.model("Hotel", hotelSchema);