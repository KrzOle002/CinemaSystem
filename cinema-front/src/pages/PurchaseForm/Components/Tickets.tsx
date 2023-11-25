import { useState } from 'react'
import styled from 'styled-components'
import SeatMap from '../../../components/SeatMap/SeatMap'
import TotalCost from '../../../components/TotalCost'
import { useReservationContext } from '../../../context/ReservationContext'
import SubmitButton from '../../../components/SubmitButton'

const Tickets = () => {
	const { reservation } = useReservationContext()

	const [selected, setSelected] = useState<string[]>([])
	return (
		<Wrapper>
			<TicketHeader>Wybierz miejsca</TicketHeader>
			<SeatMap selected={selected} setSelected={setSelected} />
			<TotalCost selected={selected} setSelected={setSelected} />
			<SubmitButton type={'button'} className='success' fullWidth>
				Zamów
			</SubmitButton>
		</Wrapper>
	)
}

export default Tickets

const Wrapper = styled.div`
	width: 100%;
`
const TicketHeader = styled.span`
	@media screen and (max-width: 640px) {
		font-size: 24px;
		text-align: center;
	}
	font-size: 36px;
	font-family: 'Saira Stencil One', sans-serif;
	text-transform: uppercase;
	margin: 0;
	line-height: 36px;
`
