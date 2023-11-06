export interface MovieModel {
	uid?: string
	title: string
	description: string
	cover: FileList
	banner: FileList
	genre: string[]
	director: string
	casts: string[]
	productionCountry: string
	screeningLength: string
	ageRestrictions: string
}
