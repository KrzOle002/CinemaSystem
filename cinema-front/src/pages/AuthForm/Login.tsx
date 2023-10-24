import AuthHeader from '../../components/AuthHeader'
import CloseTag from '../../components/CloseTag'
import InputLabel from '../../components/InputLabel'
import NavigationLink from '../../components/NavigationLink'
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
						<NavigationLink link={'/register'} size={'15px'}>
							Nie masz konta?
						</NavigationLink>
						{resolution > 640 ? <span>|</span> : null}
						<NavigationLink size={'15px'} link={'/'}>
							Nie pamiętasz hasła ?{' '}
						</NavigationLink>
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
