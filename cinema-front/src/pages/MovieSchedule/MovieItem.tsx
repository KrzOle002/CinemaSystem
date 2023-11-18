import styled from 'styled-components'
import { MovieModel } from '../../types/MovieModelType'
import useAuthHook from '../../utils/auth/useAuth'
import CircleAge from '../../components/CircleAge'
import SubmitButton from '../../components/SubmitButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDialogHandler } from '../../utils/dialog/useDialogHandler'
import AdditionMovieDialog from './AdditionMovieDialog'

interface MovieItemType {
	movie: MovieModel
}

const MovieItem = ({ movie }: MovieItemType) => {
	const { api, axiosAuth, isAdmin } = useAuthHook()
	const { isOpen, open, close } = useDialogHandler()
	const navigate = useNavigate()

	const editMovie = () => {
		open()
	}

	const deleteMovie = async (id: number) => {
		if (isAdmin) {
			try {
				await axiosAuth.delete(api + `/api/movie/movies/${id}`)

				toast.success('Dodano film')
			} catch (err) {
				toast.error('Nie dodać filmu')
			}
		}
	}

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
				{isAdmin ? (
					<MovieController>
						<ControlButton className='warn' type={'button'} onClick={editMovie}>
							<EditIcon />
							Edytuj
						</ControlButton>
						<ControlButton className='important' type={'button'} onClick={() => deleteMovie(movie._id)}>
							<DeleteForeverIcon />
							Usuń
						</ControlButton>
					</MovieController>
				) : null}
			</MovieItemContainer>
			<AdditionMovieDialog movieId={movie._id} isOpen={isOpen} close={close} />
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
	flex: 2;
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
const MovieController = styled.div`
	flex: 1;
	width: min-content;
	display: flex;
	flex-direction: row;

	gap: 10px;
`
const ControlButton = styled(SubmitButton)`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`
