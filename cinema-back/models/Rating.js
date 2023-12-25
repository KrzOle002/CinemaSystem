const mongoose = require('mongoose')

const RatingSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	rate: {
		type: Number,
		required: true,
	},
	movie: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'movie',
	},
})

module.exports = Rating = mongoose.model('rating', RatingSchema)
