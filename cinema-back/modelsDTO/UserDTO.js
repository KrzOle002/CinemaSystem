class UserDTO {
	constructor({ name, surname, email, password, type, date } = {}) {
		this.name = name || ''
		this.surname = surname || ''
		this.email = email || ''
		this.password = password || ''
		this.type = type || 'user'
		this.date = date || new Date()
	}
}

module.exports = UserDTO
