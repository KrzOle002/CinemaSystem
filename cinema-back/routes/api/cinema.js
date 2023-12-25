const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const Cinema = require('../../models/Cinema')
const User = require('../../models/User')
// @route   GET api/cinema
// @desc    Get current cinema info
// @access  Private
router.get('/me', auth, async (req, res) => {
	try {
		const cinema = await Cinema.findOne({ user: req.user.id }).populate('user', ['name'])

		if (!cinema) {
			return res.status(400).json({ msg: 'There is no cinema for this user' })
		}

		res.json(cinema)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

// @route   Post api/cinema
// @desc    Create or update cinema
// @access  Private
router.post(
	'/',
	[
		auth,
		[
			check('adress', 'Adress is required').notEmpty(),
			check('city', 'City is required').notEmpty(),
			check('zipCode', 'ZipCode is required').notEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
	}
)

module.exports = router
