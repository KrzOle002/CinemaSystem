import styled from 'styled-components'
import SectionHeader from '../../../components/SectionHeader'
import { useReservationContext } from '../../../context/ReservationContext'
import UnAuthForm from '../../../components/Personal/UnAuthForm'
import AuthForm from '../../../components/Personal/AuthForm'
import GetAuthForm from '../../../components/Personal/GetAuthForm'
import SubmitButton from '../../../components/SubmitButton'
import { useState } from 'react'

const ChoosePersonal = () => {
	const { setStep } = useReservationContext()

	const [authStep, setAuthStep] = useState<string>('login')
	return (
		<Wrapper>
			<SectionHeader>Dane Osobowe</SectionHeader>
			<SubmitButton
				className='primary'
				onClick={() => {
					setStep('tickets')
				}}
				type={'button'}>
				{'Powrót'}
			</SubmitButton>
			<Container>
				<AuthMethod>
					<UnAuthForm />
				</AuthMethod>
				<AuthMethod>{authStep == 'login' ? <AuthForm setAuthStep={setAuthStep} /> : <GetAuthForm setAuthStep={setAuthStep} />}</AuthMethod>
			</Container>
		</Wrapper>
	)
}

export default ChoosePersonal

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	@media screen and (max-width: 800px) {
		width: 100%;
	}
`

const Container = styled.div`
	@media screen and (max-width: 800px) {
		flex-direction: column;
		padding: 0;
		margin: 0;
		width: 100%;
	}
	display: flex;
	flex-direction: row;
`
const AuthMethod = styled.div`
	display: flex;
	flex-direction: column;
`
