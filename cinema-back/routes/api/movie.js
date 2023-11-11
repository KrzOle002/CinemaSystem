const express = require('express')
const router = express.Router()
const Room = require('../../models/Room')
const Movie = require('../../models/Movie')
const Screening = require('../../models/Screening')
const multer = require('multer')
const auth = require('../../middleware/auth')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/images')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	},
})

const upload = multer({ storage: storage })

router.get('/movies/:id', async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id)
		if (!movie) {
			return res.status(404).json({ message: 'Film not found' })
		}
		res.json(movie)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

router.post('/movies', upload.single('cover'), async (req, res) => {
	const movie = new Movie({
		title: req.body.title,
		description: req.body.description,
		director: req.body.director,
		genre: req.body.genre,
		casts: req.body.casts,
		productionCountry: req.body.productionCountry,
		screeningLength: req.body.screeningLength,
		ageRestrictions: req.body.ageRestrictions,
		cover: {
			path: req.file.path.replace(/\\/g, '/').replace('public', ''),
		},
	})
	try {
		const newMovie = await movie.save()
		res.status(201).json(newMovie)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

router.patch('/movies/:id', async (req, res) => {
	try {
		const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
		if (!movie) {
			return res.status(404).json({ message: 'Film not found' })
		}
		res.json(movie)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

router.delete('/movies/:id', async (req, res) => {
	try {
		const movie = await Movie.findByIdAndRemove(req.params.id)
		if (!movie) {
			return res.status(404).json({ message: 'Film not found' })
		}
		res.json({ message: 'Film deleted' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

router.get('/movies', async (req, res) => {
	try {
		const movies = await Movie.find()

		// Mapowanie zwraca tablicę obiektów Promise, więc możemy użyć Promise.all do oczekiwania na ich zakończenie
		const moviesWithScreenings = await Promise.all(
			movies.map(async movie => {
				const screenings = await Screening.find({ movieId: movie.id }).populate('roomId').exec()
				// Zwracamy nowy obiekt zawierający informacje o filmie i ekranizacjach
				return { ...movie.toObject(), screenings }
			})
		)

		res.json(moviesWithScreenings)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

router.get('/movies/:movieId/screenings', async (req, res) => {
	try {
		const { movieId } = req.params

		const movie = await Movie.findById(movieId)
		if (!movie) {
			return res.status(404).json({ success: false, message: 'Film nie znaleziony' })
		}

		// Pobranie ekranizacji dla danego filmu z informacjami o pokojach
		const screenings = await Screening.find({ movieId }).populate('roomId').exec()

		movie.screenings = screenings

		res.status(200).json({
			movie,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})
module.exports = router
