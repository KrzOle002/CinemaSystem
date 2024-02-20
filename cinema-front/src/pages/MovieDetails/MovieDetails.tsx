import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { MovieModel } from '../../types/MovieModelType'
import EmptyState from '../../utils/empty/EmptyState'
import axios from 'axios'
import useAuthHook from '../../utils/auth/useAuth'
import SubmitButton from '../../components/SubmitButton'
import PageFooter from '../PageFooter'

const MovieDetails = () => {
	const [movie, setMovie] = useState<MovieModel | null>()
	const { movieId } = useParams()
	const { api } = useAuthHook()
	const navigate = useNavigate()
	const fetchMovies = async () => {
		try {
			const response = await axios.get(api + `/api/movie/movies/${movieId}`)

			setMovie(response.data)
		} catch (error) {
			setMovie(null)
		}
	}

	useEffect(() => {
		fetchMovies()
	}, [])

	return (
		<Wrapper>
			<CardContainer>
				{movie ? (
					<CardContent>
						<CoverContainer>
							<CoverImage src={api + movie.cover.path} alt={`${movie.title} Cover`} />
							<SubmitButton className='primary' fullWidth type={'button'} onClick={() => navigate(-1)}>
								Powrót
							</SubmitButton>
						</CoverContainer>
						<CardBody>
							<MovieTitle>{movie.title}</MovieTitle>
							<MovieCard>
								<p>{`Gatunek: ${movie.genre.join(', ')}`}</p>
								<p>{`Reżyser: ${movie.director}`}</p>
								<p>{`Obsada: ${movie.casts.join(', ')}`}</p>
								<p>{`Kraj produkcji: ${movie.productionCountry}`}</p>
								<p>{`Rok produkcji: ${movie.productionYear}`}</p>
								<p>{`Długość: ${movie.screeningLength} min`}</p>
								{movie.ageRestrictions && <p>{`Kategoria wiekowa: ${movie.ageRestrictions}+`}</p>}
							</MovieCard>
							<MovieDescription>{movie.description}</MovieDescription>
						</CardBody>
					</CardContent>
				) : (
					<EmptyState />
				)}
			</CardContainer>
			<PageFooter />
		</Wrapper>
	)
}

export default MovieDetails

const Wrapper = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const CoverContainer = styled.div`
	@media screen and (max-width: 640px) {
		width: 100%;
	}

	width: 50%;
	padding: 7px;
	border-radius: 10px;
	text-align: center;
	flex-grow: 2;
`

const CoverImage = styled.img`
	@media screen and (max-width: 640px) {
		width: 100%;
	}
	width: 100%;
	height: auto;
`

const CardContainer = styled.div`
	@media screen and (max-width: 1100px) {
		width: 90%;
	}
	width: 50%;
	margin: 20px auto;
	color: white;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`
const CardBody = styled.div`
	@media screen and (max-width: 1100px) {
		width: 90%;
		min-width: unset;
	}
	min-width: 300px;
	width: 50%;
	display: flex;
	flex-direction: column;
`

const CardContent = styled.div`
	@media screen and (max-width: 640px) {
		flex-direction: column;
	}
	padding: 20px;
	display: flex;
	flex-direction: row;
	gap: 20px;
`

const MovieTitle = styled.h2`
	font-size: 24px;
	margin-bottom: 10px;
`

const MovieCard = styled.div`
	margin-bottom: 20px;
	font-weight: bold;

	p {
		margin: 8px 0;
	}
`

const MovieDescription = styled.p`
	font-size: 16px;
	line-height: 1.5;
`
