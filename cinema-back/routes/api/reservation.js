const express = require('express')
const Reservation = require('../../models/Reservation')
const router = express.Router()
const ReservedSeat = require('../../models/ReservedSeats')
const Seat = require('../../models/Seat')
// Endpoint do dodawania nowej rezerwacji
router.post('/', async (req, res) => {
	try {
		const reservation = new Reservation(req.body)
		const createdReservation = await reservation.save()
		const screeningId = reservation.screeningId
		reservation.seats.map(async seat => {
			const data = {
				seatId: seat,
				screeningId: screeningId,
				reservationId: createdReservation._id,
			}

			const reservationSeat = new ReservedSeat(data)

			await reservationSeat.save()
		})

		res.status(200).json(createdReservation._id)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

// Endpoint do pobierania wszystkich rezerwacji
router.get('/reservations', async (req, res) => {
	try {
		const reservations = await Reservation.find()
		res.json(reservations)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

// Endpoint do pobierania pojedynczej rezerwacji po ID
router.get('/reservations/:id', async (req, res) => {
	try {
		const reservation = await Reservation.findById(req.params.id)
		if (!reservation) {
			return res.status(404).json({ message: 'Reservation not found' })
		}
		res.json(reservation)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

// Endpoint do aktualizacji rezerwacji po ID
router.put('/reservations/:id', async (req, res) => {
	try {
		const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true })
		if (!updatedReservation) {
			return res.status(404).json({ message: 'Reservation not found' })
		}
		res.json(updatedReservation)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

// Endpoint do usuwania rezerwacji po ID
router.delete('/reservations/:id', async (req, res) => {
	try {
		const deletedReservation = await Reservation.findByIdAndRemove(req.params.id)

		if (!deletedReservation) {
			return res.status(404).json({ message: 'Reservation not found' })
		}

		await ReservedSeat.deleteMany({ reservationId: deletedReservation._id })

		res.json({ message: 'Reservation deleted' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

module.exports = router
