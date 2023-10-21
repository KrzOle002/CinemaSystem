import AuthHeader from '../../components/AuthHeader'
import CloseTag from '../../components/CloseTag'
import InputLabel from '../../components/InputLabel'
import Reminder from '../../components/Reminder'
import SubmitButton from '../../components/SubmitButton'
import { useScreenWidth } from '../../hooks/useScreenWidth'
import { AuthContainer, Container, HelpSection, Wrapper } from './AuthForm.style'

const Login = () => {
	const resolution = useScreenWidth()
	return (
		<Wrapper>
			<CloseTag link={'/'} />
			<AuthContainer>
				<Container>
					<AuthHeader>Logowanie</AuthHeader>
					<InputLabel placeholder={'Email'} />
					<InputLabel placeholder={'Hasło'} type={'password'} />
					<HelpSection>
						<Reminder link={'/register'}>Nie masz konta?</Reminder>
						{resolution > 640 ? <span>|</span> : null}
						<Reminder link={'/'}>Nie pamiętasz hasła ? </Reminder>
					</HelpSection>
					<SubmitButton type={'submit'} className={'primary'} onClick={() => console.log('dupa')}>
						Zaloguj się
					</SubmitButton>
				</Container>
			</AuthContainer>
		</Wrapper>
	)
}

export default Login
