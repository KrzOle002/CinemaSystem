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
	background: ${({ theme }) => theme.colors.original};
	margin: 0;
	padding: 0;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
`
