const express = require('express')
const Seat = require('../../models/Seat')
const ReservedSeat = require('../../models/ReservedSeats')
const router = express.Router()

router.post('/seats', async (req, res) => {
	try {
		const seatsData = req.body

		// Utwórz tablicę nowych miejsc
		const newSeats = seatsData.map(seatData => new Seat(seatData))

		// Zapisz nowe miejsca w bazie danych
		const savedSeats = await Seat.insertMany(newSeats)

		res.status(200).json({ success: true, message: 'Dodano nowe miejsca' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

// Endpoint to get all seats
router.get('/seats', async (req, res) => {
	try {
		const seats = await Seat.find()
		res.json(seats)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

// Endpoint to get a single seat by ID
router.get('/seats/:id', async (req, res) => {
	try {
		const seat = await Seat.findById(req.params.id)
		if (!seat) {
			return res.status(404).json({ message: 'Seat not found' })
		}
		res.json(seat)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

// Endpoint to update a seat by ID
router.put('/seats/:id', async (req, res) => {
	try {
		const updatedSeat = await Seat.findByIdAndUpdate(req.params.id, req.body, { new: true })
		if (!updatedSeat) {
			return res.status(404).json({ message: 'Seat not found' })
		}
		res.json(updatedSeat)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

// Endpoint to delete a seat by ID
router.delete('/seats/:id', async (req, res) => {
	try {
		const deletedSeat = await Seat.findByIdAndRemove(req.params.id)
		if (!deletedSeat) {
			return res.status(404).json({ message: 'Seat not found' })
		}
		res.json({ message: 'Seat deleted' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

router.get('/seats-schedule/:roomId', async (req, res) => {
	try {
		// Pobieranie wszystkich miejsc
		const seats = await Seat.find(req.params.roomId)

		// Pobieranie zarezerwowanych miejsc wraz z ich statusami
		const reservedSeats = await ReservedSeat.find().populate('seatId')

		// Tworzenie listy rozkładu miejsc wraz z ich statusami
		const seatsSchedule = seats.map(seat => {
			const reservedSeat = reservedSeats.find(reservedSeat => reservedSeat.seatId._id.equals(seat._id))

			return {
				seatId: seat._id,
				row: seat.row,
				number: seat.number,
				roomId: seat.roomId,
				status: reservedSeat ? 'Reserved' : 'Available',
			}
		})

		res.json(seatsSchedule)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

module.exports = router
