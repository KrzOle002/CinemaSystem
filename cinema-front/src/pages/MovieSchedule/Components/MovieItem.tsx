import styled from 'styled-components'
import { MovieModel } from '../../../types/MovieModelType'
import useAuthHook from '../../../utils/auth/useAuth'
import CircleAge from '../../../components/CircleAge'
import SubmitButton from '../../../components/SubmitButton'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDialogHandler } from '../../../utils/dialog/useDialogHandler'
import AdditionMovieDialog from './AdditionMovieDialog'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Rating from '@mui/material/Rating'

interface MovieItemType {
	movie: MovieModel
	reservationDate: Date
	movieList: MovieModel[]
	setMovieList: Dispatch<SetStateAction<MovieModel[] | null>>
}

const MovieItem = ({ movie, movieList, setMovieList, reservationDate }: MovieItemType) => {
	const { api, axiosAuth, isAdmin, isAuthenticated } = useAuthHook()
	const { isOpen, close } = useDialogHandler()
	const [rating, setRaiting] = useState<number>(((movie.screeningLength - movie.ageRestrictions) % 5) + 1)
	const navigate = useNavigate()

	const deleteMovie = async (id: number) => {
		if (isAdmin) {
			try {
				await axiosAuth.delete(api + `/api/movie/movies/${id}`)
				setMovieList(movieList.filter(movieItem => movieItem._id != movie._id))
				toast.success('Usunięto film')
			} catch (err) {
				toast.error('Nie można usunąć filmu')
			}
		}
	}

	const handleReservationClick = (screening: string) => {
		navigate(`/purchase/${movie._id}?screening=${encodeURIComponent(screening)}&date=${encodeURIComponent(reservationDate.toString())}`)
	}

	const changeRaiting = (event: any, newValue: any) => {
		if (isAuthenticated()) {
			setRaiting((rating + (newValue ?? 0)) / 2)
		} else {
			toast.warning('Tylko zalogowani użytkownicy mogą oceniać filmy')
		}
	}

	useEffect(() => {}, [reservationDate])

	return (
		<Wrapper>
			<MovieItemContainer>
				<MovieImage
					src={api + movie.cover.path}
					onClick={() => {
						navigate(`/details/${movie._id}`)
					}}
				/>
				<MovieInfo>
					<MovieTitle>{movie.title}</MovieTitle>
					<MovieBasicInfo>
						<CircleAge>{movie.ageRestrictions}</CircleAge>
						{movie.genre} | {movie.screeningLength} minut
					</MovieBasicInfo>
					<Rating value={rating} onChange={changeRaiting} />
					<MovieButtons>
						{movie.screenings
							.filter(screening => {
								const screeningDateObject = new Date(screening.date)
								const reservationDateObject = reservationDate
								console.log(reservationDateObject.getMonth())
								console.log(screeningDateObject.getMonth())
								return (
									screeningDateObject.getFullYear() === reservationDateObject.getFullYear() &&
									screeningDateObject.getMonth() === reservationDateObject.getMonth() &&
									screeningDateObject.getDate() === reservationDateObject.getDate()
								)
							})
							.map(screening => {
								const dateObject = new Date(screening.date)

								return (
									<SubmitButton key={screening._id} type={'button'} className='primary' onClick={() => handleReservationClick(screening._id)}>
										{dateObject.getUTCHours()}:{dateObject.getUTCMinutes().toString().padStart(2, '0')}
									</SubmitButton>
								)
							})}
					</MovieButtons>
				</MovieInfo>
				{isAdmin ? (
					<MovieController>
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
	@media screen and (max-width: 640px) {
		margin: 0;
	}
	max-width: 150px;
	margin-right: 20px;
	border-radius: 10px;
	&:hover {
		filter: brightness(0.7);
		cursor: pointer;
	}
`

const MovieInfo = styled.div`
	@media screen and (max-width: 1100px) {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	flex: 2;
`

const MovieItemContainer = styled.div`
	@media screen and (max-width: 1100px) {
		flex-direction: column;
		justify-content: center;
	}
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 10px;
`

const MovieTitle = styled.h3`
	@media screen and (max-width: 640px) {
		font-size: small;
	}
	text-transform: uppercase;
`

const MovieBasicInfo = styled.div`
	@media screen and (max-width: 640px) {
		font-size: smaller;
	}
	text-transform: capitalize;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 20px;
`
const MovieController = styled.div`
	@media screen and (max-width: 1100px) {
		padding: 20px 0;
		width: 100%;
		justify-content: center;
	}
	flex: 1;
	width: min-content;
	display: flex;
	flex-direction: row;

	gap: 10px;
`
const MovieButtons = styled.div`
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
