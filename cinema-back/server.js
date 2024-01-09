const express = require('express')
const app = require('./app')
const path = require('path')

require('./schedule/cronmailer')

const PORT = process.env.PORT || 5000

app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`))
