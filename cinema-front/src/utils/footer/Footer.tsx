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
				onClick={() => navigate(isAuthenticated() ? '/account' : '/login')}
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
		</BottomNavigation>
	)
}

export default Footer
