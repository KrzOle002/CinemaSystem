import { useEffect, useState } from 'react'
import styled from 'styled-components'
import SeatMap from '../../../components/SeatMap/SeatMap'
import TotalCost from '../../../components/TotalCost'
import { useReservationContext } from '../../../context/ReservationContext'
import SubmitButton from '../../../components/SubmitButton'
import useAuthHook from '../../../utils/auth/useAuth'

const Tickets = () => {
	const { reservation, setReservation, setStep } = useReservationContext()

	const { isAuthenticated } = useAuthHook()
	const [selected, setSelected] = useState<string[]>([])

	const addReservation = () => {
		const ticketCost = selected.length * 20 + 2

		if (selected.length > 0) {
			setReservation({
				...reservation,
				cost: ticketCost,
				seats: selected,
			})
			if (isAuthenticated()) {
				setStep('payment')
			} else {
				setStep('personal')
			}
		}
	}

	useEffect(() => {
		if (reservation?.seats) setSelected(reservation.seats)
	}, [])

	return (
		<Wrapper>
			<TicketHeader>Wybierz miejsca</TicketHeader>
			<SeatMap selected={selected} setSelected={setSelected} />
			<TotalCost selected={selected} setSelected={setSelected} />
			<SubmitButton type={'button'} disabled={selected.length < 1} onClick={addReservation} className='success' fullWidth>
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
