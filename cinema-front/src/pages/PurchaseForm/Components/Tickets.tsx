import React from 'react'
import { useReservationContext } from '../../../context/ReservationContext'

const Tickets = () => {
	const { reservation } = useReservationContext()
	console.log(reservation)
	return <div>Tickets</div>
}

export default Tickets
