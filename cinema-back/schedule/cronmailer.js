const cron = require('node-cron')
const User = require('../models/User')
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
	host: 'smtp-mail.outlook.com',
	port: 587,
	secure: false,
	auth: {
		user: 'cinemaFordon12@outlook.com',
		pass: '',
	},
})
cron.schedule('0 18 * * 5', () => {
	sendEmailFunction()
})

const sendEmailFunction = async () => {
	const users = await User.find()
	for (const user of users) {
		const emailContent = user.email

		const htmlTemplate = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Promocja Powrót Do Szkoły</title>
</head>
<body style="background-color: #1C1C27; color: #FFF9FB; font-family: 'Arial', sans-serif; ">

    <div style="background-color: #4E9F3D; padding: 20px; text-align: center; font-size: 32px">
        <h1>Specjalna Promocja na Powrót Do Szkoły!</h1>
    </div>

    <div style="padding: 20px; font-size: 20px">
        <p>Cześć ${user.name}  ${user.surname},</p>
        <p>Z okazji powrotu do szkoły mamy dla Ciebie specjalną ofertę!</p>
        <p>Skorzystaj z kodu promocyjnego <strong>PowrótDoSzkoły</strong> i odbierz 5% zniżki na każdy film w naszym kinie!</p>
        
        <!-- Szczegóły oferty -->
        <p>Kod jest ważny jednorazowo dla zalogowanych użytkowników i może być wykorzystany przy następnym zakupie biletu.</p>
        <p>Nie czekaj! Twoja zniżka czeka na Ciebie!</p>
        
        <p>Oferta ważna do [data zakończenia promocji].</p>
        
        <div style="margin-top: 20px;">
            <p>Miłego seansu i udanego roku szkolnego!</p>
            <p>Z pozdrowieniami,</p>
            <p>Twój Zespół Kina</p>
        </div>
    </div>

</body>
</html>
`
		const mailOptions = {
			from: 'noreply@kino-fordon.pl <cinemaFordon12@outlook.com>',
			to: emailContent,
			subject: `Oferta promocyjna`,
			html: htmlTemplate,
		}

		transporter.sendMail(mailOptions, function (err, info) {
			if (err) {
				console.log(err)
			}
		})
	}
}
