export interface MovieModelSend {
	uid?: string
	title: string
	description: string
	cover: Blob[]
	genre: string[]
	director: string
	casts: string[]
	productionCountry: string
	screeningLength: string
	ageRestrictions: string
	productionYear: string
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
}
