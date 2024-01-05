import { startOfWeek, endOfWeek, eachDayOfInterval, format, getWeek } from 'date-fns'
import { PostScreeningType } from './SchedulePanel'

interface ScheduleCalendarType {
	date: Date
	setPostScreening: (arg: PostScreeningType) => void
}
const ScheduleCalendar = ({ date }: ScheduleCalendarType) => {
	const startDate = startOfWeek(date, { weekStartsOn: 1 })
	const endDate = endOfWeek(date, { weekStartsOn: 1 })

	const postScreening = {
		dateFrom: startDate,
		dateTo: endDate,
		screeningData: [],
	}

	return (
		<div>
			<h3 style={{ textAlign: 'center' }}>
				Repertuar na {format(startDate, 'dd/MM/yyyy')} - {format(endDate, 'dd/MM/yyyy')}{' '}
			</h3>
		</div>
	)
}

export default ScheduleCalendar
