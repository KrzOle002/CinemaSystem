const mongoose = require('mongoose')

const RatingSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	rate: {
		type: Number,
		required: true,
	},
	movieId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'movie',
	},
})

module.exports = Rating = mongoose.model('rating', RatingSchema)
