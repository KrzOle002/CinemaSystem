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
    <title>New Movie Alert</title>
</head>
<body style="background-color: #1C1C27; color: #FFF9FB; font-family: 'Arial', sans-serif; ">

    <div style="background-color: #D0153F; padding: 20px; text-align: center; font-size: 32px">
        <h1>New Movie Alert!</h1>
    </div>

    <div style="padding: 20px; font-size: 20px">
        <p>Hello {name} {surname},</p>
        <p>We are excited to inform you about the latest addition to our movie collection!</p>
        <p>Check out the details and make sure not to miss the new blockbuster.</p>

        <!-- Movie Details (Replace with actual movie details) -->
        <h2>Movie Title: [Movie Title]</h2>
        <p>Release Date: [Release Date]</p>
        <p>Genre: [Genre]</p>

        <p>Enjoy your time at the cinema!</p>

        <div style="margin-top: 20px;">
            <p>Best regards,</p>
            <p>Your Cinema Team</p>
        </div>
    </div>

</body>
</html>
`

const mailOptions = {
	from: 'noreply@kino-fordon.pl <cinemaFordon12@outlook.com>',
	to: 'Thekriso@wp.pl',
	subject: 'New Movie Alert',
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
