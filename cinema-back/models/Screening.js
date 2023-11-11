const mongoose = require('mongoose')

const ScreeningSchema = new mongoose.Schema({
	roomId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'room',
	},
	movieId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'movie',
	},
	date: {
		type: Date,
		required: true,
	},
})

module.exports = Screening = mongoose.model('screening', ScreeningSchema)
