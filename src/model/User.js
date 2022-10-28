const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max:255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max:255
    },
    nic: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max:1024
    },
    token: {
        type: String,
        required: false
    }
},{timestamps: true})

module.exports = mongoose.model('User', userSchema);