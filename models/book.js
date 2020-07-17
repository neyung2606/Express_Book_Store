const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required",
        minlength: 4,
        maxlength: 150
    },
    img: {
        type: String,
        required: "Img is required",
        minlength: 8
    },
    price: {
        type: Number,
        required: "Price is required",
        minlength: 4
    },
    quantity: {
        type: Number,
        required: "Quantity is required",
        min: 1
    },
    description: {
        type: String,
        required: "Description is required"
    },
    supplier: {
        type: String,
        required: "Supplier is required"
    },
    publishing: {
        type: String,
        required: "Publishing is required"
    },
    author: {
        type: String,
        required: "Author is required"
    },
    year: {
        type: Number,
        required: "Year is required",
        min: 1900,
        max: 9999
    },
    page: {
        type: Number,
        required: "Page is required"
    },
    cover: {
        type: String,
        required: "Cover is required"
    }
});

module.exports = mongoose.model("Book", bookSchema);