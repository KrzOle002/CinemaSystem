const nodemailer = require('nodemailer')
const express = require('express')
const router = express.Router()
const transporter = nodemailer.createTransport({
	host: 'smtp-mail.outlook.com',
	port: 587,
	secure: false,
	auth: {
		user: 'cinemaFordon12@outlook.com',
		pass: 'P@ssword2!',
	},
})

const name = 'John'
const surname = 'Doe'

// Treść HTML maila
const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nowy film trafił do naszego repertuaru</title>
</head>
<body style="background-color: #1C1C27; color: #FFF9FB; font-family: 'Arial', sans-serif; ">

    <div style="background-color: #D0153F; padding: 20px; text-align: center; font-size: 32px">
        <h1>Nowy film trafił do naszego repertuaru</h1>
    </div>

    <div style="padding: 20px; font-size: 20px">
    <p>Cześć Joe Doe,</p>
    <p>Z radością informujemy Cię o najnowszym dodatku do naszej kolekcji filmowej!</p>
    <p>Sprawdź szczegóły i upewnij się, że nie przegapisz nowego hitu kinowego.</p>
    
    <!-- Szczegóły filmu (Zamień na rzeczywiste dane filmowe) -->
    <h2>Tytuł filmu: O psie, który jeździł koleją</h2>
    <p>Data premiery: 10.11.2023</p>
    <p>Gatunek: Przygodowy</p>
    
    <p>Miłego spędzenia czasu w kinie!</p>
    
    <div style="margin-top: 20px;">
        <p>Z pozdrowieniami,</p>
        <p>Twój Zespół Kina</p>
    </div>
    </div>

</body>
</html>
`

const mailOptions = {
	from: 'noreply@kino-fordon.pl <cinemaFordon12@outlook.com>',
	to: 'Thekriso@wp.pl',
	subject: 'Nowy film trafił do naszego repertuaru',
	html: htmlTemplate,
}

router.get('/send-email', (req, res) => {
	transporter.sendMail(mailOptions, function (err, info) {
		if (err) {
			console.log(err)
			res.status(500).json({ error: 'Error sending email' })
			return
		}
		console.log('Sent: ' + info.response)
		res.json({ message: 'Email sent successfully' })
	})
})

module.exports = router
