export class ReservationDTO {
	constructor({ active, screeningId, cost, reservationDate, discountId, email, seats }) {
		this.active = active
		this.screeningId = screeningId
		this.cost = cost
		this.reservationDate = reservationDate
		this.discountId = discountId
		this.email = email
		this.seats = seats
	}
}
