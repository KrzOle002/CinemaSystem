const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const Room = require('../../models/Room')
const Movie = require('../../models/Movie')
const Screening = require('../../models/Screening')
const auth = require('../../middleware/auth')
const moment = require('moment')

router.get('/screenings', async (req, res) => {
	try {
		const screenings = await Screening.find()
		res.status(200).json(screenings)
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

router.get('/screenings/:id', async (req, res) => {
	try {
		const screening = await Screening.findById(req.params.id).populate('roomId')
		if (!screening) {
			return res.status(404).json({ success: false, message: 'Ekranizacja nie znaleziona' })
		}
		res.status(200).json(screening)
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

router.get('/screenings/:id/movie', async (req, res) => {
	try {
		const screening = await Screening.findById(req.params.id).populate('roomId')

		if (!screening) {
			return res.status(404).json({ success: false, message: 'Ekranizacja nie znaleziona' })
		}
		const movie = await Movie.findById(screening.movieId)

		if (!movie) {
			return res.status(404).json({ success: false, message: 'Film nie znaleziony' })
		}

		screening.movieId = movie

		res.status(200).json(screening)
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

// Aktualizacja ekranizacji o określonym ID
router.put('/screenings/:id', async (req, res) => {
	try {
		const updatedScreening = await Screening.findByIdAndUpdate(req.params.id, req.body, { new: true })
		if (!updatedScreening) {
			return res.status(404).json({ success: false, message: 'Ekranizacja nie znaleziona' })
		}
		res.status(200).json({ success: true, message: 'Zaktualizowano ekranizację', data: updatedScreening })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

// Usuwanie ekranizacji o określonym ID
router.delete('/screenings/:id', async (req, res) => {
	try {
		const deletedScreening = await Screening.findByIdAndRemove(req.params.id)
		if (!deletedScreening) {
			return res.status(404).json({ success: false, message: 'Ekranizacja nie znaleziona' })
		}
		res.status(200).json({ success: true, message: 'Usunięto ekranizację', data: deletedScreening })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

router.get('/schedule', async (req, res) => {
	const screeningHours = [9, 11, 13, 15, 17, 19, 21]
	try {
		const screenings = await Screening.find()

		const rooms = await Room.find()

		const freeSchedule = rooms.map(room => {
			const roomSchedule = screeningHours.map(hour => {
				const isHourOccupied = screenings.some(screening => {
					return screening.roomId.equals(room._id) && screening.date.getUTCHours() == hour
				})

				return {
					hour,
					occupied: isHourOccupied,
				}
			})

			return {
				roomId: room._id,
				schedule: roomSchedule,
			}
		})

		res.status(200).json(freeSchedule)
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

router.post('/screenings', async (req, res) => {
	try {
		const screening = req.body

		// Dodajemy jeden dzień do daty początkowej i końcowej
		let currentDate = moment.utc(screening.dateFrom).add(1, 'days')
		const endDate = moment.utc(screening.dateTo).add(1, 'days')

		const screeningsToCreate = []

		while (currentDate <= endDate) {
			screening.screeningData.forEach(screeningItem => {
				if (screeningItem.movieId) {
					const hourParts = screeningItem.hour.split(':')
					const hour = parseInt(hourParts[0], 10)
					const minute = parseInt(hourParts[1], 10)

					// Ustawianie czasu na podstawie obecnej daty w UTC
					const dateTime = moment.utc(currentDate).set({
						hour: hour,
						minute: minute,
						second: 0,
						millisecond: 0,
					})

					screeningsToCreate.push({
						roomId: screeningItem.roomId,
						movieId: screeningItem.movieId,
						// Formatujemy jako UTC
						date: dateTime.toISOString(),
					})
				}
			})

			// Przechodzimy do następnego dnia w UTC
			currentDate.add(1, 'days')
		}

		// Tworzymy seanse w bazie danych
		await Promise.all(
			screeningsToCreate.map(async screeningData => {
				const newScreening = new Screening(screeningData)
				await newScreening.save()
			})
		)

		res.status(201).json({ success: true, message: 'Ustawiono Harmonogram' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Server error' })
	}
})

router.get('/last-screening', async (req, res) => {
	try {
		const lastScreening = await Screening.findOne().sort({ date: -1 })

		if (lastScreening) {
			res.status(200).json(lastScreening.date)
		} else {
			res.status(404).json({ success: false, message: 'Brak seansów' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})
module.exports = router
