import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { theme } from '../../../assets/styles/theme'
import InputLabel from '../../../components/InputLabel'
import SubmitButton from '../../../components/SubmitButton'
import { MovieModel, MovieModelSend } from '../../../types/MovieModelType'
import useAuthHook from '../../../utils/auth/useAuth'

interface MovieDialogType {
	isOpen: boolean
	close: () => void
	movieId?: number | null
}

const EditMovieDialog = ({ isOpen, close, movieId }: MovieDialogType) => {
	const { axiosAuth, api } = useAuthHook()

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<MovieModelSend>()

	const onSubmit = async (data: MovieModelSend) => {
		const formData = new FormData()
		formData.append('title', data.title)
		formData.append('description', data.description)
		formData.append('director', data.director)
		formData.append('genre', JSON.stringify(data.genre))
		formData.append('casts', JSON.stringify(data.casts))
		formData.append('productionYear', data.productionYear)
		formData.append('productionCountry', data.productionCountry)
		formData.append('screeningLength', data.screeningLength)
		formData.append('ageRestrictions', data.ageRestrictions)

		try {
			await axiosAuth.put(api + `/api/movie/movies/${movieId}`, formData)
			toast.success('Dodano film')
		} catch (err) {
			toast.error('Nie dodać filmu')
		}
	}
	const fetchMovie = async () => {
		const res = await axiosAuth.get(api + `/api/movie/movies/${movieId}`)

		setValue('title', res.data.title)
		setValue('description', res.data.description)
		setValue('director', res.data.director)
		setValue('genre', res.data.genre.join(', ')) // Assuming 'genre' is an array
		setValue('casts', res.data.casts.join(', ')) // Assuming 'casts' is an array
		setValue('productionCountry', res.data.productionCountry)
		setValue('productionYear', res.data.productionYear) // Ensure it's a string
		setValue('screeningLength', res.data.screeningLength) // Ensure it's a string
		setValue('ageRestrictions', res.data.ageRestrictions)
	}

	useEffect(() => {
		movieId ? fetchMovie() : reset()
	}, [movieId])

	return (
		<Dialog open={isOpen} onClose={close} fullWidth maxWidth={'md'} sx={{ zIndex: '500' }}>
			<DialogTitle sx={{ backgroundColor: theme.colors.primary, color: theme.colors.white }}>
				<span>Edytuj film</span>
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
					/>
					<InputLabel
						title={'Opis'}
						inputRef={{
							...register('description', {
								required: 'To pole jest wymagane',
							}),
						}}
					/>

					<InputLabel
						title={'Reżyser'}
						inputRef={{
							...register('director', {
								required: 'To pole jest wymagane',
							}),
						}}
					/>
					<InputLabel
						title={'Gatunek'}
						inputRef={{
							...register('genre', {
								required: 'To pole jest wymagane',
							}),
						}}
					/>
					<InputLabel
						title={'Obsada'}
						inputRef={{
							...register('casts', {
								required: 'To pole jest wymagane',
							}),
						}}
					/>
					<InputLabel
						title={'Kraj produkcji'}
						inputRef={{
							...register('productionCountry', {
								required: 'To pole jest wymagane',
							}),
						}}
					/>
					<InputLabel
						title={'Rok produkcji'}
						inputRef={{
							...register('productionYear', {
								required: 'To pole jest wymagane',
							}),
						}}
					/>
					<InputLabel
						title={'Długość'}
						inputRef={{
							...register('screeningLength', {
								required: 'To pole jest wymagane',
							}),
						}}
					/>
					<InputLabel
						title={'Wiek'}
						inputRef={{
							...register('ageRestrictions'),
						}}
					/>
				</DialogContent>

				<DialogActions sx={{ width: '40%', marginLeft: 'auto' }}>
					<SubmitButton fullWidth type={'submit'} className='warn'>
						Edytuj
					</SubmitButton>

					<SubmitButton fullWidth onClick={() => close()} type={'button'} className='primary'>
						Anuluj
					</SubmitButton>
				</DialogActions>
			</ContainerForm>
		</Dialog>
	)
}

export default EditMovieDialog

const ContainerForm = styled.form`
	width: 100%;
	overflow: scroll;
`
