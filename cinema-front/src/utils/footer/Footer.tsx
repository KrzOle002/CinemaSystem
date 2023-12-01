import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import HomeIcon from '@mui/icons-material/Home'
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined'
import VideocamIcon from '@mui/icons-material/Videocam'
import { BottomNavigation, BottomNavigationAction, Popover, Typography } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import useAuthHook from '../auth/useAuth'
import SubmitButton from '../../components/SubmitButton'
import { toast } from 'react-toastify'
import { useSignOut } from 'react-auth-kit'
import { useState } from 'react'
const Footer = () => {
	const navigate = useNavigate()
	const { isAuthenticated, userData } = useAuthHook()

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

	const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClosePopover = () => {
		setAnchorEl(null)
	}

	const handleNavigate = () => {
		navigate('/login')
	}

	const signOut = useSignOut()
	return (
		<BottomNavigation
			showLabels
			sx={{
				backgroundColor: '#D0153F',
				position: 'fixed',
				bottom: 0,
				left: 0, // Ensure it's fixed to the left
				right: 0, // Ensure it's fixed to the right
				zIndex: 100,
				fontSize: '9px',
			}}>
			<BottomNavigationAction
				onClick={() => navigate('/')}
				label='Home'
				sx={{
					color: '#f5f5f5',
					fontSize: '9px',
					minWidth: '0',
					'& span': {
						fontSize: '9px',
					},
					'& button': {
						padding: '0',
						minWidth: '0',
					},
				}}
				icon={<HomeIcon />}
			/>
			<BottomNavigationAction
				onClick={() => navigate('/schedule')}
				label='Repertuar'
				sx={{
					color: '#f5f5f5',
					fontSize: '9px',
					minWidth: '0',
					'& span': {
						fontSize: '9px',
					},
					'& button': {
						padding: '0',
						minWidth: '0',
					},
				}}
				icon={<VideocamIcon />}
			/>
			<BottomNavigationAction
				onClick={() => navigate('/')}
				label='Aktualności'
				sx={{
					color: '#f5f5f5',
					fontSize: '9px',
					minWidth: '0',
					'& span': {
						fontSize: '9px',
					},
					'& button': {
						padding: '0',
						minWidth: '0',
					},
				}}
				icon={<BallotOutlinedIcon />}
			/>
			<BottomNavigationAction
				onClick={() => navigate('/contact')}
				label='Kontakt'
				sx={{
					color: '#f5f5f5',
					fontSize: '9px',
					minWidth: '0',
					'& span': {
						fontSize: '9px',
					},
					'& button': {
						padding: '0',
						minWidth: '0',
					},
				}}
				icon={<PermPhoneMsgOutlinedIcon />}
			/>
			<BottomNavigationAction
				onClick={isAuthenticated() ? handleOpenPopover : handleNavigate}
				sx={{
					color: '#f5f5f5',
					fontSize: '9px',
					minWidth: '0',

					'& span': {
						fontSize: '9px',
					},

					'& button': {
						padding: '0',
						minWidth: '0',
					},
				}}
				label={isAuthenticated() ? `${userData?.email}` : 'Konto'}
				icon={<AccountCircleOutlinedIcon />}
			/>
			<Popover
				disableScrollLock={true}
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={handleClosePopover}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
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
		</BottomNavigation>
	)
}

export default Footer
