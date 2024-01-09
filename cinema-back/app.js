const express = require('express')
const app = express()
const path = require('path')
const connectDB = require('./config/db')
const cors = require('cors')

connectDB()

app.use(express.json({ extended: false }))
app.use(cors())
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-auth-token')
	res.setHeader('Access-Control-Allow-Credentials', 'true')
	next()
})
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => res.send('API Running'))

app.use('/api/seat', require('./routes/api/seat'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/movie', require('./routes/api/movie'))
app.use('/api/room', require('./routes/api/room'))
app.use('/api/screening', require('./routes/api/screening'))
app.use('/api/reservation', require('./routes/api/reservation'))
app.use('/api/mail', require('./routes/api/nodemailer'))
app.use('/api/rating', require('./routes/api/rating'))

module.exports = app
