const express = require('express')
const router = express.Router()
const Movie = require('../../models/Movie')
const multer = require('multer')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/images')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	},
})

const upload = multer({ storage: storage })

router.get('/movies', async (req, res) => {
	try {
		const movies = await Movie.find()
		res.json(movies)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

router.get('/movies/:uid', async (req, res) => {
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

router.post('/movies', upload.fields([{ name: 'cover', maxCount: 1 }]), async (req, res) => {
	const movie = new Movie(req.body)
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

module.exports = router
