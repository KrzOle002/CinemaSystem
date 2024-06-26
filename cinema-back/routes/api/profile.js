const express = require('express')

const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate('user', ['name'])

		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' })
		}

		res.json(profile)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/', auth, check('status', 'Status is required').notEmpty(), check('skills', 'Skills is required').notEmpty(), async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}
	const {
		website,
		skills,
		youtube,
		twitter,
		instagram,
		linkedin,
		facebook,

		...rest
	} = req.body

	const profileFields = {
		user: req.user.id,
		website: website && website !== '' ? normalize(website, { forceHttps: true }) : '',
		skills: Array.isArray(skills) ? skills : skills.split(',').map(skill => ' ' + skill.trim()),
		...rest,
	}

	const socialFields = { youtube, twitter, instagram, linkedin, facebook }

	profileFields.social = socialFields

	try {
		let profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ $set: profileFields },
			{ new: true, upsert: true, setDefaultsOnInsert: true }
		)
		return res.json(profile)
	} catch (err) {
		console.error(err.message)
		return res.status(500).send('Server Error')
	}
})
// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name'])
		res.json(profiles)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
})
// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name'])

		if (!profile) return res.status(400).json({ msg: 'Profile not found' })

		res.json(profile)
	} catch (err) {
		console.error(err.message)
		if (err.kind == ' ObjectId') {
			return res.status(400).json({ msg: 'Profile not found' })
		}
		res.status(500).send('Server error')
	}
})

// @route    DELETE api/profile
// @desc     Delete profile, user
// @access   Private
router.delete('/', auth, async (req, res) => {
	try {
		await Profile.findOneAndRemove({ user: req.user.id })
		await User.findOneAndRemove({ _id: req.user.id })
		res.json({ msg: 'User deleted' })
	} catch (err) {
		console.error(err.message)
	}
})
module.exports = router
