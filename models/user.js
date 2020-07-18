const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: "Username is required",
        minlength: 4,
        maxlength: 150
    },
    password: {
        type: String,
        required: "Password is required",
        minlength: 8
    },
    email: {
        type: String,
        required: "Email is required",
        minlength: 4
    },
    name: {
        type: String,
    },
    phone: {
        type: Number,
        minlength: 10,
        maxlength: 10
    },
    gender: {
        type: Boolean
    },
    role: {
        type: String,
        required: "Role is required"
    }
});

module.exports = mongoose.model("User", userSchema);