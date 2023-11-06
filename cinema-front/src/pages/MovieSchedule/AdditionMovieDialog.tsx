import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { theme } from '../../assets/styles/theme'
import styled from 'styled-components'
import SubmitButton from '../../components/SubmitButton'
import { useForm } from 'react-hook-form'
import { MovieModel } from '../../types/MovieModelType'
import InputLabel from '../../components/InputLabel'

import useAuthHook from '../../utils/auth/useAuth'
import { toast } from 'react-toastify'

interface MovieDialogType {
	isOpen: boolean
	close: () => void
}

const AdditionMovieDialog = ({ isOpen, close }: MovieDialogType) => {
	const { axiosAuth } = useAuthHook()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<MovieModel>()
	const api = import.meta.env.VITE_API_BASE_URL
	const onSubmit = async (data: MovieModel) => {
		console.log(data)
		const formData = new FormData()
		formData.append('title', data.title)
		formData.append('description', data.description)
		formData.append('director', data.director)
		formData.append('genre', JSON.stringify(data.genre))
		formData.append('casts', JSON.stringify(data.casts))
		formData.append('productionCountry', data.productionCountry)
		formData.append('screeningLength', data.screeningLength)
		formData.append('ageRestrictions', data.ageRestrictions)
		formData.append('cover', data.cover[0])
		formData.append('banner', data.banner[0])

		try {
			await axiosAuth.post(api + '/api/movie/movies', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})

			toast.success('Dodano film')
		} catch (err) {
			toast.error('Nie dodać filmu')
		}
	}
	return (
		<Dialog open={isOpen} onClose={close} fullWidth maxWidth={'md'}>
			<DialogTitle sx={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}>Dodaj film</DialogTitle>
			<ContainerForm onSubmit={handleSubmit(onSubmit)}>
				<DialogContent sx={{ width: '60%', margin: '0 auto' }}>
					<InputLabel
						placeholder={'Tytuł'}
						inputRef={{
							...register('title', {
								required: 'To pole jest wymagane',
							}),
						}}
						className={errors.title && 'error'}
						validation={errors.title?.message}
					/>
					<InputLabel
						placeholder={'Opis'}
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
						type='file'
						title='Wybierz baner:'
						inputRef={{
							...register('banner', {
								required: 'To pole jest wymagane',
							}),
						}}
						className={errors.title && 'error'}
						validation={errors.title?.message}
					/>
					<InputLabel
						placeholder={'Reżyser'}
						inputRef={{
							...register('director', {
								required: 'To pole jest wymagane',
							}),
						}}
						className={errors.title && 'error'}
						validation={errors.title?.message}
					/>
					<InputLabel
						placeholder={'Gatunek'}
						inputRef={{
							...register('genre', {
								required: 'To pole jest wymagane',
							}),
						}}
						className={errors.title && 'error'}
						validation={errors.title?.message}
					/>
					<InputLabel
						placeholder={'Obsada'}
						inputRef={{
							...register('casts', {
								required: 'To pole jest wymagane',
							}),
						}}
						className={errors.title && 'error'}
						validation={errors.title?.message}
					/>
					<InputLabel
						placeholder={'Kraj produkcji'}
						inputRef={{
							...register('productionCountry', {
								required: 'To pole jest wymagane',
							}),
						}}
						className={errors.title && 'error'}
						validation={errors.title?.message}
					/>
					<InputLabel
						placeholder={'Długość'}
						inputRef={{
							...register('screeningLength', {
								required: 'To pole jest wymagane',
							}),
						}}
						className={errors.title && 'error'}
						validation={errors.title?.message}
					/>
					<InputLabel
						placeholder={'Wiek'}
						inputRef={{
							...register('ageRestrictions', {
								required: 'To pole jest wymagane',
							}),
						}}
						className={errors.title && 'error'}
						validation={errors.title?.message}
					/>
				</DialogContent>

				<DialogActions sx={{ width: '40%', marginLeft: 'auto' }}>
					<SubmitButton type={'submit'} className='success'>
						Dodaj
					</SubmitButton>
					<SubmitButton onClick={() => close()} type={'button'} className='primary'>
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
`
