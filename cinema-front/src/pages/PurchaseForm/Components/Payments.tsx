import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PaypalCheckoutButton from '../../../components/PaypalCheckoutButton'
import SubmitButton from '../../../components/SubmitButton'
import EmptyState from '../../../utils/empty/EmptyState'
import useAuthHook from '../../../utils/auth/useAuth'
import { MovieModel } from '../../../types/MovieModelType'
import axios from 'axios'

const Payments = () => {
	const product = {
		description: 'Design+Code',
		price: 19,
	}

	const { api, isAuthenticated } = useAuthHook()

	const [ticketQuantity, setTicketQuantity] = useState<number>()

	const handleTicketChange = (event: { target: { value: string } }) => {
		const newQuantity = parseInt(event.target.value, 10)
		setTicketQuantity(newQuantity)
	}
	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const response = await axios.get(api + `/api/movie/movies/654d3f83f31963ad2ddcc8f1`)
			} catch (error) {}
		}
		fetchMovies()
	}, [])
	return (
		<div>
			{/* <MovieInfo>
				<MoviePoster src={api + movie.cover.path} alt={movie.title} />
				<MovieDetails>
					<Title>{movie.title}</Title>
					<MovieLength>Długość: {movie.screeningLength} min</MovieLength>
				</MovieDetails>
			</MovieInfo>
			<TicketForm onSubmit={() => {}}>
				<TicketInput type='number' value={ticketQuantity} onChange={handleTicketChange} placeholder='Liczba biletów' />
				<SubmitButton className='primary' type='submit'>
					Zarezerwuj bilety
				</SubmitButton>
				<div className='paypal-button-container'>
					<PaypalCheckoutButton product={product} />
				</div>
			</TicketForm> */}

			<EmptyState />
		</div>
	)
}

export default Payments

const MovieInfo = styled.div`
	display: flex;
	align-items: center;
	margin: 40px 0;
`

const MoviePoster = styled.img`
	max-width: 150px;
	border-radius: 10px;
	margin-right: 20px;
`

const MovieDetails = styled.div`
	display: flex;
	flex-direction: column;
`

const Title = styled.h2`
	font-size: 24px;
	margin: 0;
`

const MovieLength = styled.p`
	font-size: 16px;
	margin: 10px 0;
`

const TicketForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const TicketInput = styled.input`
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	margin-bottom: 10px;
	width: 200px;
`

const TicketButton = styled.button`
	background-color: #ff5722;
	color: white;
	border: none;
	padding: 10px 20px;
	border-radius: 5px;
	cursor: pointer;
	font-size: 18px;
	transition: background-color 0.3s;

	&:hover {
		background-color: #ff4500;
	}
`
