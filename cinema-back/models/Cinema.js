const mongoose = require('mongoose');

const CinemaSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    adress: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true,
    },
    phone: {
        type: [String],
    },
    description: {
        type: String,
    },
});


module.exports = Cinema = mongoose.model('cinema', CinemaSchema);