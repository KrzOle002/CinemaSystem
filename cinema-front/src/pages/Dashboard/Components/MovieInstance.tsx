import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { MovieModel } from '../../../types/MovieModelType'
import useAuthHook from '../../../utils/auth/useAuth'

interface MovieInstanceType {
	movie: MovieModel
}

const MovieInstance = ({ movie }: MovieInstanceType) => {
	const navigate = useNavigate()
	const { api } = useAuthHook()
	return (
		<Wrapper
			onClick={() => {
				navigate(`/details/${movie._id}`)
			}}>
			<MovieImg src={api + movie.cover.path} />
			<MovieTitle>{movie.title}</MovieTitle>
		</Wrapper>
	)
}

export default MovieInstance

const MovieImg = styled.img`
	transition: filter 0.3s ease;
	width: auto;
	margin: 0;
	object-fit: cover;
`

const Wrapper = styled.div`
	@media screen and (max-width: 600px) {
		width: 100%;
		min-width: unset;
	}
	display: flex;
	flex-direction: column;
	position: relative;
	width: 20%;
	min-width: 70px;

	&:hover {
		cursor: pointer;
		color: ${({ theme }) => theme.colors.primary};
		${MovieImg} {
			box-shadow: 0px 8px 30px 3px rgba(0, 0, 0, 0.7);
		}
	}
`

const MovieTitle = styled.span`
	@media screen and (max-width: 600px) {
		padding-top: 5px;
		font-size: 5vw;
	}
	text-align: center;
	font-size: 1.2vw;
	font-family: 'Saira', sans-serif;
	text-transform: uppercase;

	z-index: 2;
`
