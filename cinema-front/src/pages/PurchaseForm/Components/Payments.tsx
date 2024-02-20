import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PaypalCheckoutButton from '../../../components/PaypalCheckoutButton'
import SubmitButton from '../../../components/SubmitButton'
import EmptyState from '../../../utils/empty/EmptyState'
import useAuthHook from '../../../utils/auth/useAuth'
import { MovieModel } from '../../../types/MovieModelType'
import axios from 'axios'
import { useReservationContext } from '../../../context/ReservationContext'
import PaymentItem from '../../../components/PaymentItem'
import { CurrentSeat } from '../../../types/ScreeningModelType'
import SectionHeader from '../../../components/SectionHeader'
import PaymentDiscount from '../../../components/PaymentDiscount'

interface ScreeningMovie {
	_id: string
	roomId: {
		_id: string
		roomNumber: 1
		places: 200
		description: string
	}
	movieId: {
		cover: {
			path: string
		}
		_id: string
		title: string
		description: string
		genre: string[]
		director: string
		casts: string[]
		productionCountry: string
		screeningLength: number
		ageRestrictions: number
	}
	date: Date
}

const Payments = () => {
	const { reservation, setStep } = useReservationContext()
	const { api, isAuthenticated } = useAuthHook()
	const [movie, setMovie] = useState<ScreeningMovie>()
	const [seats, setSeats] = useState<CurrentSeat[]>()
	const [discount, setDiscount] = useState<number>()

	const sumCosts = () => {
		const mainCost = reservation?.cost ? reservation.cost : 0
		const discountCost = discount ?? 0
		return mainCost - discountCost
	}

	const product = {
		description: 'Rezerwacja miejsc Cinema Fordon',
		price: sumCosts(),
	}

	const fetchData = async () => {
		try {
			const movieResponse = await axios.get(api + `/api/screening/screenings/${reservation?.screeningId}/movie`)
			setMovie(movieResponse.data)
			const seatsArray = reservation?.seats
			const seatsResponse = await axios.post(api + `/api/seat/seats/current`, seatsArray)
			setSeats(seatsResponse.data)
		} catch (error) {
			setSeats([])
		}
	}

	useEffect(() => {
		fetchData()
	}, [])
	return (
		<Wrapper>
			{movie ? (
				<>
					<SectionHeader>Podsumowanie</SectionHeader>
					<SubmitButton
						className='primary'
						onClick={() => {
							setStep('tickets')
						}}
						type={'button'}>
						{'Powrót'}
					</SubmitButton>
					<Container>
						<CostTable>
							{seats?.map(seat => {
								return <PaymentItem key={seat._id} seat={seat} />
							})}
							<PaymentService>
								Opłata serwisowa: <span>2 PLN</span>
							</PaymentService>
							<PaymentDiscount discount={discount} setDiscount={setDiscount} />
						</CostTable>
						<TicketPayment>
							<CostSum>Zapłać: {sumCosts()} PLN</CostSum>
							<div className='paypal-button-container'>
								<PaypalCheckoutButton product={product} />
							</div>
						</TicketPayment>
					</Container>
				</>
			) : (
				<EmptyState />
			)}
		</Wrapper>
	)
}

export default Payments

const Wrapper = styled.div`
	width: 100%;
`

const CostSum = styled.p`
	font-size: 20px;
	font-weight: 700;
`
const TicketPayment = styled.div`
	padding: 10px 10px;
	display: flex;
	color: ${({ theme }) => theme.colors.black};
	flex-direction: column;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.white};
	height: max-content;
	border-radius: 10px;
`

const CostTable = styled.div`
	width: 60%;
	padding: 20px 30px;
	border-radius: 15px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	row-gap: 30px;
`
const Container = styled.div`
	@media screen and (max-width: 800px) {
		flex-direction: column;
	}
	display: flex;
	flex-direction: row;
	column-gap: 20px;
`

const PaymentService = styled.p`
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`
