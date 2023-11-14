import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { theme } from '../../assets/styles/theme'
import styled from 'styled-components'
import SubmitButton from '../../components/SubmitButton'
import { useForm } from 'react-hook-form'
import { MovieModelSend } from '../../types/MovieModelType'
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
	} = useForm<MovieModelSend>()
	const api = import.meta.env.VITE_API_BASE_URL
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
		<Dialog open={isOpen} onClose={close} fullWidth maxWidth={'md'} sx={{ zIndex: '2000' }}>
			<DialogTitle sx={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}>Dodaj film</DialogTitle>
			<ContainerForm onSubmit={handleSubmit(onSubmit)}>
				<DialogContent
					sx={{ width: '60%', margin: '0 auto', rowGap: '20px', display: 'flex', flexDirection: 'column' }}>
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
				</DialogContent>

				<DialogActions sx={{ width: '40%', marginLeft: 'auto' }}>
					<SubmitButton fullWidth type={'submit'} className='success'>
						Dodaj
					</SubmitButton>
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
