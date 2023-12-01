import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { theme } from '../../../assets/styles/theme'
import InputLabel from '../../../components/InputLabel'
import SubmitButton from '../../../components/SubmitButton'
import { MovieModelSend } from '../../../types/MovieModelType'
import useAuthHook from '../../../utils/auth/useAuth'

interface MovieDialogType {
	isOpen: boolean
	close: () => void
	movieId?: number
}

interface ScheduleType {
	roomId: string
	schedule: [{ hour: number; occupied: boolean }]
}

interface ScheduleSendType {
	roomId?: string | null
	hour?: number | null
	movieId?: string | null
}

const AdditionMovieDialog = ({ isOpen, close, movieId }: MovieDialogType) => {
	const { axiosAuth, api } = useAuthHook()
	const [schedules, setSchedules] = useState<ScheduleType[]>()
	const [selectedSchedule, setSelectedSchedule] = useState<ScheduleSendType>()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<MovieModelSend>()

	const onSubmit = async (data: MovieModelSend) => {
		const formData = new FormData()
		formData.append('cover', data.cover[0])
		formData.append('title', data.title)
		formData.append('description', data.description)
		formData.append('director', data.director)
		formData.append('genre', JSON.stringify(data.genre))
		formData.append('casts', JSON.stringify(data.casts))
		formData.append('productionCountry', data.productionCountry)
		formData.append('screeningLength', data.screeningLength)
		formData.append('ageRestrictions', data.ageRestrictions)

		try {
			await axiosAuth
				.post(api + '/api/movie/movies', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
				.then(res => {
					setSelectedSchedule({
						...selectedSchedule,
						movieId: res.data._id,
					})
				})

			if (selectedSchedule) {
				const screeningData = {
					dateFrom: data.dateFrom,
					dateTo: data.dateTo,
					hour: selectedSchedule.hour,
					movieId: selectedSchedule.movieId,
					roomId: selectedSchedule.roomId,
				}
				console.log(screeningData)
				await axios.post(api + '/api/screening/screenings', screeningData)
			}
			toast.success('Dodano film')
		} catch (err) {
			toast.error('Nie dodać filmu')
		}
	}

	const fetchSchedule = async () => {
		const res = await axiosAuth.get(api + '/api/screening/schedule')
		setSchedules(res.data)
	}

	useEffect(() => {
		fetchSchedule()
	}, [])

	return (
		<Dialog open={isOpen} onClose={close} fullWidth maxWidth={'md'} sx={{ zIndex: '500' }}>
			<DialogTitle sx={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}>
				{movieId ? <span>Edytuj film</span> : <span>Dodaj film</span>}
			</DialogTitle>
			<ContainerForm onSubmit={handleSubmit(onSubmit)}>
				<DialogContent sx={{ width: '60%', margin: '0 auto', rowGap: '20px', display: 'flex', flexDirection: 'column' }}>
					<InputLabel
						title={'Tytuł'}
						inputRef={{
							...register('title', {
								required: 'To pole jest wymagane',
							}),
						}}
						className={errors.title && 'error'}
						validation={errors.title?.message}
					/>
					<InputLabel
						title={'Opis'}
						inputRef={{
							...register('description', {
								required: 'To pole jest wymagane',
							}),
						}}
						className={errors.title && 'error'}
						validation={errors.title?.message}
					/>

					<InputLabel
						type='file'
						title='Wybierz plakat:'
						inputRef={{
							...register('cover', {
								required: 'To pole jest wymagane',
							}),
						}}
						className={errors.title && 'error'}
						validation={errors.title?.message}
					/>

					<InputLabel
						title={'Reżyser'}
						inputRef={{
							...register('director', {
								required: 'To pole jest wymagane',
							}),
						}}
						className={errors.title && 'error'}
						validation={errors.title?.message}
					/>
					<InputLabel
						title={'Gatunek'}
						inputRef={{
							...register('genre', {
								required: 'To pole jest wymagane',
							}),
						}}
						className={errors.title && 'error'}
						validation={errors.title?.message}
					/>
					<InputLabel
						title={'Obsada'}
						inputRef={{
							...register('casts', {
								required: 'To pole jest wymagane',
							}),
						}}
						className={errors.title && 'error'}
						validation={errors.title?.message}
					/>
					<InputLabel
						title={'Kraj produkcji'}
						inputRef={{
							...register('productionCountry', {
								required: 'To pole jest wymagane',
							}),
						}}
						className={errors.title && 'error'}
						validation={errors.title?.message}
					/>
					<InputLabel
						title={'Rok produkcji'}
						inputRef={{
							...register('productionYear', {
								required: 'To pole jest wymagane',
							}),
						}}
						className={errors.title && 'error'}
						validation={errors.title?.message}
					/>
					<InputLabel
						title={'Długość'}
						inputRef={{
							...register('screeningLength', {
								required: 'To pole jest wymagane',
							}),
						}}
						className={errors.title && 'error'}
						validation={errors.title?.message}
					/>
					<InputLabel
						title={'Wiek'}
						inputRef={{
							...register('ageRestrictions'),
						}}
						className={errors.title && 'error'}
						validation={errors.title?.message}
					/>

					<InputLabel
						title={'Data transmisji'}
						type={'date'}
						inputRef={{
							...register('dateFrom', {
								required: true,
							}),
						}}
						required
						className={errors.dateFrom && 'error'}
					/>
					<InputLabel
						title={'Data zakończenia'}
						type={'date'}
						inputRef={{
							...register('dateTo', {
								required: true,
							}),
						}}
						required
						className={errors.dateTo && 'error'}
					/>
					<div>
						Wybór godziny
						{schedules?.map((option, index) => {
							return (
								<div key={index} style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center', padding: '10px 0' }}>
									Sala nr {index + 1}:
									{option.schedule.map((schedule, index) => {
										return (
											<SubmitButton
												key={index}
												className={selectedSchedule?.hour == schedule.hour && selectedSchedule.roomId == option.roomId ? 'warn' : 'primary'}
												disabled={schedule.occupied}
												type={'button'}
												onClick={() => {
													setSelectedSchedule({
														roomId: option.roomId,
														hour: schedule.hour,
													})
												}}>
												{schedule.hour}
											</SubmitButton>
										)
									})}
								</div>
							)
						})}
					</div>
				</DialogContent>

				<DialogActions sx={{ width: '40%', marginLeft: 'auto' }}>
					{movieId ? (
						<SubmitButton fullWidth type={'submit'} className='warn'>
							Edytuj
						</SubmitButton>
					) : (
						<SubmitButton fullWidth type={'submit'} className='success'>
							Dodaj
						</SubmitButton>
					)}
					<SubmitButton fullWidth onClick={() => close()} type={'button'} className='primary'>
						Anuluj
					</SubmitButton>
				</DialogActions>
			</ContainerForm>
		</Dialog>
	)
}

export default AdditionMovieDialog

const ContainerForm = styled.form`
	width: 100%;
	overflow: scroll;
`
