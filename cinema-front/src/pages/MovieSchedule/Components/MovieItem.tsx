import CircleAge from '../../../components/CircleAge'
import SubmitButton from '../../../components/SubmitButton'
import { MovieModel } from '../../../types/MovieModelType'
import useAuthHook from '../../../utils/auth/useAuth'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDialogHandler } from '../../../utils/dialog/useDialogHandler'
import AdditionMovieDialog from './AdditionMovieDialog'
import {
	ControlButton,
	MovieBasicInfo,
	MovieButtons,
	MovieController,
	MovieImage,
	MovieInfo,
	MovieItemContainer,
	MovieTitle,
	Wrapper,
} from './MovieItem.style'
import MovieRating from './MovieRating'

interface MovieItemType {
	movie: MovieModel
	reservationDate: Date
	movieList: MovieModel[]
	setMovieList: Dispatch<SetStateAction<MovieModel[] | null>>
}

const MovieItem = ({ movie, movieList, setMovieList, reservationDate }: MovieItemType) => {
	const { api, axiosAuth, isAdmin } = useAuthHook()
	const { isOpen, close } = useDialogHandler()

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
					<MovieRating movie={movie._id} />
					<MovieButtons>
						{movie.screenings
							.filter(screening => {
								const screeningDateObject = new Date(screening.date)
								const reservationDateObject = reservationDate
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
										{dateObject.getUTCHours() > 9 ? dateObject.getUTCHours() : '0' + dateObject.getUTCHours()}:
										{dateObject.getUTCMinutes().toString().padStart(2, '0')}
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
