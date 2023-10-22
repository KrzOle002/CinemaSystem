import AuthHeader from '../../components/AuthHeader'
import CloseTag from '../../components/CloseTag'
import InputLabel from '../../components/InputLabel'
import Reminder from '../../components/Reminder'
import SubmitButton from '../../components/SubmitButton'
import { AuthContainer, Container, HelpSection, Wrapper } from './AuthForm.style'
import { useForm } from 'react-hook-form'
import axios from 'axios'

interface RegisterDataType {
	email: string
	name: string
	surname: string
	password: string
	rePassword: string
}
const api = import.meta.env.VITE_API_BASE_URL
const onSubmit = (data: RegisterDataType) => {
	if (data.password == data.rePassword) {
		axios
			.post(api + '/api/users/register', data)
			.then(() => console.log('Utworzono usera'))
			.catch(err => console.log(err))
	}
}

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterDataType>()
	return (
		<Wrapper>
			<CloseTag link={'/'} />
			<AuthContainer>
				<Container onSubmit={handleSubmit(onSubmit)}>
					<AuthHeader>Rejestracja</AuthHeader>

					<InputLabel
						placeholder={'Imie'}
						inputRef={{ ...register('name', { required: true }) }}
						className={errors.name && 'error'}
					/>
					<InputLabel
						placeholder={'Nazwisko'}
						inputRef={{ ...register('surname', { required: true }) }}
						className={errors.surname && 'error'}
					/>
					<InputLabel
						placeholder={'Email'}
						inputRef={{
							...register('email', {
								required: true,
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: 'Niepoprawny format adresu email',
								},
							}),
						}}
						className={errors.email && 'error'}
					/>
					<InputLabel
						placeholder={'Hasło'}
						type={'password'}
						inputRef={{ ...register('password', { required: true }) }}
						className={errors.password && 'error'}
					/>
					<InputLabel
						placeholder={'Powtórz hasło'}
						type={'password'}
						inputRef={{ ...register('rePassword', { required: true }) }}
						className={errors.rePassword && 'error'}
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
