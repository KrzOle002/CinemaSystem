const express = require('express')
const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(express.json({ extended: false }))

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
	next()
})

app.get('/', (req, res) => res.send('API Running'))

app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/cinema', require('./routes/api/cinema'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
