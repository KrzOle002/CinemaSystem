import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import { useState } from 'react'

enum PolishMonths {
	January = 'Styczeń',
	February = 'Luty',
	March = 'Marzec',
	April = 'Kwiecień',
	May = 'Maj',
	June = 'Czerwiec',
	July = 'Lipiec',
	August = 'Sierpień',
	September = 'Wrzesień',
	October = 'Październik',
	November = 'Listopad',
	December = 'Grudzień',
}

const customFormat = (date: Date, formatString: string) => {
	const monthNames = Object.values(PolishMonths)
	const monthIndex = date.getMonth()
	const formattedString = format(date, formatString)
	return formattedString.replace(/MMMM/, monthNames[monthIndex])
}

interface WeeklyCalendarProps {
	startDate: Date
}

const Calendar: React.FC<WeeklyCalendarProps> = ({ startDate }) => {
	const [weekStart, setWeekStart] = useState<Date>(startDate)

	const prevWeek = () => {
		setWeekStart(addDays(weekStart, -7))
	}

	const nextWeek = () => {
		setWeekStart(addDays(weekStart, 7))
	}

	const renderDays = () => {
		const weekDays = eachDayOfInterval({ start: startOfWeek(weekStart), end: endOfWeek(weekStart) })

		return weekDays.map(day => (
			<div key={day.toString()} className='day'>
				{customFormat(day, 'EEEE, d MMMM')}
			</div>
		))
	}

	return (
		<div className='weekly-calendar'>
			<div className='calendar-header'>
				<button onClick={prevWeek}>Previous Week</button>
				<h2>{customFormat(weekStart, 'MMMM d, yyyy')}</h2>
				<button onClick={nextWeek}>Next Week</button>
			</div>
			<div className='calendar-days'>{renderDays()}</div>
		</div>
	)
}

export default Calendar
