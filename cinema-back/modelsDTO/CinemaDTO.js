class CinemaDTO {
	constructor({ name, address, city, zipCode, phone, description } = {}) {
		this.name = name || ''
		this.address = address || ''
		this.city = city || ''
		this.zipCode = zipCode || ''
		this.phone = phone || []
		this.description = description || ''
	}
}

module.exports = CinemaDTO
