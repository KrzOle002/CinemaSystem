import styled from 'styled-components'
import NavigationLink from '../../components/NavigationLink'
import DesktopNav from '../navigation/DesktopNav'
import AuthHeader from '../../components/AuthHeader'
import logo from '../../assets/logo-icon.png'
const Header = () => {
	return (
		<Wrapper>
			<Container>
				<StyledLogo>
					<FitImg src={logo} alt={'Obrazek logo'} />
					<AuthHeader>Cinema Fordon</AuthHeader>
				</StyledLogo>
				<DesktopNav />
				<NavigationLink size='15px' link={'/login'}>
					Zaloguj się
				</NavigationLink>
			</Container>
		</Wrapper>
	)
}

export default Header

const Wrapper = styled.div`
	width: 100%;
	background-color: ${({ theme }) => theme.colors.primary};
	padding: 20px 0;
`
const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	color: white;
	font-family: 'Roboto', sans-serif;
	width: 98%;
	margin: 0 auto;
`

const StyledLogo = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	column-gap: 5px;
	&:hover {
		cursor: pointer;
		color: ${({ theme }) => theme.colors.mid};
	}
`
const FitImg = styled.img`
	width: 50px;
	height: 50px;
`
