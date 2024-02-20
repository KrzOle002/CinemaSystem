import CircleAge from '../../../components/CircleAge'
import SubmitButton from '../../../components/SubmitButton'
import { MovieModel } from '../../../types/MovieModelType'
import useAuthHook from '../../../utils/auth/useAuth'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDialogHandler } from '../../../utils/dialog/useDialogHandler'
import AdditionMovieDialog from '../../AdminPanel/components/AdditionMovieDialog'
import { MovieBasicInfo, MovieButtons, MovieImage, MovieInfo, MovieItemContainer, MovieTitle, Wrapper } from './MovieItem.style'
import MovieRating from './MovieRating'
import EmptyState from '../../../utils/empty/EmptyState'
import { isBefore, isSameDay } from 'date-fns'

interface MovieItemType {
	movie: MovieModel
	reservationDate: Date
}

const MovieItem = ({ movie, reservationDate }: MovieItemType) => {
	const { api } = useAuthHook()
	const { isOpen, close } = useDialogHandler()

	const navigate = useNavigate()

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
							.sort((screening, nextScreening) => {
								const screeningHour = new Date(screening.date).getHours()
								const nextScreeningHour = new Date(nextScreening.date).getHours()
								return screeningHour - nextScreeningHour
							})
							.map(screening => {
								const dateObject = new Date(screening.date)
								const now = new Date()
								const yesterday = new Date(now)
								yesterday.setDate(now.getDate() - 1)

								const isYesterday = isSameDay(dateObject, yesterday)
								const isTodayWithin2Hours = isSameDay(dateObject, now) && now.getHours() - dateObject.getUTCHours() >= 1

								const isDisabled = isYesterday || isTodayWithin2Hours
								return (
									<SubmitButton
										key={screening._id}
										disabled={isDisabled}
										type={'button'}
										className='primary'
										onClick={() => handleReservationClick(screening._id)}>
										{dateObject.getUTCHours() > 9 ? dateObject.getUTCHours() : '0' + dateObject.getUTCHours()}:
										{dateObject.getUTCMinutes().toString().padStart(2, '0')}
									</SubmitButton>
								)
							})}
					</MovieButtons>
				</MovieInfo>
			</MovieItemContainer>
			<AdditionMovieDialog movieId={movie._id} isOpen={isOpen} close={close} />
		</Wrapper>
	)
}

export default MovieItem
