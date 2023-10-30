const mongoose = require('mongoose')
const Screening = require('./Screening')

const MovieSchema = new mongoose.Schema({
	uid: {
		type: String,
		require: true,
	},
	title: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		required: true,
	},
	cover: {
		type: String,
		required: true,
	},
	banner: {
		type: String,
	},
	genre: {
		type: [String],
		require: true,
	},
	director: {
		type: String,
		require: true,
	},
	casts: {
		type: [String],
		require: true,
	},
	productionCountry: {
		type: String,
		require: true,
	},
	screeningLength: {
		type: Number,
		require: true,
	},
	ageRestrictions: {
		type: Number,
	},
	screeningOptions: {
		type: [Screening.Schema],
	},
})

module.exports = Movie = mongoose.model('movie', MovieSchema)
