import AuthHeader from '../../components/AuthHeader'
import CloseTag from '../../components/CloseTag'
import InputLabel from '../../components/InputLabel'
import Reminder from '../../components/Reminder'
import SubmitButton from '../../components/SubmitButton'
import { AuthContainer, Container, HelpSection, Wrapper } from './AuthForm.style'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

interface RegisterDataType {
	email: string
	name: string
	surname: string
	password: string
	rePassword: string
}

const api = import.meta.env.VITE_API_BASE_URL

const Register = () => {
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<RegisterDataType>()

	const onSubmit = (data: RegisterDataType) => {
		if (data.password == data.rePassword) {
			axios
				.post(api + '/api/users/register', data)
				.then(() => {
					toast.success('Utworzono konto', {
						onClose: () => {
							navigate('/login')
						},
					})
				})
				.catch(() => toast.error('Nie udało się utworzyć konta'))
		}
	}
	return (
		<Wrapper>
			<CloseTag link={'/'} />
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
						<Reminder link={'/login'}>Masz już konto?</Reminder>
					</HelpSection>
					<SubmitButton type={'submit'} className={'primary'}>
						Zarejestruj się
					</SubmitButton>
				</Container>
			</AuthContainer>
		</Wrapper>
	)
}

export default Register
