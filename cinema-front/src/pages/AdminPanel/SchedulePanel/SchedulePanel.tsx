import styled from 'styled-components'
import CinemaSchedule from './CinemaSchedule'
import ScheduleCalendar from './ScheduleCalendar'
import { useState } from 'react'
import useAuthHook from '../../../utils/auth/useAuth'

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
	const { api, axiosAuth } = useAuthHook()
	const handleFinalizeCinemaSchedule = async (roomScreenings: Record<string, ScreeningData[]>) => {
		const allScreenings = Object.values(roomScreenings).flat()

		if (postScreening) {
			setPostScreening({
				...postScreening,
				screeningData: allScreenings,
			})
		} else {
			setPostScreening({
				dateFrom: new Date(),
				dateTo: new Date(),
				screeningData: allScreenings,
			})
		}

		await sendReservation()
	}

	const sendReservation = async () => {
		const data = postScreening
		console.log(data)
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
