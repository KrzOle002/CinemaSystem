import { ChangeEvent } from 'react'
import InputLabel from '../../../components/InputLabel'
import { ReservationData } from '../../../types/ReservationModelType'

interface ReservationsFilterType {
	setFilteredReservations: (arg: ReservationData[] | null) => void
	reservations: ReservationData[] | null
}

const ReservationsFilter = ({ setFilteredReservations, reservations }: ReservationsFilterType) => {
	const handleFilterReservations = (e: ChangeEvent<HTMLInputElement>) => {
		const filter = e.target.value.toLowerCase()
		if (reservations == null) {
			return setFilteredReservations(null)
		}

		const keys = ['cost', 'screeningId.movieId.title', 'screeningId.roomId.roomNumber']

		const getValueByPath = (object: any, path: string) => {
			return path.split('.').reduce((o, k) => (o || {})[k], object)
		}
		const newReservations = reservations.filter(reservation =>
			keys.some(key => {
				const value = getValueByPath(reservation, key)
				return value?.toString().toLowerCase().includes(filter)
			})
		)

		setFilteredReservations(newReservations)
	}
	return <InputLabel placeholder={'Szukaj: nazwa filmu, koszt, numer sali'} onChange={handleFilterReservations} />
}

export default ReservationsFilter
