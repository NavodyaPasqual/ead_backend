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
        type: Date,
    },
    dieselAvailable: {
        type: Boolean,
        default: true
    },
    dieselFinishTime: {
        type: Date,
    },
    petrolArrivalTime: {
        type: Date,
    },
    petrolAvailable: {
        type: Boolean,
        default: true
    },
    petrolFinishTime: {
        type: Date,
    }
},{timestamps: true})

module.exports = mongoose.model('Shed', userSchema);