import React from 'react'
import { useReservationContext } from '../../../context/ReservationContext'
import styled from 'styled-components'
import SectionHeader from '../../../components/SectionHeader'
import SeatMap from '../../../components/SeatMap/SeatMap'

const Tickets = () => {
	const { reservation } = useReservationContext()

	return (
		<Wrapper>
			<TicketHeader>Wybierz miejsc biletów</TicketHeader>
			<SeatMap />
		</Wrapper>
	)
}

export default Tickets

const Wrapper = styled.div`
	width: 100%;

	:first-child {
		margin: 0;
		font-size: 25px;
		line-height: 25px;
	}
`
const TicketHeader = styled(SectionHeader)``
