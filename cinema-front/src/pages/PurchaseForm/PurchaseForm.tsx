import styled from 'styled-components'
import Payments from './Components/Payments'
import { useReservationContext } from '../../context/ReservationContext'
import { useLocation, useParams } from 'react-router-dom'

const PurchaseForm = () => {
	const { movieId } = useParams()
	const location = useLocation()
	const screening = new URLSearchParams(location.search).get('screening')
	const date = new URLSearchParams(location.search).get('date')

	const { step } = useReservationContext()
	return <DashboardContainer>{step === 'payment' && <Payments />}</DashboardContainer>
}

export default PurchaseForm

const DashboardContainer = styled.div`
	color: white;
	padding: 20px 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
