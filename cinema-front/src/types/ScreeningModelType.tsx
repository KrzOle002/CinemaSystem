export interface ScreeningModel {
	roomId: Room
	movieId: string
	date: Date
}

export interface Room {
	_id: string
	roomNumber: number
	places: number
	description: string
}

export interface SeatModel {
	seatId: string
	row: number
	number: number
	roomId: string
	empty: boolean
}

export interface CurrentSeat {
	_id: string
	row: number
	number: number
	roomId: string
}
