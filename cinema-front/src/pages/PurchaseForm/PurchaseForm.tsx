import { useAuthUser } from 'react-auth-kit'
import styled from 'styled-components'

const PurchaseForm = () => {
	const auth = useAuthUser()
	return <Wrapper>Hello{auth() != null ? auth()?.email : ' just user'}</Wrapper>
}
export default PurchaseForm

const Wrapper = styled.div`
	color: white;
	height: 100vh;
`
