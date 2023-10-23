const mongoose = require('mongoose')

const typeEnum = ['user', 'worker', 'admin']

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	surname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		require: true,
	},
	avatar: {
		type: String,
	},
	type: {
		type: String,
		enum: typeEnum,
		default: 'user',
	},
	date: {
		type: Date,
		default: Date.now,
	},
})

module.exports = User = mongoose.model('user', UserSchema)
