const mongoose = require('mongoose')
const Rating = require('../models/Rating')
const moment = require('moment')
jest.mock('../models/Rating')

describe('calculateAverageRating', () => {
	it('powinno prawidłowo obliczać średnią ocenę', async () => {
		const movieId = new mongoose.Types.ObjectId()
		const userRatings = [
			{ movieId, rate: 4 },
			{ movieId, rate: 5 },
			{ movieId, rate: 3 },
		]

		async function calculateAverageRating(movieId) {
			try {
				const userRatings = await Rating.find({ movieId: movieId })

				if (userRatings.length === 0) {
					return null
				}

				const sumRating = userRatings.reduce((sum, rating) => sum + rating.rate, 0)
				const lengthRating = userRatings.length
				const averageRating = Math.max(1, Math.min(5, Math.round(sumRating / lengthRating)))

				return averageRating
			} catch (error) {
				console.error('Error calculating average rating:', error)
				throw error
			}
		}

		Rating.find.mockResolvedValue(userRatings)

		const rating = await calculateAverageRating(movieId)

		const expectedAverage = 4

		expect(rating).toBe(expectedAverage)
	})
})
