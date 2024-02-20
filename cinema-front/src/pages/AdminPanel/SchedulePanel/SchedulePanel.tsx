import styled from 'styled-components'
import CinemaSchedule from './CinemaSchedule'
import ScheduleCalendar from './ScheduleCalendar'
import { useState } from 'react'
import useAuthHook from '../../../utils/auth/useAuth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export interface ScreeningData {
	hour: string
	roomId: string
	movieId: string
}

export interface PostScreeningType {
	dateFrom: Date
	dateTo: Date
	screeningData: ScreeningData[]
}

const SchedulePanel = () => {
	const [postScreening, setPostScreening] = useState<PostScreeningType | null>(null)
	const navigate = useNavigate()
	const { api, axiosAuth } = useAuthHook()

	const handleFinalizeCinemaSchedule = async (roomScreenings: Record<string, ScreeningData[]>) => {
		const allScreenings = Object.values(roomScreenings).flat()

		const isNotEmpty = allScreenings.some(screening => screening.movieId != null && screening.movieId !== '')

		if (postScreening?.dateFrom && postScreening.dateTo && isNotEmpty) {
			const newScreeningSchedule = { ...postScreening, screeningData: allScreenings }
			setPostScreening({
				...postScreening,
				screeningData: allScreenings,
			})

			try {
				const response = await axiosAuth.post(`${api}/api/screening/screenings`, newScreeningSchedule).then(res => {
					toast.success('Ustawiono harmonogram')
				})
				return response
			} catch (error) {
				console.error('Błąd przy wysyłaniu harmonogramu:', error)
				throw error
			}
		} else {
			toast.error('Harmonogram nie może być pusty')
		}
	}

	return (
		<Wrapper>
			<ScheduleCalendar setPostScreening={setPostScreening} />
			<CinemaSchedule onFinalize={handleFinalizeCinemaSchedule} />
		</Wrapper>
	)
}

export default SchedulePanel

const Wrapper = styled.div`
	color: ${({ theme }) => theme.colors.white};
	width: 100%;
	height: 100%;
`
