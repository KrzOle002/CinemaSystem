import styled from 'styled-components'
import NavList from './../../routes/NavList'
const MainPage = () => {
	return (
		<Wrapper>
			<NavList />
		</Wrapper>
	)
}

export default MainPage

export const Wrapper = styled.div`
	width: 100%;
	background: ${({ theme }) => theme.colors.original};
	background-attachment: fixed;
	display: flex;
	flex-direction: column;
	position: relative;
`
