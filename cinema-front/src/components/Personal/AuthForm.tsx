import axios from 'axios'
import { useSignIn } from 'react-auth-kit'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import AuthHeader from '../../components/AuthHeader'
import InputLabel from '../../components/InputLabel'
import NavigationLink from '../../components/NavigationLink'
import SubmitButton from '../../components/SubmitButton'
import { AuthContainer, Container, HelpSection } from '../../pages/AuthForm/AuthForm.style'
import useAuthHook from '../../utils/auth/useAuth'
import { useReservationContext } from '../../context/ReservationContext'

interface LoginDataType {
	email: string
	password: string
}
interface AuthFormType {
	setAuthStep: React.Dispatch<React.SetStateAction<string>>
}

const AuthForm = ({ setAuthStep }: AuthFormType) => {
	const signIn = useSignIn()
	const { api } = useAuthHook()
	const { setStep } = useReservationContext()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginDataType>()

	const onSubmit = async (data: LoginDataType) => {
		data.email = data.email.toLocaleLowerCase()
		try {
			const res = await axios.post(api + '/api/auth/login', data)

			signIn({
				token: res.data.token,
				tokenType: 'Bearer',
				expiresIn: 300,
				authState: { email: data.email },
			})
			toast.success('Zalogowano')
			setStep('payment')
		} catch (err) {
			toast.error('Nie udało się zalogować')
		}
	}

	return (
		<AuthContainer>
			<Container onSubmit={handleSubmit(onSubmit)}>
				<AuthHeader>Logowanie</AuthHeader>
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
						}),
					}}
					className={errors.password && 'error'}
					validation={errors.password?.message}
				/>
				<HelpSection>
					<NavigationLink onClick={() => setAuthStep('register')} size={'15px'}>
						Nie masz konta?
					</NavigationLink>
				</HelpSection>
				<SubmitButton type={'submit'} className={'primary'} fullWidth>
					Zaloguj się
				</SubmitButton>
			</Container>
		</AuthContainer>
	)
}

export default AuthForm
