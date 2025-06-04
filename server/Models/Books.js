const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true        
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: String,
        enum: ["available", "unavailable"],
        required: true
    },
    rating: {
        type: Number,
        enum:[1, 2, 3, 4, 5],
        required: true
    }
}, {timestamps: true})

const Books = mongoose.model("Books", BooksSchema);

module.exports = {Books}