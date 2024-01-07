import { useAuthUser, useSignOut } from 'react-auth-kit'
import styled from 'styled-components'
import SubmitButton from '../../components/SubmitButton'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Account = () => {
	const auth = useAuthUser()
	const signOut = useSignOut()
	const navigate = useNavigate()
	return (
		<Wrapper>
			Hello{auth() != null ? auth()?.email : ' just user'}
			<SubmitButton
				type={'button'}
				onClick={() => {
					signOut()
					toast.success('Wylogowano')
					navigate('/')
				}}>
				Wyloguj
			</SubmitButton>
		</Wrapper>
	)
}

export default Account
const Wrapper = styled.div`
	color: white;
	height: 100vh;
`
