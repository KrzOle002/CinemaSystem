const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')
// @route   GET api/auth
// @desc    Getting actual user data
// @access  Public
router.get('/me', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password')
		res.json(user)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
	'/login',
	[check('email', 'Please include a valid email').isEmail(), check('password', 'Password is required').exists()],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { email, password } = req.body

		try {
			const correctEmail = email.toLowerCase()

			let user = await User.findOne({ email: correctEmail })

			if (!user) {
				return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
			}

			const isMatch = await bcrypt.compare(password, user.password)

			if (!isMatch) {
				return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
			}

			const payload = {
				user: {
					id: user.id,
				},
			}

			jwt.sign(payload, config.get('jwtToken'), { expiresIn: '5h' }, (err, token) => {
				if (err) throw err
				res.json({ token })
			})
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server error')
		}
	}
)

module.exports = router
