class SeatDTO {
	constructor({ row, number, roomId } = {}) {
		this.row = row || 0
		this.number = number || 0
		this.roomId = roomId || null // Assuming roomId is an ObjectId, set to null if not provided
	}
}

module.exports = SeatDTO
