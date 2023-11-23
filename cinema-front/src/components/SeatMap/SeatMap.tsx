import React, { useEffect, useState } from 'react'
import { useReservationContext } from '../../context/ReservationContext'
import useAuthHook from '../../utils/auth/useAuth'
import axios from 'axios'
import { ScreeningModel, SeatModel } from '../../types/ScreeningModelType'

const SeatMap = () => {
	const { reservation, setReservation } = useReservationContext()
	const [seats, setSeats] = useState<SeatModel[]>()
	const { api } = useAuthHook()

	const fetchSeats = async () => {
		try {
			if (reservation?.screeningId) {
				const response = await axios.get(api + `/api/screening/screenings/${reservation.screeningId}`)

				const screening: ScreeningModel = response.data

				const room = await axios.get(api + `/api/seat/seats/${screening.roomId._id}/schedule/${reservation.screeningId}`)
				const roomSeats = room.data
				setSeats(roomSeats)
			}
		} catch (error) {
			setSeats([])
		}
	}

	useEffect(() => {
		fetchSeats()
	}, [reservation])

	return (
		<div>
			{seats?.map(seat => {
				return (
					<div key={seat.seatId}>
						{seat.row} {seat.number}
						{seat.empty ? <p>Wolne</p> : <p>Not Wolne</p>}
					</div>
				)
			})}
		</div>
	)
}

export default SeatMap
