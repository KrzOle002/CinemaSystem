import { startOfWeek, endOfWeek, eachDayOfInterval, format, getWeek } from 'date-fns'
import { PostScreeningType } from './SchedulePanel'
import axios from 'axios'
import { useEffect, useState } from 'react'
import useAuthHook from '../../../utils/auth/useAuth'
import EmptyState from '../../../utils/empty/EmptyState'

interface ScheduleCalendarType {
	setPostScreening: (arg: PostScreeningType) => void
}

interface ScheduleCalendarDayType {
	startDate: Date
	endDate: Date
}
const ScheduleCalendar = ({ setPostScreening }: ScheduleCalendarType) => {
	const [date, setDate] = useState<ScheduleCalendarDayType>()
	const { api } = useAuthHook()

	const addDate = (date: Date) => {
		const nextDate = new Date(date)
		nextDate.setDate(nextDate.getDate() + 7)

		const startDate = startOfWeek(nextDate, { weekStartsOn: 1 })
		const endDate = endOfWeek(nextDate, { weekStartsOn: 1 })
		const postScreening = {
			dateFrom: startDate,
			dateTo: endDate,
			screeningData: [],
		}
		setDate({ startDate: startDate, endDate: endDate })
		setPostScreening(postScreening)
	}

	const fetchData = async () => {
		try {
			const response = await axios.get(api + '/api/screening/last-screening')
			addDate(response.data)
		} catch (error) {
			addDate(new Date())
		}
	}

	useEffect(() => {
		fetchData()
	}, [])
	if (date == undefined) return <EmptyState />
	return (
		<div>
			<h3 style={{ textAlign: 'center' }}>
				Repertuar na {format(date.startDate, 'dd/MM/yyyy')} - {format(date.endDate, 'dd/MM/yyyy')}{' '}
			</h3>
		</div>
	)
}

export default ScheduleCalendar
