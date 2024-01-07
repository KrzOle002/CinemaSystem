class ReservationDTO {
	constructor({ active, screeningId, cost, reservationDate, discountId, email, seats } = {}) {
		this.active = active || false
		this.screeningId = screeningId || null
		this.cost = cost || 0
		this.reservationDate = reservationDate || new Date()
		this.discountId = discountId || null
		this.email = email || ''
		this.seats = seats || []
	}
}

module.exports = ReservationDTO
