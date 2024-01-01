import styled from 'styled-components'
import { ReservationData } from '../../../types/ReservationModelType'
import { Grid } from '@mui/material'

interface ReservationItemType {
	reservation: ReservationData
}

interface SeatsByRow {
	[key: string]: number[]
}
const ReservationsItem = ({ reservation }: ReservationItemType) => {
	const reservationData = {
		date: reservation.screeningId.date,
		title: reservation.screeningId.movieId.title,
		genre: reservation.screeningId.movieId.genre.join(', '),
		productionYear: reservation.screeningId.movieId.productionYear,
		roomNumber: reservation.screeningId.roomId.roomNumber,
		movieLength: reservation.screeningId.movieId.screeningLength,
	}
	const screeningISODate = reservation.screeningId.date

	const dateParts = screeningISODate.split(/[-T:.Z]/).map(Number)

	const screeningDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], dateParts[3], dateParts[4], dateParts[5])

	const screeningEnd = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], dateParts[3], dateParts[4] + reservationData.movieLength, dateParts[5])
	const currentDate = new Date()

	const isAfterReservationDate = currentDate > screeningEnd

	const rows = reservation.seats.reduce((acc: SeatsByRow, seat) => {
		const rowKey = seat.row.toString()
		if (!acc[rowKey]) {
			acc[rowKey] = []
		}
		acc[rowKey].push(seat.number)
		acc[rowKey].sort((a, b) => a - b)
		return acc
	}, {} as SeatsByRow)

	const renderSeats = () => {
		return Object.entries(rows).map(([row, numbers]) => (
			<div key={row}>
				Rząd {row}: {numbers.map(number => `Miejsce ${number}`).join(', ')}
			</div>
		))
	}

	return (
		<TicketContainer>
			<Title>{reservationData.title}</Title>
			<Grid container justifyContent={'space-between'} spacing={0}>
				<Details>Gatunek: {reservationData.genre}</Details>
				<Details>Rok produkcji: {reservationData.productionYear}</Details>
			</Grid>
			<Grid container justifyContent={'space-between'} spacing={0}>
				<Details>
					{screeningDate.toLocaleDateString('pl-PL', {
						day: '2-digit',
						month: '2-digit',
						year: 'numeric',
						hour: 'numeric',
						minute: 'numeric',
					})}
				</Details>
				<Details>Sala {reservationData.roomNumber}</Details>
			</Grid>

			<Details>{renderSeats()}</Details>
			<Details>Całkowity koszt: {reservation.cost} PLN</Details>
			<Details>
				{!isAfterReservationDate ? (
					<Info style={{ color: '#49c700' }}>Rezerwacja aktywna</Info>
				) : (
					<Info style={{ color: 'red' }}>Rezerwacja niekatywna</Info>
				)}
			</Details>
		</TicketContainer>
	)
}

export default ReservationsItem

const TicketContainer = styled.div`
	border: 1px solid #606060;
	padding: 20px;
	margin: 60px;
	background-color: ${({ theme }) => theme.colors.whiterMid};
	border-radius: 8px;
`

const Title = styled.h2`
	color: white;
	font-size: 20px;
	text-align: center;
	margin: 0;
	padding: 0;
	text-transform: uppercase;
`

const Details = styled.div`
	color: white;
	font-size: 16px;
	font-weight: 700;
	margin: 0;
	padding: 5px;
`
const Info = styled.span`
	font-size: 16px;
	font-weight: 700;
`
