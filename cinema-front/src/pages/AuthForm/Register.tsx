import AuthHeader from '../../components/AuthHeader'
import CloseTag from '../../components/CloseTag'
import InputLabel from '../../components/InputLabel'
import Reminder from '../../components/Reminder'
import SubmitButton from '../../components/SubmitButton'
import { AuthContainer, Container, HelpSection, Wrapper } from './AuthForm.style'

const Register = () => {
	return (
		<Wrapper>
			<CloseTag link={'/'} />
			<AuthContainer>
				<Container>
					<AuthHeader>Rejestracja</AuthHeader>
					<InputLabel placeholder={'Imie'} />
					<InputLabel placeholder={'Nazwisko'} />
					<InputLabel placeholder={'Email'} />
					<InputLabel placeholder={'Hasło'} type={'password'} />
					<InputLabel placeholder={'Powtórz hasło'} type={'password'} />
					<HelpSection>
						<Reminder link={'/login'}>Masz już konto?</Reminder>
					</HelpSection>
					<SubmitButton type={'submit'} className={'primary'} onClick={() => console.log('dupa')}>
						Zarejestruj się
					</SubmitButton>
				</Container>
			</AuthContainer>
		</Wrapper>
	)
}

export default Register
