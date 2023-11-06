import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { theme } from '../../assets/styles/theme'
import styled from 'styled-components'
import SubmitButton from '../../components/SubmitButton'
import { useForm } from 'react-hook-form'
import { MovieModel } from '../../types/MovieModelType'
import InputLabel from '../../components/InputLabel'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

interface MovieDialogType {
	isOpen: boolean
	close: () => void
}

const AdditionMovieDialog = ({ isOpen, close }: MovieDialogType) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<MovieModel>()
	const onSubmit = (data: MovieModel) => {
		console.log(data)
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

					<Button component='label' variant='contained' startIcon={<CloudUploadIcon />}>
						Upload file
						<VisuallyHiddenInput
							placeholder={'Plakat'}
							{...register('cover', {
								required: 'To pole jest wymagane',
							})}
							type='file'
							className={errors.title && 'error'}
						/>
					</Button>
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
const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
})
