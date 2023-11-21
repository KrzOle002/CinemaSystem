import styled from 'styled-components'
import Payments from './Components/Payments'
import { Reservation, useReservationContext } from '../../context/ReservationContext'
import { useLocation, useParams } from 'react-router-dom'
import Tickets from './Components/Tickets'
import { useEffect, useState } from 'react'
import { MovieModel } from '../../types/MovieModelType'
import axios from 'axios'
import useAuthHook from '../../utils/auth/useAuth'
import { ScreeningModel } from '../../types/ScreeningModelType'
import { getFullDate } from '../../utils/getHours'
import { format } from 'date-fns'

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
				<MovieInfo>{movie?.ageRestrictions ? `Ograniczenia wiekowe: ${movie.ageRestrictions}` : null}</MovieInfo>
			</SummaryItems>
			<Main>
				{step === 'tickets' && <Tickets />}
				{step === 'payment' && <Payments />}
			</Main>
		</DashboardContainer>
	)
}

export default PurchaseForm

const DashboardContainer = styled.div`
	color: white;
	padding: 20px 0;
	display: flex;
	flex-direction: row;
	width: 50%;
	margin: 0 auto;
`

const Main = styled.div`
	border-left: 1px solid white;
	padding: 0 10px;
`
const SummaryItems = styled.div`
	min-width: 95px;
	width: 20%;
	display: flex;
	flex-direction: column;
	gap: 10px;
`

const MovieInfo = styled.span`
	font-size: 12px;
	line-height: 20px;
	text-transform: capitalize;
`
