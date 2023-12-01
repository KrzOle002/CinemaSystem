import styled from 'styled-components'
import InputLabel from '../../components/InputLabel'
import SubmitButton from '../../components/SubmitButton'
import { useDialogHandler } from '../../utils/dialog/useDialogHandler'
import { Slideshow } from '../../utils/slider/Slideshow'
import useAuthHook from './../../utils/auth/useAuth'
import AdditionMovieDialog from './Components/AdditionMovieDialog'
import { ChangeEvent, useEffect, useState } from 'react'
import { MovieModel } from '../../types/MovieModelType'
import axios from 'axios'
import MovieItem from './Components/MovieItem'
import EmptyState from '../../utils/empty/EmptyState'
import PageFooter from '../PageFooter'
import Calendar from '../../components/Calendar'
import SectionHeader from '../../components/SectionHeader'

const MovieSchedule = () => {
	const { isAdmin, api } = useAuthHook()
	const { isOpen, open, close } = useDialogHandler()
	const [reservationDate, setReservationDate] = useState<Date>(new Date())
	const [movieList, setMovieList] = useState<MovieModel[] | null>(null)

	const handleFilterMovies = (e: ChangeEvent<HTMLInputElement>) => {
		fetchMovies(e.target.value)
	}

	const fetchMovies = async (title?: string) => {
		try {
			const getter = title ? `/api/movie/movies?title=${title}` : `/api/movie/movies`
			const response = await axios.get(api + getter)

			setMovieList(response.data)
		} catch (error) {
			setMovieList(null)
		}
	}

	useEffect(() => {
		fetchMovies()
	}, [])

	return (
		<Wrapper>
			<Slideshow />
			<Container>
				<SectionHeader>Repertuar Cinema Fordon</SectionHeader>

				<Calendar setReservationDate={setReservationDate} reservationDate={reservationDate} />
				<MovieControl>
					<InputLabel placeholder={'Filtr'} onChange={handleFilterMovies} />

					{isAdmin ? (
						<SubmitButton fullWidth type={'button'} onClick={() => open()} className={'primary'}>
							Dodaj film
						</SubmitButton>
					) : null}
				</MovieControl>
				<MoviesList>
					{movieList?.length == 0 ? <EmptySlot>Brak filmu o takiej nazwie</EmptySlot> : null}
					{movieList ? (
						movieList.map(movie => {
							return <MovieItem key={movie._id} movie={movie} movieList={movieList} setMovieList={setMovieList} reservationDate={reservationDate} />
						})
					) : (
						<EmptyState />
					)}
				</MoviesList>
			</Container>
			<PageFooter />
			<AdditionMovieDialog isOpen={isOpen} close={close} />
		</Wrapper>
	)
}

export default MovieSchedule

const Wrapper = styled.div`
	color: ${({ theme }) => theme.colors.white};
	width: 100%;
	height: 100vh;
`
const Container = styled.div`
	@media screen and (max-width: 640px) {
		width: 80%;
	}
	width: 50%;
	margin: 0 auto;
`
const MovieControl = styled.div`
	@media screen and (max-width: 640px) {
		flex-direction: column-reverse;
		row-gap: 50px;
	}
	padding: 20px 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
	column-gap: 20px;
	& button {
		width: 50%;
	}
`
const MoviesList = styled.div`
	min-height: 250px;
	width: 100%;
	display: flex;
	flex-direction: column;
`
const EmptySlot = styled.p`
	font-weight: 100;
	text-align: center;
	opacity: 50%;
`
