const mongoose = require('mongoose');

const Screening = new mongoose.Schema({
    roomNumber: {
        type: Number,
    },
    places: {
        type: Number,
    },
    description: {
        type: String,
    },
});


module.exports = Screening = mongoose.model('screening', ScreeningSchema);