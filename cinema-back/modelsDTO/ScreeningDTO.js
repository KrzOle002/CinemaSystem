class ScreeningDTO {
	constructor({ roomId, movieId, date } = {}) {
		this.roomId = roomId || null // Assuming roomId is an ObjectId, set to null if not provided
		this.movieId = movieId || null // Assuming movieId is an ObjectId, set to null if not provided
		this.date = date || new Date()
	}
}

module.exports = ScreeningDTO
