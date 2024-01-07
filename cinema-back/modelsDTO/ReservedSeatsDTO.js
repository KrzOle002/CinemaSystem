class ReservedSeatDTO {
	constructor({ seatId, reservationId, screeningId } = {}) {
		this.seatId = seatId || null
		this.reservationId = reservationId || null
		this.screeningId = screeningId || null
	}
}

module.exports = ReservedSeatDTO
