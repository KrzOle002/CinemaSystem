import { Rating } from '@mui/material'
import { useState } from 'react'
import useAuthHook from '../../../utils/auth/useAuth'
import { toast } from 'react-toastify'

const MovieRating = () => {
	const { isAuthenticated } = useAuthHook()
	const [rating, setRaiting] = useState<number>((20 % 5) + 1)
	const changeRaiting = (event: any, newValue: any) => {
		if (isAuthenticated()) {
			setRaiting((rating + (newValue ?? 0)) / 2)
		} else {
			toast.warning('Tylko zalogowani użytkownicy mogą oceniać filmy')
		}
	}
	return <Rating value={rating} onChange={changeRaiting} />
}

export default MovieRating
