import styled from 'styled-components'
import InputLabel from '../../components/InputLabel'
import PageDescription from '../../components/PageDescription'
import SubmitButton from '../../components/SubmitButton'
import { useDialogHandler } from '../../utils/dialog/useDialogHandler'
import { Slideshow } from '../../utils/slider/Slideshow'
import useAuthHook from './../../utils/auth/useAuth'
import AdditionMovieDialog from './AdditionMovieDialog'
import { ChangeEvent, useEffect, useState } from 'react'
import { MovieModel } from '../../types/MovieModelType'
import axios from 'axios'
import MovieItem from './MovieItem'
import EmptyState from '../../utils/empty/EmptyState'
import PageFooter from '../PageFooter'
interface FilterType {
	search: string
}
const MovieSchedule = () => {
	const { isAdmin, api } = useAuthHook()
	const { isOpen, open, close } = useDialogHandler()
	const initialFilterValue = {
		search: '',
	}

	const [filters, setFilters] = useState<FilterType>(initialFilterValue)

	const [movieList, setMovieList] = useState<MovieModel[] | null>(null)
	const [movieFilteredList, setFilteredList] = useState<MovieModel[] | null>(null)

	const handleFilterMovies = (e: ChangeEvent<HTMLInputElement>) => {
		setFilters({ search: e.target.value })
		// No need to call checkFilters() here, it will be called in useEffect
	}

	const checkFilters = () => {
		if (movieList != null) {
			const keys: (keyof MovieModel)[] = ['title']
			const newMovieList = movieList.filter(movie =>
				keys.some(key => movie[key]?.toString().toLowerCase().includes(filters.search.toLowerCase()))
			)

			setFilteredList(newMovieList)
		}
	}

	const fetchMovies = async () => {
		try {
			const response = await axios.get(api + '/api/movie/movies')
			setMovieList(response.data) // Set the movieList directly
		} catch (error) {
			setMovieList(null)
		}
	}

	useEffect(() => {
		fetchMovies()
		checkFilters() // Call checkFilters here
	}, [movieList, filters.search])
	return (
		<Wrapper>
			<Slideshow />
			<Container>
				<PageDescription>Repertuar Cinema Fordon</PageDescription>
				<MovieControl>
					<InputLabel placeholder={'Filtr'} onChange={handleFilterMovies} />

					{isAdmin ? (
						<SubmitButton fullWidth type={'button'} onClick={() => open()} className={'primary'}>
							Dodaj film
						</SubmitButton>
					) : null}
				</MovieControl>
				<MoviesList>
					{movieFilteredList?.length == 0 ? <EmptySlot>Brak filmu o takiej nazwie</EmptySlot> : null}
					{movieFilteredList ? (
						movieFilteredList.map(movie => {
							return <MovieItem key={movie._id} movie={movie} />
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
