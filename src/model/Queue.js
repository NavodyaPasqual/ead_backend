const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        min: 3,
        max:255
    },
    nic: {
        type: String,
        required: true,
        min: 6,
        max:255
    },
    fuelStation: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Leave" //Joined, ExitBefore, ExitAfter, Leave
    }
},{timestamps: true})

module.exports = mongoose.model('Queue', userSchema);