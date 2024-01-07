class ProfileDTO {
	constructor({ user, birthDate, gender, city, zipCode, phoneNumber, date } = {}) {
		this.user = user || null // Assuming user is an ObjectId, set to null if not provided
		this.birthDate = birthDate || null
		this.gender = gender || ''
		this.city = city || ''
		this.zipCode = zipCode || ''
		this.phoneNumber = phoneNumber || ''
		this.date = date || new Date()
	}

	static createFromDatabase(profileData) {
		return new ProfileDTO(profileData)
	}
}

module.exports = ProfileDTO
