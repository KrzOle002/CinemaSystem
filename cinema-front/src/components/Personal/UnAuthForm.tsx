import { useForm } from 'react-hook-form'
import { useReservationContext } from '../../context/ReservationContext'
import { AuthContainer, Container } from '../../pages/AuthForm/AuthForm.style'
import AuthHeader from '../AuthHeader'
import InputLabel from '../InputLabel'
import SubmitButton from '../SubmitButton'

interface UnAuthDataType {
	email: string
	reEmail: string
	name: string
	surname: string
	phone?: number
}
const UnAuthForm = () => {
	const { setStep, setCustomer } = useReservationContext()
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<UnAuthDataType>()

	const onSubmit = async (data: UnAuthDataType) => {
		if (data.email == data.reEmail) {
			data.email = data.email.toLocaleLowerCase()

			const newCustomer = {
				email: data.email,
				name: data.name,
				surname: data.surname,
				phone: data.phone,
			}
			setCustomer(newCustomer)

			setStep('payment')
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
