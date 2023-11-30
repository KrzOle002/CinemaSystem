import { eachDayOfInterval, format } from 'date-fns'
import { useState } from 'react'
import styled from 'styled-components'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import SubmitButton from './SubmitButton'

interface CalendarType {
	reservationDate: Date
	setReservationDate: (date: Date) => void
}

const Calendar = ({ reservationDate, setReservationDate }: CalendarType) => {
	const [startDate, setStartDate] = useState(new Date())

	const PolishMonths = [
		'Styczeń',
		'Luty',
		'Marzec',
		'Kwiecień',
		'Maj',
		'Czerwiec',
		'Lipiec',
		'Sierpień',
		'Wrzesień',
		'Październik',
		'Listopad',
		'Grudzień',
	]

	const PolishDays = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb']

	const setDateNow = () => {
		setReservationDate(new Date())
		setStartDate(new Date())
	}

	const handleDayClick = (clickedDate: Date) => {
		setReservationDate(clickedDate)
	}

	const handleNextWeekClick = (next: string) => {
		const newStartDate = new Date(startDate)
		newStartDate.setDate(next == 'next' ? newStartDate.getDate() + 7 : newStartDate.getDate() - 7)
		setStartDate(newStartDate)
	}

	const renderDays = () => {
		const endDate = new Date(startDate)
		endDate.setDate(endDate.getDate() + 6)
		const week = eachDayOfInterval({ start: startDate, end: endDate })

		return week.map(day => {
			const isActive = format(day, 'yyyy-MM-dd') === format(reservationDate, 'yyyy-MM-dd')
			return (
				<div key={day.toString()} className={`day ${isActive ? 'active' : ''}`} onClick={() => handleDayClick(day)}>
					<div className='dayOfWeek' style={{ fontSize: '20px' }}>
						{PolishDays[day.getDay()]}
					</div>
				</div>
			)
		})
	}
	return (
		<StyledWeeklyCalendar>
			<StyledCalendarContent>
				<SubmitButton onClick={() => handleNextWeekClick('back')} type={'button'} className='primary'>
					<ArrowBackIosIcon />
				</SubmitButton>
				<StyledCalendarDays>{renderDays()}</StyledCalendarDays>
				<SubmitButton onClick={() => handleNextWeekClick('next')} type={'button'} className='primary'>
					<ArrowForwardIosIcon />
				</SubmitButton>
			</StyledCalendarContent>
			<StyledCalendarHeader>
				<span>Repertuar na dzień: {format(reservationDate, 'dd/MM/yyyy')}</span>
				<DateNowButton type='button' className='primary' onClick={setDateNow}>
					Dziś
				</DateNowButton>
			</StyledCalendarHeader>
		</StyledWeeklyCalendar>
	)
}

export default Calendar

const StyledWeeklyCalendar = styled.div`
	width: 100%;
`

const DateNowButton = styled(SubmitButton)`
	padding: 5px 20px;
`

const StyledCalendarHeader = styled.h2`
	text-align: center;
	display: flex;

	align-items: center;
	gap: 10px;
`

const StyledCalendarContent = styled.div`
	display: flex;
	flex-direction: row;
	margin: 0 auto;
	width: 100%;
`

const StyledCalendarDays = styled.div`
	display: flex;
	cursor: pointer;
	flex: 1;
	.day {
		@media screen and (max-width: 800px) {
			width: 100%;
			padding: 0;
		}
		width: 100%;

		padding: 10px 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		&:hover {
			background-color: ${({ theme }) => theme.colors.secondary};
		}

		.dayNumber {
			@media screen and (max-width: 800px) {
				font-size: 10px;
				font-weight: bold;
			}
			font-size: 18px;
			font-weight: bold;
		}

		.dayOfWeek {
			@media screen and (max-width: 800px) {
				font-size: 8px;
				color: #ffffff;
			}

			font-size: 14px;
			color: #ffffff;
		}
	}
	.active {
		background-color: ${({ theme }) => theme.colors.secondary};
	}
`
