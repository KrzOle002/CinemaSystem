import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PaypalCheckoutButton from '../../../components/PaypalCheckoutButton'
import SubmitButton from '../../../components/SubmitButton'
import EmptyState from '../../../utils/empty/EmptyState'
import useAuthHook from '../../../utils/auth/useAuth'
import { MovieModel } from '../../../types/MovieModelType'
import axios from 'axios'
import { useReservationContext } from '../../../context/ReservationContext'

const Payments = () => {
	const product = {
		description: 'Design+Code',
		price: 19,
	}
	const { setStep, customer, reservation } = useReservationContext()
	const { api, isAuthenticated } = useAuthHook()
	const [movie, setMovie] = useState<any>()
	const [seats, setSeats] = useState<any>()
	const [ticketQuantity, setTicketQuantity] = useState<number>()

	const handleTicketChange = (event: { target: { value: string } }) => {
		const newQuantity = parseInt(event.target.value, 10)
		setTicketQuantity(newQuantity)
	}

	const fetchData = async () => {
		try {
			const movieResponse = await axios.get(api + `/api/screening/screenings/${reservation?.screeningId}/movie`)
			setMovie(movieResponse.data)
			const seatsArray = reservation?.seats
			const seatsResponse = await axios.post(api + `/api/seat/seats/current`, seatsArray)
			setSeats(seatsResponse.data)
		} catch (error) {
			setMovie({})
			setSeats({})
		}
	}
	console.log(seats)
	console.log(reservation)
	useEffect(() => {
		fetchData()
		console.log(movie)
	}, [])
	return (
		<Wrapper>
			<button onClick={() => setStep('tickets')}>Star over</button>
			{movie ? (
				<>
					<MovieInfo>
						{/* <Title>{movie.title}</Title>

						<MoviePoster src={api + movie.cover.path} alt={movie.title} /> */}
					</MovieInfo>

					<CostTable>
						<div>
							<table>
								<thead>
									<tr>
										<th>Category</th>
										<th>Price</th>
									</tr>
								</thead>
								<tbody>200</tbody>
							</table>

							<div>
								<label>Login Discount:</label>
								<input type='number' />
								<button>Apply</button>
							</div>

							<div>
								<label>Discount Code:</label>
								<input type='text' />
								<button>Apply</button>
							</div>
						</div>
					</CostTable>
					<TicketForm onSubmit={() => {}}>
						<div className='paypal-button-container'>
							<PaypalCheckoutButton product={product} />
						</div>
					</TicketForm>
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

const MovieInfo = styled.div`
	display: flex;
	align-items: center;
	margin: 40px auto;
	flex-direction: column;
	gap: 20px;
	width: 100%;
`

const MoviePoster = styled.img`
	max-width: 150px;
	border-radius: 10px;
	margin-right: 20px;
`

const Title = styled.h2`
	font-size: 24px;
	margin: 0;
`

const TicketForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const CostTable = styled.div`
	width: 100%;
`