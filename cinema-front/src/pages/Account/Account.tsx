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
			<SubmitButton
				onClick={() => {
					navigate('/reservations')
				}}
				type={'button'}
				className='primary'
				fullWidth>
				Moje Rezerwacje
			</SubmitButton>
			<SubmitButton
				onClick={() => {
					navigate('/admin-panel')
				}}
				type={'button'}
				className='primary'
				fullWidth>
				Panel Administracyjny
			</SubmitButton>
			<SubmitButton
				type={'button'}
				className='primary'
				onClick={() => {
					signOut()
					toast.success('Wylogowano')
					navigate('/')
				}}
				fullWidth>
				Wyloguj
			</SubmitButton>
		</Wrapper>
	)
}

export default Account
const Wrapper = styled.div`
	color: white;
	padding: 40px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;
	width: 90%;
	margin: 0 auto;
`
