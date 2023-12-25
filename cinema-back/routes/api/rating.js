const express = require('express')
const auth = require('../../middleware/auth')
const router = express.Router()

const Rating = require('../../models/Rating')
const Movie = require('../../models/Movie')

router.get('/:id', async (req, res) => {
	try {
		const userRatings = await Rating.find({ movieId: req.params.id })

		const lengthRating = userRatings.length
		const sumRating = userRatings.reduce((sum, rating) => sum + rating.rate, 0)

		const rating = Math.max(1, Math.min(5, Math.round(sumRating / lengthRating)))

		res.status(200).json(rating)
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

router.post('/', async (req, res) => {
	try {
		const rating = req.body

		const query = { userId: rating.userId, movieId: rating.movieId }
		const result = await Rating.findOne(query)

		if (result) {
			await Rating.updateOne(query, { $set: rating })

			res.status(200).json({ success: true, message: 'Zaktualizowano ocenę' })
		} else {
			const newRating = new Rating(rating)
			await newRating.save()

			res.status(200).json({ success: true, message: 'Dodano ocenę' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

module.exports = router
