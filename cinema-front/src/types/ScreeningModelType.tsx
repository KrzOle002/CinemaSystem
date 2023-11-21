export interface ScreeningModel {
	roomId: Room
	movieId: string
	date: Date
}

export interface Room {
	roomNumber: number
	places: number
	description: string
}
