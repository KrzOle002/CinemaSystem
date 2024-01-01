const express = require('express')
const Reservation = require('../../models/Reservation')
const router = express.Router()
const ReservationDTO = require('../../modelsDTO/ReservationDTO')
const ScreeningDTO = require('../../modelsDTO/ScreeningDTO')
const SeatDTO = require('../../modelsDTO/SeatDTO')
const MovieDTO = require('../../modelsDTO/MovieDTO')
const RoomDTO = require('../../modelsDTO/RoomDTO')

const ReservedSeat = require('../../models/ReservedSeats')
const Seat = require('../../models/Seat')
const Screening = require('../../models/Screening')
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

router.get('/reservations', async (req, res) => {
	try {
		const reservations = await Reservation.find()
		res.json(reservations)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

router.get('/reservations/userAll', async (req, res) => {
	try {
		const reservations = await Reservation.find({ email: req.query.email })

		const reservationsDTO = await Promise.all(
			reservations.map(async reservation => {
				const reservationDto = new ReservationDTO(reservation)

				const screening = new ScreeningDTO(await Screening.findById(reservation.screeningId))

				const room = await Room.findById(screening.roomId)
				const movie = await Movie.findById(screening.movieId)
				const seats = await Promise.all(
					reservation.seats.map(async seat => {
						return new SeatDTO(await Seat.findById(seat._id))
					})
				)

				reservationDto.screeningId = screening
				reservationDto.screeningId.roomId = new RoomDTO(room)
				reservationDto.screeningId.movieId = new MovieDTO(movie)
				reservationDto.seats = seats

				return reservationDto
			})
		)

		reservationsDTO.sort((a, b) => new Date(b.screeningId.date) - new Date(a.screeningId.date))

		res.json(reservationsDTO)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

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
