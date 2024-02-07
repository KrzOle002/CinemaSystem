const nodemailer = require("nodemailer");
const express = require("express");
const Reservation = require("../../models/Reservation");
const Movie = require("../../models/Movie");
const Room = require("../../models/Room");
const Seat = require("../../models/Seat");
const User = require("../../models/User");
const router = express.Router();
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: "cinemaFordon12@outlook.com",
    pass: "P@ssword2!",
  },
});

router.post("/send-email", async (req, res) => {
  const mailInfo = req.body;

  try {
    const users = await User.find();
    let failedEmails = [];

    for (const user of users) {
      const htmlTemplate = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Nowy film trafił do naszego repertuaru</title>
                </head>
                <body style="background-color: #1C1C27; color: #FFF9FB; font-family: 'Arial', sans-serif;">
                    <div style="background-color: #D0153F; padding: 20px; text-align: center; font-size: 32px">
                        <h1>Nowy film trafił do naszego repertuaru</h1>
                    </div>
                    <div style="padding: 20px; font-size: 20px">
                        <p>Cześć ${user.name} ${user.surname},</p>
                        <p>Z radością informujemy Cię o najnowszym dodatku do naszej kolekcji filmowej!</p>
                        <p>Sprawdź szczegóły i upewnij się, że nie przegapisz nowego hitu kinowego.</p>
                        <h2>Tytuł filmu: ${mailInfo.title}</h2>
                        <p>Gatunek: ${mailInfo.genre}</p>
                        <p>Miłego spędzenia czasu w kinie!</p>
                        <div style="margin-top: 20px;">
                            <p>Z pozdrowieniami,</p>
                            <p>Twój Zespół Kina</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

      const mailOptions = {
        from: "noreply@kino-fordon.pl <cinemaFordon12@outlook.com>",
        to: user.email,
        subject: "Nowy film trafił do naszego repertuaru",
        html: htmlTemplate,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (err) {
        console.error("Error sending email to: " + user.email, err);
        failedEmails.push(user.email);
      }
    }

    if (failedEmails.length > 0) {
      res.status(500).json({
        error: "Error sending emails to some addresses",
        failedEmails,
      });
    } else {
      res.json({ message: "All emails sent successfully" });
    }
  } catch (err) {
    console.error("Error fetching users", err);
    res.status(500).json({ error: "Error fetching users" });
  }
});

router.post("/reservation-mail", async (req, res) => {
  try {
    const mailInfo = req.body;
    console.log(mailInfo);
    const reservationInfo = await Reservation.findById(mailInfo.reservationId)
      .populate("screeningId")
      .populate({
        path: "seats",
        model: Seat,
      })
      .exec();

    const movieInfo = await Movie.findById(reservationInfo.screeningId.movieId);
    const roomInfo = await Room.findById(reservationInfo.screeningId.roomId);

    const ticketsHtml = reservationInfo.seats
      .map(
        (seat) => `
	<div class="ticket">
		<div class="movie-title">Tytuł filmu: ${movieInfo.title}</div>
		<div class="details">Data seansu: ${reservationInfo.screeningId.date.toLocaleDateString(
      "pl-PL",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      },
    )}, godzina ${reservationInfo.screeningId.date.getUTCHours()}:00</div>
		<div class="details">Miejsce: Sala ${roomInfo.roomNumber}, Rząd ${seat.row}</div>
		<div class="seat-number">Numer miejsca: ${seat.number}</div>
		<div class="barcode">${generateRandomNumber()}</div>
	</div>
`,
      )
      .join("");

    const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zakupiono bilety</title>
	<style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #fff;
            text-align: center;
        }

        .ticket {
			color:black;
            width: 300px;
            margin: 50px auto;
            padding: 20px;
            border: 2px solid #333;
            background-color: #f8f8f8;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .movie-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .details {
            font-size: 14px;
            margin-bottom: 10px;
        }

        .seat-number {
            font-size: 16px;
            margin-bottom: 20px;
        }

        .barcode {
            width: 100%;
            height: 50px;
            background-color: #333;
            color: #fff;
            line-height: 50px;
            margin-top: 20px;
        }
    </style>
</head>
<body style="background-color: #1C1C27; color: #FFF9FB; font-family: 'Arial', sans-serif; ">

    <div style="background-color: #D0153F; padding: 20px; text-align: center; font-size: 32px">
        <h1>Zakupione bilety</h1>
    </div>

    <div style="padding: 20px; font-size: 20px">
        <div style="padding: 20px; font-size: 20px">
            <p>Cześć ${mailInfo.user.name} ${mailInfo.user.surname},</p>
            <p>Dziękujemy za zakup biletów w naszym kinie!</p>
            <p>Poniżej znajdziesz listę biletów:</p>
            
            ${ticketsHtml}
            
            <p>Życzymy udanego seansu!</p>
            
            <div style="margin-top: 20px;">
                <p>Z pozdrowieniami,</p>
                <p>Twój Zespół Kina</p>
            </div>
        </div>
    </div>

</body>
</html>`;

    const mailOptions = {
      from: "noreply@kino-fordon.pl <cinemaFordon12@outlook.com>",
      to: mailInfo.user.email,
      subject: `Zakupione bilety Cinema Fordon z nr transakcji ${mailInfo.reservationId}`,
      html: htmlTemplate,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Error sending email" });
        return;
      }
    });
    res.json({ message: "Email sent successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;

function generateRandomNumber() {
  const section1 = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  const section2 = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  const randomNumber = `${section1}-${section2}`;
  return randomNumber;
}
