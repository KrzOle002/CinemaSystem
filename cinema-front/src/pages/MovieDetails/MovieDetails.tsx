import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { MovieModel } from '../../types/MovieModelType'
import { useState } from 'react'
import EmptyState from '../../utils/empty/EmptyState'

const MovieDetails = () => {
	const [movie, setMovie] = useState<MovieModel>()
	const location = useLocation()
	const screeningId = new URLSearchParams(location.search).get('screening')
	const date = new URLSearchParams(location.search).get('date')

	return (
		<CardContainer>
			{movie ? (
				<>
					<CoverImage src={movie.cover.path} alt={`${movie.title} Cover`} />
					<CardContent>
						<MovieTitle>{movie.title}</MovieTitle>
						<MovieCard>
							<p>{`Genre: ${movie.genre.join(', ')}`}</p>
							<p>{`Director: ${movie.director}`}</p>
							<p>{`Casts: ${movie.casts.join(', ')}`}</p>
							<p>{`Production Country: ${movie.productionCountry}`}</p>
							<p>{`Production Year: ${movie.productionYear}`}</p>
							<p>{`Screening Length: ${movie.screeningLength} min`}</p>
							{movie.ageRestrictions && <p>{`Age Restrictions: ${movie.ageRestrictions}+`}</p>}
						</MovieCard>
						<MovieDescription>{movie.description}</MovieDescription>
					</CardContent>
				</>
			) : (
				<EmptyState />
			)}
		</CardContainer>
	)
}

export default MovieDetails

const CardContainer = styled.div`
	width: 50%;
	margin: 20px auto;
	background-color: #fff;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const CoverImage = styled.img`
	width: 100%;
	height: 200px;
	object-fit: cover;
`

const CardContent = styled.div`
	padding: 20px;
`

const MovieTitle = styled.h2`
	font-size: 24px;
	margin-bottom: 10px;
`

const MovieCard = styled.div`
	margin-bottom: 20px;

	p {
		margin: 8px 0;
	}
`

const MovieDescription = styled.p`
	font-size: 16px;
	line-height: 1.5;
`
