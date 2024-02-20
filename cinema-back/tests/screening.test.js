const mongoose = require('mongoose')
const Screening = require('../models/Screening')
const moment = require('moment')
jest.mock('../models/Screening')

describe('createScreenings', () => {
	it('powinno prawidłowo tworzyć ekranizacje', async () => {
		const screeningData = {
			roomId: new mongoose.Types.ObjectId(),
			movieId: new mongoose.Types.ObjectId(),
			dateFrom: new Date('2023-12-05'),
			dateTo: new Date('2023-12-06'),
			hour: 14,
		}

		async function createScreenings(screeningData) {
			const { roomId, movieId, dateFrom, dateTo, hour } = screeningData
			let currentDate = moment(dateFrom)
			let hours = hour + 1
			while (currentDate < dateTo) {
				const date = currentDate.set({ hours, minute: 0, second: 0, millisecond: 0 }).toDate()
				const newScreening = new Screening({ roomId, movieId, date })
				await newScreening.save()
				currentDate.add(1, 'days')
			}
		}

		Screening.mockImplementation(() => ({
			save: jest.fn().mockResolvedValue(true),
		}))

		const expectedDates = []
		let currentDate = moment.utc(screeningData.dateFrom)
		const hour = screeningData.hour

		while (currentDate < screeningData.dateTo) {
			currentDate.set({ hour, minute: 0, second: 0, millisecond: 0 })
			expectedDates.push(currentDate.toDate())
			currentDate.add(1, 'days')
		}

		await createScreenings(screeningData)

		expect(Screening).toHaveBeenCalledTimes(expectedDates.length)
		expectedDates.forEach((date, index) => {
			expect(Screening).toHaveBeenNthCalledWith(
				index + 1,
				expect.objectContaining({
					roomId: screeningData.roomId,
					movieId: screeningData.movieId,
					date: date,
				})
			)
		})
	})
})
