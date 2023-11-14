const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const Room = require('../../models/Room')
const Movie = require('../../models/Movie')
const Screening = require('../../models/Screening')
const auth = require('../../middleware/auth')

// Pobieranie wszystkich ekranizacji
router.get('/screenings', async (req, res) => {
	try {
		const screenings = await Screening.find()
		res.status(200).json(screenings)
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

// Pobieranie ekranizacji o określonym ID
router.get('/screenings/:id', async (req, res) => {
	try {
		const screening = await Screening.findById(req.params.id)
		if (!screening) {
			return res.status(404).json({ success: false, message: 'Ekranizacja nie znaleziona' })
		}
		res.status(200).json(screening)
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

// Dodawanie nowej ekranizacji
router.post('/screenings', async (req, res) => {
	try {
		const newScreening = new Screening(req.body)
		await newScreening.save()
		res.status(201).json({ success: true, message: 'Dodano nową ekranizację' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

// Aktualizacja ekranizacji o określonym ID
router.put('/screenings/:id', async (req, res) => {
	try {
		const updatedScreening = await Screening.findByIdAndUpdate(req.params.id, req.body, { new: true })
		if (!updatedScreening) {
			return res.status(404).json({ success: false, message: 'Ekranizacja nie znaleziona' })
		}
		res.status(200).json({ success: true, message: 'Zaktualizowano ekranizację', data: updatedScreening })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

// Usuwanie ekranizacji o określonym ID
router.delete('/screenings/:id', async (req, res) => {
	try {
		const deletedScreening = await Screening.findByIdAndRemove(req.params.id)
		if (!deletedScreening) {
			return res.status(404).json({ success: false, message: 'Ekranizacja nie znaleziona' })
		}
		res.status(200).json({ success: true, message: 'Usunięto ekranizację', data: deletedScreening })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

module.exports = router
