export interface MovieModel {
	uid?: {
		type: String
		require: true
	}
	title: {
		type: String
		require: true
	}
	description: {
		type: String
		required: true
	}
	cover: {
		type: String
		required: true
	}
	banner: {
		type: String
	}
	genre: {
		type: [String]
		require: true
	}
	director: {
		type: String
		require: true
	}
	casts: {
		type: [String]
		require: true
	}
	productionCountry: {
		type: String
		require: true
	}
	screeningLength: {
		type: Number
		require: true
	}
	ageRestrictions: {
		type: Number
	}
}
