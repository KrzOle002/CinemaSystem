import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { AppBar, Box, IconButton, Popover, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../assets/logo-icon.png'
import NavigationLink from '../../components/NavigationLink'
import { useMenuBarContext } from '../../context/MenuBarContext'
import MenuBar from '../navigation/MenuBar'
import useAuthHook from './../auth/useAuth'

import SubmitButton from '../../components/SubmitButton'
import { toast } from 'react-toastify'
import { useSignOut } from 'react-auth-kit'

const Header = () => {
	const { toggleMenuBar } = useMenuBarContext()
	const navigate = useNavigate()

	const [scrolledPixels, setScrolledPixels] = useState(0)

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleScroll = () => {
		setScrolledPixels(window.scrollY)
	}

	const open = Boolean(anchorEl)
	const id = open ? 'simple-popover' : undefined
	useEffect(() => {
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])
	const { isAuthenticated, userData } = useAuthHook()

	const signOut = useSignOut()

	return (
		<Box sx={{ position: scrolledPixels > 100 ? 'fixed' : 'relative', zIndex: 101, width: '100%' }}>
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
						<>
							<div onClick={handleClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
								<AccountCircleOutlinedIcon fontSize='large' sx={{ width: '30px' }} />
								{userData?.email}
							</div>
							<Popover
								disableScrollLock={true}
								id={id}
								open={open}
								anchorEl={anchorEl}
								onClose={handleClose}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}>
								<Typography sx={{ p: 2, backgroundColor: '#D0153F' }}>
									<SubmitButton
										type='button'
										className='important'
										fullWidth
										onClick={() => {
											signOut()
											toast.success('Wylogowano')
											navigate('/')
										}}>
										Wyloguj
									</SubmitButton>
								</Typography>
							</Popover>
						</>
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
