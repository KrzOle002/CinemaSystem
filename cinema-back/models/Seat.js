const mongoose = require('mongoose')

const SeatSchema = new mongoose.Schema({
	row: {
		type: Number,
	},
	number: {
		type: Number,
	},
	roomId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'room',
	},
})

module.exports = Seat = mongoose.model('seat', SeatSchema)
