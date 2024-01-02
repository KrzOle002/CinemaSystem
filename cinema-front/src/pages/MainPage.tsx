import styled from 'styled-components'
import NavList from './../../routes/NavList'
import PageFooter from './PageFooter'
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
	height: 100%;
	background: ${({ theme }) => theme.colors.original};
	background-attachment: fixed;
	display: flex;
	flex-direction: column;
	position: relative;
`
