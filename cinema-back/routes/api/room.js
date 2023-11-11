const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const Room = require('../../models/Room')
const Movie = require('../../models/Movie')
const Screening = require('../../models/Screening')
const auth = require('../../middleware/auth')

router.get('/rooms', async (req, res) => {
	try {
		const rooms = await Room.find()
		res.status(200).json(rooms)
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

// Pobieranie pokoju o określonym ID
router.get('/rooms/:id', async (req, res) => {
	try {
		const room = await Room.findById(req.params.id)
		if (!room) {
			return res.status(404).json({ success: false, message: 'Pokój nie znaleziony' })
		}
		res.status(200).json({ success: true, message: 'Pobrano pokój' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

// Dodawanie nowego pokoju
router.post('/rooms', async (req, res) => {
	try {
		const newRoom = new Room(req.body)
		const savedRoom = await newRoom.save()
		res.status(200).json({ success: true, message: 'Dodano nowy pokój' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

// Aktualizacja pokoju o określonym ID
router.put('/rooms/:id', async (req, res) => {
	try {
		const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true })
		if (!updatedRoom) {
			return res.status(404).json({ success: false, message: 'Pokój nie znaleziony' })
		}
		res.status(200).json({ success: true, message: 'Zaktualizowano pokój' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

// Usuwanie pokoju o określonym ID
router.delete('/rooms/:id', async (req, res) => {
	try {
		const deletedRoom = await Room.findByIdAndRemove(req.params.id)
		if (!deletedRoom) {
			return res.status(404).json({ success: false, message: 'Pokój nie znaleziony' })
		}
		res.status(200).json({ success: true, message: 'Usunięto pokój' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Błąd serwera' })
	}
})

module.exports = router
