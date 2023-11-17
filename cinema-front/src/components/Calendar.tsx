import React, { useState } from 'react'
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import styled from 'styled-components'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import SubmitButton from './SubmitButton'
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

	const handleDayClick = (clickedDate: Date) => {
		console.log('Clicked date:', clickedDate)
		// Add your logic for handling the clicked date
	}

	const renderDays = () => {
		const weekDays = eachDayOfInterval({ start: startOfWeek(weekStart), end: endOfWeek(weekStart) })

		return weekDays.map(day => (
			<div key={day.toString()} className='day' onClick={() => handleDayClick(day)}>
				<div className='dayNumber'>{format(day, 'd')}</div>
				<div className='dayOfWeek'>{format(day, 'EEEE')}</div>
			</div>
		))
	}

	return (
		<StyledWeeklyCalendar>
			<StyledCalendarHeader>{customFormat(weekStart, 'MMMM, yyyy')}</StyledCalendarHeader>
			<StyledCalendarContent>
				<SubmitButton onClick={prevWeek} type={'button'} className='primary'>
					<ArrowBackIosIcon />
				</SubmitButton>
				<StyledCalendarDays>{renderDays()}</StyledCalendarDays>
				<SubmitButton onClick={nextWeek} type={'button'} className='primary'>
					<ArrowForwardIosIcon />
				</SubmitButton>
			</StyledCalendarContent>
		</StyledWeeklyCalendar>
	)
}

export default Calendar

const StyledWeeklyCalendar = styled.div`
	width: 100%;
`

const StyledCalendarHeader = styled.h2`
	text-align: center;
`

const StyledCalendarContent = styled.div`
	display: flex;
	flex-direction: row;
	margin: 0 auto;
	width: 80%;
`

const StyledCalendarDays = styled.div`
	/* Add your styles for the calendar days container */
	display: flex;
	cursor: pointer;
	flex: 1;
	.day {
		/* Add your styles for each day */
		width: 100%;
		padding: 50px 10px;

		border: 1px solid #ddd;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		&:hover {
			background-color: ${({ theme }) => theme.colors.secondary};
		}

		&:active {
			background-color: ${({ theme }) => theme.colors.secondary};
		}

		.dayNumber {
			font-size: 18px;
			font-weight: bold;
		}

		.dayOfWeek {
			font-size: 14px;
			color: #ffffff;
		}
	}
`
