class RoomDTO {
	constructor({ roomNumber, places, description } = {}) {
		this.roomNumber = roomNumber || 0
		this.places = places || 0
		this.description = description || ''
	}
}

module.exports = RoomDTO
