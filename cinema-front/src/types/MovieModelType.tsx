export interface MovieModelSend {
	title: string
	description: string
	cover: Blob
	genre: string[]
	director: string
	casts: string[]
	productionCountry: string
	screeningLength: string
	ageRestrictions: string
	productionYear: string
	selectedHours: [
		{
			hour: number
			isChecked: boolean
		}
	]
	dateFrom: Date
	dateTo: Date
}

export interface MovieModel {
	_id: number
	uid?: string
	title: string
	description: string
	cover: { path: string }
	genre: string[]
	director: string
	casts: string[]
	productionCountry: string
	screeningLength: number
	ageRestrictions: number
	productionYear: number
	screenings: [
		{
			_id: string
			roomId: string
			movieId: string
			date: Date
		}
	]
}
