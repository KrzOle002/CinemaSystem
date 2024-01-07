import axios from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { AuthContainer, Container, HelpSection } from '../../pages/AuthForm/AuthForm.style'
import AuthHeader from '../AuthHeader'
import NavigationLink from '../NavigationLink'
import SubmitButton from '../SubmitButton'
import InputLabel from '../InputLabel'
import useAuthHook from '../../utils/auth/useAuth'

interface RegisterDataType {
	email: string
	name: string
	surname: string
	password: string
	rePassword: string
}

interface GetAuthFormType {
	setAuthStep: React.Dispatch<React.SetStateAction<string>>
}

const GetAuthForm = ({ setAuthStep }: GetAuthFormType) => {
	const { api } = useAuthHook()
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<RegisterDataType>()

	const onSubmit = async (data: RegisterDataType) => {
		if (data.password == data.rePassword) {
			data.email = data.email.toLocaleLowerCase()
			await axios
				.post(api + '/api/users/register', data)
				.then(() => {
					toast.success('Utworzono konto teraz możesz się zalogować', {
						onClose: () => {
							setAuthStep('login')
						},
					})
				})
				.catch(() => toast.error('Nie udało się utworzyć konta'))
		}
	}
	return (
		<AuthContainer>
			<Container onSubmit={handleSubmit(onSubmit)}>
				<AuthHeader>Rejestracja</AuthHeader>

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
					placeholder={'Hasło'}
					type={'password'}
					inputRef={{
						...register('password', {
							required: 'To pole jest wymagane',
							minLength: { value: 6, message: 'Hasło musi być dłuższe niż 6 znaków' },
						}),
					}}
					className={errors.password && 'error'}
					validation={errors.password?.message}
				/>
				<InputLabel
					placeholder={'Powtórz hasło'}
					type={'password'}
					inputRef={{
						...register('rePassword', {
							required: 'To pole jest wymagane',
							minLength: { value: 6, message: 'Hasło musi być dłuższe niż 6 znaków' },
							validate: (val: string) => {
								if (watch('password') != val) {
									return 'Hasła się różnią'
								}
							},
						}),
					}}
					className={errors.rePassword && 'error'}
					validation={errors.rePassword?.message}
				/>
				<HelpSection>
					<NavigationLink size={'15px'} link={''} onClick={() => setAuthStep('login')}>
						Masz już konto?
					</NavigationLink>
				</HelpSection>
				<SubmitButton fullWidth type={'submit'} className={'primary'}>
					Zarejestruj się
				</SubmitButton>
			</Container>
		</AuthContainer>
	)
}

export default GetAuthForm
