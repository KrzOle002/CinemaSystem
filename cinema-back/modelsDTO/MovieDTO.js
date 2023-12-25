class MovieDTO {
	constructor({ title, description, cover, genre, director, casts, productionCountry, productionYear, screeningLength, ageRestrictions } = {}) {
		this.title = title || ''
		this.description = description || ''
		this.cover = cover || ''
		this.genre = genre || []
		this.director = director || ''
		this.casts = casts || []
		this.productionCountry = productionCountry || ''
		this.productionYear = productionYear || 0
		this.screeningLength = screeningLength || 0
		this.ageRestrictions = ageRestrictions || 0
	}
}

module.exports = MovieDTO
