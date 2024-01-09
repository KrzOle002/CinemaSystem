import SubmitButton from '../../../components/SubmitButton'
import styled from 'styled-components'
import CinemaSchedule from './CinemaSchedule'
import ScheduleCalendar from './ScheduleCalendar'
import { useState } from 'react'

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

	return (
		<Wrapper>
			<ScheduleCalendar setPostScreening={setPostScreening} />

			<CinemaSchedule postScreening={postScreening} setPostScreening={setPostScreening} />
			<SubmitButton fullWidth type={'button'} className='primary'>
				Zatwierdź repertuar
			</SubmitButton>
		</Wrapper>
	)
}

export default SchedulePanel

const Wrapper = styled.div`
	color: ${({ theme }) => theme.colors.white};
	width: 100%;
	height: 100%;
`
