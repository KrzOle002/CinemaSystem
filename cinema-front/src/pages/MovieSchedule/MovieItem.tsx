import styled from 'styled-components'
import { MovieModel } from '../../types/MovieModelType'
import useAuthHook from '../../utils/auth/useAuth'
import CircleAge from '../../components/CircleAge'
import SubmitButton from '../../components/SubmitButton'
import { Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface MovieItemType {
	movie: MovieModel
}

const MovieItem = ({ movie }: MovieItemType) => {
	const { api } = useAuthHook()
	const navigate = useNavigate()

	const handleReservationClick = () => {
		navigate(`/purchase/${movie._id}`)
	}
	return (
		<Wrapper>
			<MovieItemContainer>
				<MovieImage src={api + movie.cover.path} />
				<MovieInfo>
					<MovieTitle>{movie.title}</MovieTitle>
					<MovieBasicInfo>
						<CircleAge>{movie.ageRestrictions}</CircleAge>
						{movie.genre} | {movie.screeningLength} minut
					</MovieBasicInfo>
					<SubmitButton type={'button'} className='primary' onClick={handleReservationClick}>
						Zarezerwuj
					</SubmitButton>
				</MovieInfo>
			</MovieItemContainer>
		</Wrapper>
	)
}

export default MovieItem

const Wrapper = styled.div`
	color: ${({ theme }) => theme.colors.white};
	width: 100%;
`

const MovieImage = styled.img`
	max-width: 150px;
	margin-right: 20px;
	border-radius: 10px;
	&:hover {
		filter: brightness(0.7);
		cursor: pointer;
	}
`

const MovieInfo = styled.div`
	flex: 1;
`

const MovieItemContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 10px;
`

const MovieTitle = styled.h3`
	text-transform: uppercase;
`

const MovieBasicInfo = styled.div`
	text-transform: capitalize;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 20px;
`
