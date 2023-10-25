import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import styled from 'styled-components'
import logo from '../../assets/logo-icon.png'
import NavigationLink from '../../components/NavigationLink'
import { useMenuBarContext } from '../../context/MenuBarContext'
import MenuBar from '../navigation/MenuBar'
import { useNavigate } from 'react-router-dom'
const Header = () => {
	const { toggleMenuBar } = useMenuBarContext()
	const navigate = useNavigate()
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position='fixed'
				sx={{ zIndex: theme => theme.zIndex.drawer + 1, backgroundColor: '#D0153F ', position: 'relative' }}>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}
						onClick={() => toggleMenuBar()}>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1, alignItems: 'left', justifyContent: 'left' }}>
						<StyledLogo onClick={() => navigate('/')}>
							<FitImg src={logo} alt={'Obrazek logo'} />
							<h3 style={{ margin: '0' }}>Cinema Fordon</h3>
						</StyledLogo>
					</Typography>
					<NavigationLink size='15px' link={'/login'}>
						ZALOGUJ SIĘ
					</NavigationLink>
				</Toolbar>
			</AppBar>
			<MenuBar />
		</Box>
	)
}

export default Header

const StyledLogo = styled.div`
	display: flex;
	flex-direction: row;
	column-gap: 10px;
	align-items: center;
	&:hover {
		cursor: pointer;
		color: ${({ theme }) => theme.colors.mid};
	}
`
const FitImg = styled.img`
	width: 50px;
	height: 50px;
`
