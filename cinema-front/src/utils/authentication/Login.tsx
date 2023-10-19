import AuthHeader from '../../components/AuthHeader'
import InputLabel from '../../components/InputLabel'
import SubmitButton from '../../components/SubmitButton'
import { Wrapper } from './Authenticate.style'

const Login = () => {
	return (
		<Wrapper>
			<AuthHeader>Logowanie</AuthHeader>
			<InputLabel title={'Login'} />
			<InputLabel title={'Hasło'} type={'password'} />
			<SubmitButton type={'button'} className={'primary'}>
				Wyślij
			</SubmitButton>
		</Wrapper>
	)
}

export default Login
