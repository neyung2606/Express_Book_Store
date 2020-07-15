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
    description: {
        type: String,
    },
});

module.exports = mongoose.model("Book", bookSchema);