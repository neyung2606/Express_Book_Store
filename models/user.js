const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: "Username is required",
        minlength: 4,
        maxlength: 150,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: "Password is required",
        minlength: 8,
    },
    email: {
        type: String,
        required: "Email is required",
        minlength: 4,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    role: {
        type: String,
        required: "Role is required"
    }
});
userSchema.pre('save', async function (next) {
    const user = this;
    console.log(user.password);
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
        console.log(user.password)
    }
    next();
})

module.exports = mongoose.model("User", userSchema);