import { Rating, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import useAuthHook from '../../../utils/auth/useAuth'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Wrapper } from './MovieItem.style'

interface MovieRatingType {
	movie: number
}

const MovieRating = ({ movie }: MovieRatingType) => {
	const { isAuthenticated, api, axiosAuth, userData } = useAuthHook()
	const [rating, setRating] = useState<number>(0)
	const changeRaiting = async (event: any, newValue: any) => {
		if (isAuthenticated() && userData?._id) {
			const data = {
				rate: newValue,
				userId: userData?._id,
				movieId: movie,
			}

			await axiosAuth
				.post(api + '/api/rating/', data)
				.then(res => toast.success(res.data.message))
				.catch(() => toast.error('Nie udało się dodać oceny'))
			getRating()
		} else {
			toast.warning('Tylko zalogowani użytkownicy mogą oceniać filmy')
		}
	}

	const getRating = async () => {
		await axios
			.get(api + `/api/rating/${movie}`)
			.then(res => setRating(res.data))
			.catch(() => toast.error('Nie pobrać ocen'))
	}

	useEffect(() => {
		getRating()
	}, [])

	return (
		<Tooltip title={isAuthenticated() ? `` : 'Aby ocenić film musisz się zalogować'} arrow>
			<Rating value={rating} onChange={changeRaiting} />
		</Tooltip>
	)
}

export default MovieRating
