const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    regNo: {
        type: String,
        required: true,
        min: 3,
        max:255
    },
    name: {
        type: String,
        required: true,
        min: 3,
        max:255
    },
    address: {
        type: String,
        required: true,
        min: 6,
        max:255
    },
    shedContactNo: {
        type: String,
        required: true,
        trim: true
    },
    dieselArrivalTime: {
        type: String,
    },
    dieselAvailable: {
        type: String,
        default: true
    },
    dieselFinishTime: {
        type: String,
    },
    petrolArrivalTime: {
        type: String,
    },
    petrolAvailable: {
        type: String,
        default: true
    },
    petrolFinishTime: {
        type: String,
    }
},{timestamps: true})

module.exports = mongoose.model('Shed', userSchema);