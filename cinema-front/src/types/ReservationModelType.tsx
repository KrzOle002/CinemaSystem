export interface ReservationData {
	active: boolean
	screeningId: Screening
	cost: number
	reservationDate: string
	discountId: string | null
	email: string
	seats: Seat[]
}

interface Screening {
	roomId: Room
	movieId: Movie
	date: string
}

interface Room {
	roomNumber: number
	places: number
	description: string
}

interface Movie {
	title: string
	description: string
	cover: Cover
	genre: string[]
	director: string
	casts: string[]
	productionCountry: string
	productionYear: string
	screeningLength: number
	ageRestrictions: number
}

interface Cover {
	path: string
}

interface Seat {
	row: number
	number: number
	roomId: string
}
