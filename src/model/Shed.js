const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    shedID: {
        type: String,
        required: true,
        min: 3,
        max:255
    },
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
    dieselArrivalTime: {
        type: Date,
        required: true
    },
    dieselAvailable: {
        type: Boolean,
        default: true
    },
    dieselFinishTime: {
        type: Date,
        required: true
    },
    petrolArrivalTime: {
        type: Date,
        required: true
    },
    petrolAvailable: {
        type: Boolean,
        default: true
    },
    petrolFinishTime: {
        type: Date,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Shed', userSchema);