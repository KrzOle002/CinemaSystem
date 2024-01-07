const mongoose = require('mongoose')

const ReservedSeatSchema = new mongoose.Schema({
	seatId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'seat',
	},
	reservationId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'reservation',
	},
	screeningId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'screening',
	},
})

module.exports = ReservedSeat = mongoose.model('reservedseat', ReservedSeatSchema)
