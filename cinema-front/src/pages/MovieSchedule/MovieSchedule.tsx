import styled from 'styled-components'
import InputLabel from '../../components/InputLabel'
import PageDescription from '../../components/PageDescription'
import SubmitButton from '../../components/SubmitButton'
import { useDialogHandler } from '../../utils/dialog/useDialogHandler'
import { Slideshow } from '../../utils/slider/Slideshow'
import useAuthHook from './../../utils/auth/useAuth'
import AdditionMovieDialog from './AdditionMovieDialog'
import { useEffect, useState } from 'react'
import { MovieModel } from '../../types/MovieModelType'
import axios from 'axios'

const MovieSchedule = () => {
	const { isAdmin, api, isAuthenticated } = useAuthHook()
	const { isOpen, open, close } = useDialogHandler()
	const [movieList, setMovieList] = useState<MovieModel[] | null>(null)

	useEffect(() => {
		console.log("licznik")
		const fetchMovies = async () => {
			if (isAuthenticated()) {
				try {
					const response = await axios.get(api + '/api/movie/movies')

					setMovieList(response.data)
				} catch (error) {
					setMovieList(null)
				}
			}
		}
		fetchMovies()
	}, [])

	return (
		<Wrapper>
			<Slideshow />
			<Container>
				<PageDescription>Repertuar Cinema Fordon</PageDescription>
				<MovieControl>
					<InputLabel placeholder={'Filtr'} />

					{isAdmin ? (
						<SubmitButton type={'button'} onClick={() => open()} className={'primary'}>
							Dodaj film
						</SubmitButton>
					) : null}
				</MovieControl>
				<MoviesList>
					{movieList ? (
						movieList.map((movie, index) => {
							return (
								<MovieItem key={index}>
									{movie.title}
									<img src={api + movie.cover.path} />
								</MovieItem>
							)
						})
					) : (
						<>Brak filmów</>
					)}
				</MoviesList>
			</Container>

			<AdditionMovieDialog isOpen={isOpen} close={close} />
		</Wrapper>
	)
}

export default MovieSchedule

const Wrapper = styled.div`
	color: ${({ theme }) => theme.colors.white};
	width: 100%;
`
const Container = styled.div`
	width: 50%;
	margin: 0 auto;
`
const MovieControl = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
`
const MoviesList = styled.div`
	width: 100%;
`
const MovieItem = styled.div`
	width: 100%;
`
