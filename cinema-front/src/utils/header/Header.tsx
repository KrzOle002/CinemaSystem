import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../assets/logo-icon.png'
import NavigationLink from '../../components/NavigationLink'
import { useMenuBarContext } from '../../context/MenuBarContext'
import MenuBar from '../navigation/MenuBar'
import useAuthHook from './../auth/useAuth'

const Header = () => {
	const { toggleMenuBar } = useMenuBarContext()
	const navigate = useNavigate()

	const [scrolledPixels, setScrolledPixels] = useState(0)

	const handleScroll = () => {
		setScrolledPixels(window.scrollY)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])
	const { isAuthenticated, userData } = useAuthHook()

	return (
		<Box sx={{ position: scrolledPixels > 0 ? 'fixed' : 'relative', zIndex: 101, width: '100%' }}>
			<AppBar sx={{ zIndex: theme => theme.zIndex.drawer + 1, backgroundColor: '#D0153F ', position: 'relative' }}>
				<Toolbar>
					<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }} onClick={() => toggleMenuBar()}>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1, alignItems: 'left', justifyContent: 'left' }}>
						<StyledLogo onClick={() => navigate('/')}>
							<FitImg src={logo} alt={'Obrazek logo'} />
							<h3 style={{ margin: '0' }}>Cinema Fordon</h3>
						</StyledLogo>
					</Typography>
					{isAuthenticated() ? (
						<NavigationLink size='15px' link={'/account'}>
							<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
								<AccountCircleOutlinedIcon fontSize='large' sx={{ width: '30px' }} />
								{userData?.email}
							</div>
						</NavigationLink>
					) : (
						<NavigationLink size='15px' link={'/login'}>
							ZALOGUJ SIĘ
						</NavigationLink>
					)}
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
