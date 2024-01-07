const express = require('express')
const Seat = require('../../models/Seat')
const ReservedSeat = require('../../models/ReservedSeats')
const router = express.Router()
const mongoose = require('mongoose')

router.post('/seats', async (req, res) => {
	try {
		const seatsData = req.body

		// Utwórz tablicę nowych miejsc
		const newSeats = seatsData.map(seatData => new Seat(seatData))

		// Zapisz nowe miejsca w bazie danych
		await Seat.insertMany(newSeats)

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

router.post('/seats/current/', async (req, res) => {
	try {
		const seatIds = req.body

		if (!seatIds || !Array.isArray(seatIds) || seatIds.length === 0) {
			return res.status(400).json({ success: false, message: 'Nieprawidłowe lub puste ID siedzeń' })
		}
		const seatObjectIds = seatIds.map(seatId => new mongoose.Types.ObjectId(seatId))

		const seats = await Seat.find({ _id: { $in: seatObjectIds } })

		if (!seats || seats.length === 0) {
			return res.status(404).json({ success: false, message: 'Nie znaleziono siedzeń dla podanych ID' })
		}

		res.status(200).json(seats)
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

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

router.get('/seats/:roomId', async (req, res) => {
	try {
		const seat = await Seat.find({ roomId: req.params.roomId })
		if (!seat) {
			return res.status(404).json({ message: 'Seat not found' })
		}
		res.json(seat)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

router.get('/seats/:roomId/schedule/:screeningId', async (req, res) => {
	try {
		const seats = await Seat.find({ roomId: req.params.roomId })

		const reservedSeats = await ReservedSeat.find({ screeningId: req.params.screeningId })
		const isReserved = seat => {
			return reservedSeats.some(reservedSeat => reservedSeat.seatId.equals(seat.id))
		}
		const seatsList = seats.sort(compareSeats).map(seat => {
			return {
				seatId: seat.id,
				row: seat.row,
				number: seat.number,
				roomId: seat.roomId,
				empty: !isReserved(seat),
			}
		})

		res.json(seatsList)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

router.post('/seats/reservation', async (req, res) => {
	try {
		const reservationSeat = new ReservedSeat(req.body)

		const newReservedSeat = await reservationSeat.save()

		res.status(200).json(newReservedSeat)
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

function compareSeats(a, b) {
	if (a.row === b.row) {
		return a.number - b.number
	}
	return a.row - b.row
}
module.exports = router
