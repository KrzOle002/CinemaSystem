import styled from 'styled-components'
import Payments from './Components/Payments'
import { useReservationContext } from '../../context/ReservationContext'
import { useLocation, useParams } from 'react-router-dom'
import Tickets from './Components/Tickets'
import { useEffect, useState } from 'react'
import { MovieModel } from '../../types/MovieModelType'
import axios from 'axios'
import useAuthHook from '../../utils/auth/useAuth'
import { ScreeningModel } from '../../types/ScreeningModelType'
import { format } from 'date-fns'
import ChoosePersonal from './Components/ChoosePersonal'

const PurchaseForm = () => {
	const { reservation, setReservation } = useReservationContext()
	const { api } = useAuthHook()
	const { movieId } = useParams()
	const location = useLocation()
	const screeningId = new URLSearchParams(location.search).get('screening')
	const date = new URLSearchParams(location.search).get('date')
	const [movie, setMovie] = useState<MovieModel | null>()
	const [screening, setScreening] = useState<ScreeningModel | null>()
	const fetchMovies = async () => {
		try {
			const response = await axios.get(api + `/api/movie/movies/${movieId}`)

			setMovie(response.data)
		} catch (error) {
			setMovie(null)
		}
	}

	const fetchScreening = async () => {
		try {
			const response = await axios.get(api + `/api/screening/screenings/${screeningId}`)

			setScreening(response.data)
		} catch (error) {
			setMovie(null)
		}
	}

	useEffect(() => {
		fetchMovies()
		fetchScreening()
		if (date && screeningId)
			setReservation({
				...reservation,
				screeningDate: new Date(date),
				screeningId: screeningId,
			})
	}, [screeningId, date])

	const { step } = useReservationContext()
	return (
		<DashboardContainer>
			<SummaryItems>
				<MovieInfo>{movie?.title.toLowerCase()}</MovieInfo>

				<MovieInfo>{date ? format(new Date(date), 'dd.MM.yyyy') : null}</MovieInfo>
				<MovieInfo>Sala numer: {screening?.roomId.roomNumber}</MovieInfo>
				<MovieInfo>{movie?.ageRestrictions ? `Od lat: ${movie.ageRestrictions}` : null}</MovieInfo>
			</SummaryItems>
			<Main>
				{step === 'tickets' && <Tickets />}
				{step === 'personal' && <ChoosePersonal />}
				{step === 'payment' && <Payments />}
			</Main>
		</DashboardContainer>
	)
}

export default PurchaseForm

const DashboardContainer = styled.div`
	@media screen and (max-width: 800px) {
		flex-direction: column;
		width: 90%;
	}
	color: white;
	display: flex;
	flex-direction: row;
	padding: 60px 0;
	width: 50%;
	margin: 0 auto;
`

const Main = styled.div`
	@media screen and (max-width: 800px) {
		border-left: 0;
		justify-content: center;
		padding: 0;
	}
	width: 100%;
	border-left: 1px solid white;
	padding: 0 10px;
	display: flex;
	justify-content: flex-start;
`
const SummaryItems = styled.div`
	@media screen and (max-width: 800px) {
		min-width: 95px;
		width: 100%;
	}
	min-width: 95px;
	width: 20%;
	display: flex;
	flex-direction: column;
	gap: 10px;
`

const MovieInfo = styled.span`
	@media screen and (max-width: 800px) {
		font-size: 30px;
		line-height: 35px;
	}
	font-size: 12px;
	line-height: 20px;
	text-transform: capitalize;
`
