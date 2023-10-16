const mongoose = require('mongoose');

const Room = new mongoose.Schema({
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


module.exports = Room = mongoose.model('room', RoomSchema);