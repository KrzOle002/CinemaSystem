import React, { useEffect, useState } from 'react'
import { useReservationContext } from '../../context/ReservationContext'
import useAuthHook from '../../utils/auth/useAuth'
import axios from 'axios'
import { ScreeningModel, SeatModel } from '../../types/ScreeningModelType'
import SeatItem from './SeatItem'
import styled from 'styled-components'
import SeatLegend from './SeatLegend'

interface SeatMapType {
	selected: string[]
	setSelected: React.Dispatch<React.SetStateAction<string[]>>
}

const SeatMap = ({ selected, setSelected }: SeatMapType) => {
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

	const rows = Array.from({ length: 9 }, (_, rowIndex) => {
		return (
			<ObjectRow key={rowIndex}>
				<SeatRow>
					{seats
						?.filter(seat => seat.row === rowIndex + 1)
						.map(seat => (
							<SeatItem key={seat.seatId} seat={seat} selected={selected} setSelected={setSelected} />
						))}
				</SeatRow>
			</ObjectRow>
		)
	})

	return (
		<Wrapper>
			<Container>
				<SeatLegend />
				<ScreenSite>Ekran</ScreenSite>
				<SeatColumn>{rows}</SeatColumn>
			</Container>
		</Wrapper>
	)
}

export default SeatMap

const Wrapper = styled.div`
	padding: 30px 0;
	width: 100%;
	margin: 0 auto;
`
const Container = styled.div`
	width: 390px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
`
const SeatColumn = styled.div`
	gap: 10px;
	display: flex;
	flex-direction: column;
`

const SeatRow = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
`
const ObjectRow = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
	justify-content: space-between;
	align-items: center;
`
const ScreenSite = styled.div`
	width: 100%;
	height: 20px;
	font-size: 15px;
	font-weight: bold;
	text-transform: uppercase;
	margin: 0 auto;
	margin-bottom: 70px;
	line-height: 25px;
	background-color: ${({ theme }) => theme.colors.screen};
	color: ${({ theme }) => theme.colors.white};
	text-align: center;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	box-shadow: 0px 5px 5px rgb(68, 68, 68, 0.5);
`
