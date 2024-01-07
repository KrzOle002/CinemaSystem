import { useForm } from 'react-hook-form'
import AuthHeader from '../../components/AuthHeader'
import CloseTag from '../../components/CloseTag'
import InputLabel from '../../components/InputLabel'
import NavigationLink from '../../components/NavigationLink'
import SubmitButton from '../../components/SubmitButton'
import { useScreenWidth } from '../../hooks/useScreenWidth'
import { AuthContainer, Container, HelpSection, Wrapper } from './AuthForm.style'
import axios from 'axios'
import { useSignIn } from 'react-auth-kit'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useUserAuthContext } from '../../context/UserAuthContext'
import useAuthHook from '../../utils/auth/useAuth'
import { useEffect } from 'react'

interface LoginDataType {
	email: string
	password: string
}
interface ResponseType {
	data: {
		token: string
	}
}

const Login = () => {
	const resolution = useScreenWidth()
	const signIn = useSignIn()
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginDataType>()

	const { isAuthenticated, getData, api } = useAuthHook()

	useEffect(() => {
		if (isAuthenticated()) {
			getData()
		}
	}, [isAuthenticated, getData])

	const onSubmit = async (data: LoginDataType) => {
		data.email = data.email.toLocaleLowerCase()
		try {
			const response = await axios.post(api + '/api/auth/login', data)
			await signIn({
				token: response.data.token,
				tokenType: 'Bearer',
				expiresIn: 300,
				authState: { email: data.email },
			})

			toast.success('Zalogowano')
			navigate(-1)
		} catch (err) {
			toast.error('Nie udało się zalogować')
		}
	}
	return (
		<Wrapper>
			<CloseTag link={'/'} />
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
								minLength: { value: 6, message: 'Hasło musi być dłuższe niż 6 znaków' },
							}),
						}}
						className={errors.password && 'error'}
						validation={errors.password?.message}
					/>
					<HelpSection>
						<NavigationLink link={'/register'} size={'15px'}>
							Nie masz konta?
						</NavigationLink>
						{resolution > 640 ? <span>|</span> : null}
						<NavigationLink size={'15px'} link={'/'}>
							Nie pamiętasz hasła ?{' '}
						</NavigationLink>
					</HelpSection>
					<SubmitButton type={'submit'} className={'primary'} fullWidth>
						Zaloguj się
					</SubmitButton>
				</Container>
			</AuthContainer>
		</Wrapper>
	)
}

export default Login
