const mongoose = require('mongoose')
const Screening = require('./Screening')

const MovieSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		required: true,
	},
	cover: {
		path: String,
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
	productionYear: {
		type: Number,
		require: true,
	},
	screeningLength: {
		type: Number,
		require: true,
	},
	ageRestrictions: {
		type: Number,
	},
	screenings: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'screening',
		},
	],
})

module.exports = Movie = mongoose.model('movie', MovieSchema)
