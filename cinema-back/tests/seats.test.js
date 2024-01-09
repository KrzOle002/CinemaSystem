const mongoose = require('mongoose')
jest.mock('../models/Seat')
jest.mock('../models/ReservedSeats')
const Seat = require('../models/Seat')
const ReservedSeat = require('../models/ReservedSeats')

async function getSeatsWithReservationStatus(roomId, screeningId) {
	const seats = await Seat.find({ roomId: roomId })
	const reservedSeats = await ReservedSeat.find({ screeningId: screeningId })

	const isReserved = seat => {
		return reservedSeats.some(reservedSeat => reservedSeat.seatId.equals(seat.id))
	}
	function compareSeats(a, b) {
		if (a.row === b.row) {
			return a.number - b.number
		}
		return a.row - b.row
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

	return seatsList
}

describe('processSeats', () => {
	it('powinno prawidłowo przetwarzać listę miejsc siedzących', async () => {
		const roomId = new mongoose.Types.ObjectId()
		const screeningId = new mongoose.Types.ObjectId()

		const mockSeats = [
			{ id: new mongoose.Types.ObjectId(), row: 1, number: 1, roomId },
			{ id: new mongoose.Types.ObjectId(), row: 1, number: 2, roomId },
		]

		const mockReservedSeats = [{ seatId: mockSeats[1].id, screeningId }]

		Seat.find.mockResolvedValue(mockSeats)
		ReservedSeat.find.mockResolvedValue(mockReservedSeats)

		const result = await getSeatsWithReservationStatus(roomId, screeningId)

		expect(result).toEqual(
			mockSeats.map(seat => ({
				seatId: seat.id,
				row: seat.row,
				number: seat.number,
				roomId: seat.roomId,
				empty: !mockReservedSeats.some(reservedSeat => reservedSeat.seatId.equals(seat.id)),
			}))
		)
	})
})
