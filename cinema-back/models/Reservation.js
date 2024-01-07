const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
	active: {
		type: Boolean,
		require: true,
	},
	screeningId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'screening',
	},
	cost: {
		type: Number,
		require: true,
	},
	reservationDate: {
		type: Date,
		default: Date.now,
	},
	discountId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'discount',
	},
	email: {
		type: String,
		require: true,
	},
	seats: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'seats',
			require: true,
		},
	],
})

module.exports = Reservation = mongoose.model('reservation', ReservationSchema)
