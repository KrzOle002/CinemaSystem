const express = require('express')
const Reservation = require('../../models/Reservation')
const router = express.Router()

// Endpoint do dodawania nowej rezerwacji
router.post('/', async (req, res) => {
	try {
		const reservation = req.body
		await reservation.save()
		res.status(200).json(reservation)
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
		res.json({ message: 'Reservation deleted' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

module.exports = router
