const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const Room = require('../../models/Room')
const Movie = require('../../models/Movie')
const Screening = require('../../models/Screening')
const auth = require('../../middleware/auth')
const moment = require('moment')
// Pobieranie wszystkich ekranizacji
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
		const hour = screening.hour + 1
		const dateRange = []

		let currentDate = moment(screening.dateFrom)

		while (currentDate <= moment(screening.dateTo)) {
			currentDate.set({ hour, minute: 0, second: 0, millisecond: 0 })
			dateRange.push(currentDate.format('YYYY-MM-DDTHH:mm:ss'))
			currentDate.add(1, 'days')
		}

		await Promise.all(
			dateRange.map(async date => {
				const newScreening = new Screening({
					roomId: screening.roomId,
					movieId: screening.movieId,
					date: date,
				})

				await newScreening.save()
			})
		)

		res.status(201).json({ success: true, message: 'Utworzono ekranizacje' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})
module.exports = router
