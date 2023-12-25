const express = require('express')

const router = express.Router()

const Rating = require('../../models/Rating')

router.get('/', (req, res) => {
	res.status(200).send()
})

module.exports = router
