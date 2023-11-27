import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContainer, Container, HelpSection } from '../../pages/AuthForm/AuthForm.style'
import AuthHeader from '../AuthHeader'
import NavigationLink from '../NavigationLink'
import SubmitButton from '../SubmitButton'
import InputLabel from '../InputLabel'
import useAuthHook from '../../utils/auth/useAuth'

interface UnAuthDataType {
	email: string
	reEmail: string
	name: string
	surname: string
	phone?: number
}
const UnAuthForm = () => {
	const navigate = useNavigate()
	const { api } = useAuthHook()
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<UnAuthDataType>()

	const onSubmit = async (data: UnAuthDataType) => {
		if (data.email == data.reEmail) {
			data.email = data.email.toLocaleLowerCase()
			console.log(data)
		}
	}
	return (
		<AuthContainer>
			<Container onSubmit={handleSubmit(onSubmit)}>
				<AuthHeader>Dane do zakupu</AuthHeader>

				<InputLabel
					placeholder={'Imie'}
					inputRef={{ ...register('name', { required: 'To pole jest wymagane' }) }}
					className={errors.name && 'error'}
					validation={errors.name?.message}
				/>
				<InputLabel
					placeholder={'Nazwisko'}
					inputRef={{ ...register('surname', { required: 'To pole jest wymagane' }) }}
					className={errors.surname && 'error'}
					validation={errors.surname?.message}
				/>
				<InputLabel
					placeholder={'Email'}
					inputRef={{
						...register('email', {
							required: 'To pole jest wymagane',
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: 'Niepoprawny format adresu email',
							},
						}),
					}}
					className={errors.email && 'error'}
					validation={errors.email?.message}
				/>

				<InputLabel
					placeholder={'Powtórz Email'}
					inputRef={{
						...register('reEmail', {
							required: 'To pole jest wymagane',
							validate: (val: string) => {
								if (watch('email') != val) {
									return 'Maile się różnią'
								}
							},
						}),
					}}
					className={errors.reEmail && 'error'}
					validation={errors.reEmail?.message}
				/>
				<InputLabel
					placeholder={'Numer telefonu (opcjonalne)'}
					inputRef={{
						...register('phone', {
							pattern: { value: /^\d{9}$/, message: 'Numer telefonu musi zawierać 9 cyfr' },
						}),
					}}
					className={errors.phone && 'error'}
					validation={errors.phone?.message}
				/>
				<SubmitButton fullWidth type={'submit'} className={'primary'}>
					Rezerwacja bez rejestracji
				</SubmitButton>
			</Container>
		</AuthContainer>
	)
}

export default UnAuthForm
