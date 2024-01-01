import SubmitButton from '../../../components/SubmitButton'
import styled from 'styled-components'

const SchedulePanel = () => {
	// contorlny
	// <InputLabel
	// 					title={'Data transmisji'}
	// 					type={'date'}
	// 					inputRef={{
	// 						...register('dateFrom', {
	// 							required: true,
	// 						}),
	// 					}}
	// 					required
	// 					className={errors.dateFrom && 'error'}
	// 				/>
	// 				<InputLabel
	// 					title={'Data zakończenia'}
	// 					type={'date'}
	// 					inputRef={{
	// 						...register('dateTo', {
	// 							required: true,
	// 						}),
	// 					}}
	// 					required
	// 					className={errors.dateTo && 'error'}
	// 				/>
	// 				<div>
	// 					Wybór godziny
	// 					{schedules?.map((option, index) => {
	// 						return (
	// 							<div key={index} style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center', padding: '10px 0' }}>
	// 								Sala nr {index + 1}:
	// 								{option.schedule.map((schedule, index) => {
	// 									return (
	// 										<SubmitButton
	// 											key={index}
	// 											className={selectedSchedule?.hour == schedule.hour && selectedSchedule.roomId == option.roomId ? 'warn' : 'primary'}
	// 											disabled={schedule.occupied}
	// 											type={'button'}
	// 											onClick={() => {
	// 												setSelectedSchedule({
	// 													roomId: option.roomId,
	// 													hour: schedule.hour,
	// 												})
	// 											}}>
	// 											{schedule.hour}
	// 										</SubmitButton>
	// 									)
	// 								})}
	// 							</div>
	// 						)
	// 					})}
	// 				</div>
	return (
		<Wrapper>
			<SubmitButton fullWidth type={'button'} className='primary'>
				Zaplanuj repertuar
			</SubmitButton>
		</Wrapper>
	)
}

export default SchedulePanel

const Wrapper = styled.div`
	color: ${({ theme }) => theme.colors.white};
	width: 100%;
`
